'use strict';

export default class Todo {
  constructor(category) {
    this.todo = document.querySelector(`.${category}`);
    this.todoForm = this.todo.querySelector('.todo__form');
    this.todoInput = this.todoForm.querySelector('.todo__input');
    this.todoList = this.todo.querySelector('.todo__list');
    this.TODOS_LS = category;
    this.todos = [];


    this.todoForm.addEventListener('submit', (event) => {
      this.onHandleSubmit(event);
    });


    this.todoInput.addEventListener('focusout', (event)=>{
      
      if(event.currentTarget.value === '' ){
        this.todoInput.classList.add('todo__inputUnCheck')
        this.todoInput.classList.remove('todo__inputCheck')

      }else{
        this.todoInput.classList.add('todo__inputCheck')
        this.todoInput.classList.remove('todo__inputUnCheck')

      }
    })


    this.todoList.addEventListener('dragover', (event)=>{
      event.preventDefault()
      const afterElement = getDragAfterElement(event.clientY)

      const dragging = document.querySelector('.dragging')


      if(afterElement === undefined){
        this.todoList.appendChild(dragging)
      }else{
        this.todoList.insertBefore(dragging, afterElement)
      }

    })

    const getDragAfterElement = (y) => {
      
      const draggableElements = [...this.todo.querySelectorAll('.draggable:not(.dragging)')]
      return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2 

        if(offset<0 && offset>closest.offset){
          return {offset: offset, element:child}
        }else{
          return closest
        }
      }, {offset: Number.NEGATIVE_INFINITY}).element
    }

  }


  saveTodos = (category, todos) => {
    localStorage.setItem(category, JSON.stringify(todos));
  };



  checkBtn = (event) => {
    const btn = event.target.parentNode;
    const unchecked = btn.classList.contains('unchecked');

    const li = btn.parentNode;

    const checkTodos = this.todos.map((todo) => {
      if(todo.id === parseInt(li.id)){
        return { 
          ...todo,
          unchecked: !unchecked
        }
      }else{
        return todo
      }
    });

    this.todos = checkTodos
    this.saveTodos(this.TODOS_LS, this.todos);


    
    // add save function after checked
    if (unchecked) {
      // if checkbox is checked
      btn.innerHTML = '<i class="far fa-check-square"></i>';
      li.classList.add('todo__itemChecked')
      btn.classList.remove('unchecked')
    } else {
      // if checkbox is unchecked
      btn.innerHTML = '<i class="far fa-square"></i>';
      // li.style.textDecoration = 'none';

      li.classList.remove('todo__itemChecked')
      btn.classList.add('unchecked')

    }

  };

  deleteBtn = (event) => {
    const btn = event.target.parentNode;
    const li = btn.parentNode;

    this.todoList.removeChild(li);
    const cleanTodos = this.todos.filter((todo) => {
      return todo.id !== parseInt(li.id);
    });

    if(this.todoList.childElementCount < 10){
      this.todoForm.style.display ='flex'
    }
    
    this.todos = cleanTodos;
    this.saveTodos(this.TODOS_LS, this.todos);
  };

  // function for painting todo items
  paintTodo = (todo) => {

    const li = document.createElement('li');

    // for drag and drop
    li.setAttribute('draggable', true);
    li.classList.add('todo__item', 'draggable');

    li.addEventListener('dragstart', ()=>{
      li.classList.add('dragging')
    })

    li.addEventListener('dragend', ()=>{
      li.classList.remove('dragging')
      const categories = document.querySelectorAll('.todo__category')

      // after dragend, save every changes of category to local storage
      categories.forEach(category => {
        const newTodos = [];
        const categoryText = category.className.split(' ')[1]
        const todoList = category.querySelector('.todo__list').querySelectorAll('.todo__item')
        todoList.forEach(item => {
          newTodos.push({
            id: parseInt(item.id), 
            text: item.querySelector('span').textContent,
            unchecked: item.querySelector('.todo__check').classList.contains('unchecked') === true ? true : false
        
        })
        })

        this.saveTodos(categoryText, newTodos)
      })
    })


    const check = document.createElement('button');
    check.addEventListener('click', this.checkBtn);

    // if checkbox is unchecked
    if(todo.unchecked === true){
      check.classList.add('todo__check','unchecked')
      check.innerHTML = '<i class="far fa-square"></i>';
    }else{
      check.classList.add('todo__check');
      li.classList.add('todo__itemChecked')
      check.innerHTML = '<i class="far fa-check-square"></i>';
    } 
    
    
    const span = document.createElement('span');
    span.innerText = todo.text;
    span.classList.add('todo__content');

    const delBtn = document.createElement('button');
    delBtn.classList.add('todo__delete');
    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', this.deleteBtn);

    

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(delBtn);

    li.id = todo.id;
    this.todoList.appendChild(li);

  };

  onHandleSubmit = (event) => {

    event.preventDefault();

    const text = this.todoInput.value;

    if (text === '') {
      this.todoInput.focus();
      return;
    }

    const newId = Date.now();
    
    const todoObj = {
      id: newId,
      text: text,
      unchecked: true
    };

    this.todos.push(todoObj);
    this.saveTodos(this.TODOS_LS, this.todos);


    this.paintTodo(todoObj);

    this.todoInput.value = '';
    this.todoInput.focus();

    if(this.todoList.childElementCount >= 10){
      this.todoForm.style.display ='none'
    }

  };

  loadTodos = () => {
    const loadedTodos = localStorage.getItem(this.TODOS_LS);
    const parsedTodos = JSON.parse(loadedTodos);

    if (loadedTodos === null || parsedTodos.length === 0 ) {
      return 
    }else{
      parsedTodos.forEach((todo) => {
        this.paintTodo(todo);
        this.todos.push(todo)
      });

    }
  };
}

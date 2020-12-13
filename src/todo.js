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
    const unchecked = btn.classList.toggle('unchecked');
    const li = btn.parentNode;

    // add save function after checked
    if (!unchecked) {
      btn.innerHTML = '<i class="far fa-check-square"></i>';
      li.style.textDecoration = 'line-through';
    } else {
      btn.innerHTML = '<i class="far fa-square"></i>';
      li.style.textDecoration = 'none';
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

  // make now todo__item
  paintTodo = (text) => {
    if (text === '') {
      this.todoInput.focus();
      return;
    }

    const li = document.createElement('li');
    li.setAttribute('draggable', true);
    li.classList.add('todo__item', 'draggable');

    // for drag and drop
    li.addEventListener('dragstart', ()=>{
      li.classList.add('dragging')
    })

    li.addEventListener('dragend', ()=>{
      li.classList.remove('dragging')
      const categories = document.querySelectorAll('.todo__category')

      // after dragend, save every changes of category to local storage모
      categories.forEach(category => {
        const newTodos = [];

        const categoryText = category.className.split(' ')[1]
        const todoList = category.querySelector('.todo__list').querySelectorAll('.todo__item')


        todoList.forEach(item => {
          newTodos.push({'id': item.id, 'text':item.querySelector('span').textContent})
        })

        this.saveTodos(categoryText, newTodos)

      })

      
    })


    const check = document.createElement('button');
    check.classList.add('todo__check','unchecked');

    const span = document.createElement('span');
    span.classList.add('todo__content');

    const delBtn = document.createElement('button');
    delBtn.classList.add('todo__delete');

    // const newId = this.todos.length + 1;
    const newId = Date.now()

    check.innerHTML = '<i class="far fa-square"></i>';
    check.addEventListener('click', this.checkBtn);

    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', this.deleteBtn);

    span.innerText = text;

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(delBtn);

    li.id = newId;

    this.todoList.appendChild(li);
    const todoObj = {
      id: newId,
      text: text,
    };

    this.todos.push(todoObj);
    this.saveTodos(this.TODOS_LS, this.todos);
    if(this.todoList.childElementCount >= 10){
      this.todoForm.style.display ='none'
    }
  };

  onHandleSubmit = (event) => {
    event.preventDefault();

    if (this.todos.length < 10) {
      const currentValue = this.todoInput.value;
      this.paintTodo(currentValue);
    }else{
    }

    this.todoInput.value = '';
    this.todoInput.focus();
  };

  loadTodos = () => {
    const loadedTodos = localStorage.getItem(this.TODOS_LS);
    const parsedTodos = JSON.parse(loadedTodos);

    if (loadedTodos !== null) {
      parsedTodos.forEach((todo) => {
        this.paintTodo(todo.text);
      });
    }
    // this.todoInput.focus();
  };
}

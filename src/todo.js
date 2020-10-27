'user strict';

export default class Todo {
  constructor(showing, category) {
    console.log("this todo: ", category)

    this.todo = document.querySelector(category);
    this.todoForm = this.todo.querySelector('.todo__form');
    this.todoInput = this.todoForm.querySelector('.todo__input');
    this.todoList = this.todo.querySelector('.todo__list');
    this.TODOS_LS = category;
    this.todos = [];
    this.showing = showing;

    console.log(this.todoForm)

    this.todoForm.addEventListener('submit', (event) => {
      console.log("todos", category)
      this.onHandleSubmit(event);
    });
  }

  

  saveTodos = (todos) => {
    localStorage.setItem(this.TODOS_LS, JSON.stringify(todos));
  };

  checkBtn = (event) => {
    const btn = event.target.parentNode;
    const unchecked = btn.classList.toggle('unchecked');
    const li = btn.parentNode;

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

    this.todos = cleanTodos;
    this.saveTodos(this.todos);
  };

  paintTodo = (text) => {
    if (text === '') {
      this.todoInput.focus();
      return;
    }

    const li = document.createElement('li');
    li.setAttribute('class', 'todo__item');

    const check = document.createElement('button');
    check.setAttribute('class', 'todo__check unchecked');

    const span = document.createElement('span');
    span.setAttribute('class', 'todo__content');

    const delBtn = document.createElement('button');
    delBtn.setAttribute('class', 'todo__delete');

    const newId = this.todos.length + 1;

    check.innerHTML = '<i class="far fa-square"></i>';
    check.addEventListener('click', this.checkBtn);

    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', this.deleteBtn);

    span.innerText = text;

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.scrollIntoView({ block: 'center' });

    li.id = newId;

    this.todoList.appendChild(li);
    const todoObj = {
      id: newId,
      text: text,
    };

    this.todos.push(todoObj);
    this.saveTodos(this.todos);
  };

  onHandleSubmit = (event) => {
    event.preventDefault();

    if (this.todos.length < 10) {
      const currentValue = this.todoInput.value;
      this.paintTodo(currentValue);
    }

    this.todoInput.value = '';
    this.todoInput.focus();
  };

  loadTodos = () => {
    this.todoForm.classList.add(this.showing);
    this.todo.classList.add(this.showing);
    const loadedTodos = localStorage.getItem(this.TODOS_LS);
    const parsedTodos = JSON.parse(loadedTodos);

    if (loadedTodos !== null) {
      parsedTodos.forEach((todo) => {
        this.paintTodo(todo.text);
      });
    }
    this.todoInput.focus();
  };
}

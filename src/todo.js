import { USER_LS, userForm, SHOWING_ON } from './greeting.js';

const todo = document.querySelector('.todo');
const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__lists');

const TODOS_LS = 'toDos';
let todos = [];

const onNameSubmit = () => {
  userForm.addEventListener('submit', () => {
    todo.classList.add(SHOWING_ON);
  });
};

const saveTodos = (todos) => {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
};

const checkBtn = (event) => {
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

const deleteBtn = (event) => {
  const btn = event.target.parentNode;
  const li = btn.parentNode;

  todoList.removeChild(li);
  const cleanTodos = todos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });

  todos = cleanTodos;

  saveTodos(todos);
};

const paintTodo = (text) => {
  if (text === '') {
    todoInput.focus();
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

  const newId = todos.length + 1;

  check.innerHTML = '<i class="far fa-square"></i>';
  check.addEventListener('click', checkBtn);

  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  delBtn.addEventListener('click', deleteBtn);

  span.innerText = text;

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.scrollIntoView({ block: 'center' });

  li.id = newId;

  todoList.appendChild(li);
  const todoObj = {
    id: newId,
    text: text,
  };

  todos.push(todoObj);
  saveTodos(todos);
};

const onHandleSubmit = (event) => {
  event.preventDefault();
  if (todos.length < 10) {
    const currentValue = todoInput.value;
    paintTodo(currentValue);
  }

  todoInput.value = '';
  todoInput.focus();
};

const loadTodos = () => {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  const parsedTodos = JSON.parse(loadedTodos);

  if (loadedTodos !== null) {
    parsedTodos.forEach((todo) => {
      paintTodo(todo.text);
    });
  }
};

const todoInit = () => {
  const userName = localStorage.getItem(USER_LS);

  if (userName !== null) {
    todo.classList.add(SHOWING_ON);
  }
  loadTodos();

  todoForm.addEventListener('submit', onHandleSubmit);
  todoInput.focus();
  onNameSubmit();
};

todoInit();

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

const deleteBtn = (event) => {
  const btn = event.target;
  const li = btn.parentNode;

  todoList.removeChild(li);
  const cleanTodos = todos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });

  todos = cleanTodos;

  saveTodos(todos);
};

const paintTodo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = todos.length + 1;

  delBtn.innerText = 'X';
  delBtn.addEventListener('click', deleteBtn);

  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
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

  onNameSubmit();
};

todoInit();

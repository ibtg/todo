const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__lists');

const TODOS_LS = 'toDos';
let todos = [];

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
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = '';
};

const loadTodos = () => {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => {
      paintTodo(todo.text);
    });
  }
  console.log('loadTodos');
};

const todoInit = () => {
  loadTodos();
  todoForm.addEventListener('submit', onHandleSubmit);
};

todoInit();

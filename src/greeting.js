const form = document.querySelector('.user__form');
const formInput = form.querySelector('input');
const greeting = document.querySelector('.user__greeting');
const toDo = document.querySelector('.todo');

const USER_LS = 'currentUser';
const SHOWING_ON = 'form__showing';

const saveName = (text) => {
  localStorage.setItem(USER_LS, text);
};

const onNameSubmit = (event) => {
  event.preventDefault();
  const currentvalue = formInput.value;
  paintGreeting(currentvalue);
  saveName(currentvalue);
};

const askForName = () => {
  form.classList.add(SHOWING_ON);
  form.addEventListener('submit', onNameSubmit);
};

const paintGreeting = (text) => {
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello ${text}`;
  toDo.style.diplay = 'block';
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
};

const greetingInit = () => {
  loadName();
};

greetingInit();

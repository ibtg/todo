const userForm = document.querySelector('.user__form');
const userInput = userForm.querySelector('input');
const USER_LS = 'currentUser';
const SHOWING_ON = 'form__showing';

const saveName = (text) => {
  localStorage.setItem(USER_LS, text);
};

const onNameSubmit = (event) => {
  event.preventDefault();
  const currentvalue = userInput.value;
  userForm.classList.remove(SHOWING_ON);

  saveName(currentvalue);
};

const askForName = () => {
  userForm.classList.add(SHOWING_ON);
  userForm.addEventListener('submit', onNameSubmit);
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    userForm.classList.remove(SHOWING_ON);
  }
};

const greetingInit = () => {
  loadName();
};

greetingInit();

export { USER_LS, userForm };

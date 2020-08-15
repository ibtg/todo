const userForm = document.querySelector('.user__form');
const userInput = userForm.querySelector('input');
const USER_LS = 'currentUser';
const SHOWING_ON = 'form__showing';

const saveName = (text) => {
  localStorage.setItem(USER_LS, text);
};

const onNameSubmit = (event) => {
  event.preventDefault();
  console.log('event: ', event);
  const currentvalue = userInput.value;
  console.log(currentvalue);
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
  console.log('greetings');
  loadName();
};

greetingInit();

export { USER_LS, userForm, SHOWING_ON };

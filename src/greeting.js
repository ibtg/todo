'use strict';

export default class Greeting {
  constructor() {
    this.userForm = document.querySelector('.user__form');
    this.userInput = document.querySelector('.user__input');
    this.USER_LS = 'currentUser';
    this.SHOWING_ON = 'form__showing';
  }
  saveName = (text) => {
    localStorage.setItem(this.USER_LS, text);
  };

  onNameSubmit = (event) => {
    event.preventDefault();
    const currentvalue = this.userInput.value;
    this.userForm.classList.remove(this.SHOWING_ON);
    this.saveName(currentvalue);
  };

  askForName = () => {
    this.userForm.classList.add(this.SHOWING_ON);
    this.userForm.addEventListener('submit', this.onNameSubmit);
  };

  loadName = () => {
    const currentUser = localStorage.getItem(this.USER_LS);
    if (currentUser === null) {
      this.askForName();
    } else {
      this.userForm.classList.remove(this.SHOWING_ON);
    }
  };
}

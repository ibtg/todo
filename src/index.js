'user strict';

import Clock from './clock.js';
import Weather from './weather.js';
import Greeting from './greeting.js';
import Quotes from './quotes.js';
import Todo from './todo.js';
import Days from './days.js';

const SHOWING_ON = 'form__showing';

const clock = new Clock();
clock.StartTime();

const weather = new Weather();
weather.loadCoords();

const greeting = new Greeting();
greeting.loadName();

greeting.userForm.addEventListener('submit', () => {
  const quotes = new Quotes();
  quotes.getQuotes();

  const todo = new Todo(SHOWING_ON);
  todo.loadTodos();

  const days = new Days();
  days.getUser();
});

if (localStorage.getItem(greeting.USER_LS)) {
  const quotes = new Quotes();
  quotes.getQuotes();

  const todo = new Todo(SHOWING_ON);
  todo.loadTodos();

  const days = new Days();
  days.getUser();
}

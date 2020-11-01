'user strict';

import Clock from './clock.js';
import Weather from './weather.js';
import Greeting from './greeting.js';
import Quotes from './quotes.js';
import Todo from './todo.js';
import Days from './days.js';
// import Background from './background.js';

const SHOWING_ON = 'form__showing';
const GOAL = 'goal';
const DOING = 'doing'

const clock = new Clock();
clock.StartTime();

const weather = new Weather();
weather.loadCoords();

const quotes = new Quotes();
quotes.getQuotes();

const days = new Days();
days.getDays();

// const greeting = new Greeting();
// greeting.loadName();

// const background = new Background();
// background.loadBackground();

// greeting.userForm.addEventListener('submit', () => {


//   const goal = new Todo(SHOWING_ON, 'GOAL');
//   const doing = new Todo(SHOWING_ON, 'DOING');
//   const todo = new Todo(SHOWING_ON, 'TODO');
//   const done = new Todo(SHOWING_ON, 'DONE');

//   goal.loadTodos();
//   doing.loadTodos();
//   todo.loadTodos();
//   done.loadTodos();


// });
// const quotes = new Quotes();
// quotes.getQuotes();

const goal = new Todo('.item__goal');
const doing = new Todo('.item__doing');
const todo = new Todo('.item__todo');
const done = new Todo('.item__done');

goal.loadTodos();
doing.loadTodos();
todo.loadTodos();
done.loadTodos();



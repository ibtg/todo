'user strict';

import Clock from './clock.js';
import Weather from './weather.js';
import Quotes from './quotes.js';
import Todo from './todo.js';
import Days from './days.js';

const darkmodeCheckbox = document.querySelector('.darkmode__checkbox');
darkmodeCheckbox.addEventListener('change', ()=>{
  document.querySelector('.background').classList.toggle('darkmode');
  document.querySelector('.day').classList.toggle('darkmode__fontcolor')
  document.querySelector('.clock').classList.toggle('darkmode__fontcolor')
  document.querySelector('.weather__container').classList.toggle('darkmode__fontcolor')
  document.querySelector('.quotes').classList.toggle('darkmode__fontcolor')
  document.querySelector('.search__icon').classList.toggle('darkmode__fontcolor')
  document.querySelector('.search__input').classList.toggle('darkmode__fontcolor')
  document.querySelectorAll('.list__title').forEach(title => title.classList.toggle('darkmode__fontcolor'))


})

// c = document.querySelector('.day');
// print("C: ", c)


const clock = new Clock();
clock.StartTime();

const weather = new Weather();
weather.loadCoords();

const quotes = new Quotes();
quotes.getQuotes();

const days = new Days();
days.getDays();

const goal = new Todo('.item__goal');
const doing = new Todo('.item__doing');
const todo = new Todo('.item__todo');
const done = new Todo('.item__done');

goal.loadTodos();
doing.loadTodos();
todo.loadTodos();
done.loadTodos();



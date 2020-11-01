'user strict';

import Clock from './clock.js';
import Weather from './weather.js';
import Quotes from './quotes.js';
import Todo from './todo.js';
import Days from './days.js';


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



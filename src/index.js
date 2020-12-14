'use strict';

import Time from './time.js';
import Weather from './weather.js';
import Quotes from './quotes.js';
import Todo from './todo.js';
import Darkmode from './darkmode.js'

const time = new Time();
time.StartTime();

const weather = new Weather();
weather.loadCoords();

const quotes = new Quotes();
quotes.getQuotes();

const goal = new Todo('category__goal');
const doing = new Todo('category__doing');
const todo = new Todo('category__todo');
const done = new Todo('category__done');

goal.loadTodos();
doing.loadTodos();
todo.loadTodos();
done.loadTodos();

const darkmode = new Darkmode();
darkmode.darkmodeCheck();




'user strict';

import Clock from './clock.js';
import Weather from './weather.js';

const clock = new Clock();
clock.StartTime();

const weather = new Weather();
weather.loadCoords();

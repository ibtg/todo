import { USER_LS } from './greeting.js';

const days = document.querySelector('.days');
const day = days.querySelector('.day');

const DAYS_LS = 'days';

const getUser = () => {
  const userName = localStorage.getItem(USER_LS);
  if (userName !== null) {
    const user = document.createElement('span');
    user.textContent = `${userName}, today is `;
    days.insertBefore(user, day);
  }
};

const saveDays = (date) => {
  localStorage.setItem(DAYS_LS, date);
};

const paintDays = (dayCount) => {
  console.log(dayCount);
  day.textContent = `Day ${dayCount}`;
};

const getDays = () => {
  const currentDays = localStorage.getItem(DAYS_LS);

  if (currentDays === null) {
    paintDays(1);
    const currentDate = new Date();
    const dateJson = JSON.stringify({ startDate: currentDate, dayCount: 1 });
    saveDays(dateJson);
  } else {
    const currentDate = new Date();
    const startDate = new Date(JSON.parse(currentDays).startDate);
    const dayCount =
      Math.floor((currentDate - startDate) / (1000 * 3600 * 24)) + 1;

    const dateJson = JSON.stringify({
      startDate: startDate,
      dayCount: dayCount,
    });

    paintDays(dayCount);
    saveDays(dateJson);
  }
};

const daysInit = () => {
  getDays();
  getUser();
};

daysInit();

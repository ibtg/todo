import { USER_LS, userForm } from './greeting.js';

const days = document.querySelector('.days');
const day = days.querySelector('.day');
const DAYS_LS = 'days';

const onNameSubmit = () => {
  userForm.addEventListener('submit', () => {
    getUser();
    getDays();
  });
};

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
  day.textContent = `Day ${dayCount}`;
};

const getDays = () => {
  const loadedDays = localStorage.getItem(DAYS_LS);
  const today = new Date().getDay();

  if (loadedDays === null) {
    const dateJson = JSON.stringify({ dayId: today, dayCount: 1 });
    paintDays(1);
    saveDays(dateJson);
  } else if (JSON.parse(loadedDays).dayId !== today) {
    const dateJson = JSON.stringify({
      dayId: today,
      dayCount: JSON.parse(loadedDays).dayCount + 1,
    });
    paintDays(JSON.parse(loadedDays).dayCount + 1);
    saveDays(dateJson);
  } else {
    paintDays(JSON.parse(loadedDays).dayCount);
  }
};

const daysInit = () => {
  const userName = localStorage.getItem(USER_LS);
  if (userName !== null) {
    getUser();
    getDays();
  }
  onNameSubmit();
};

daysInit();

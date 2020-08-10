const clockContainer = document.querySelector('.clock');
const clockAMPM = clockContainer.querySelector('.clock__AMPM');
const clockTitle = clockContainer.querySelector('.clock__time');

const paintTime = (hours, minutes, seconds) => {
  hours >= 12
    ? (clockAMPM.textContent = 'PM ')
    : (clockAMPM.textContent = 'AM ');

  hours = hours % 12;
  hours = hours ? hours : 12;

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  clockContainer.insertBefore(clockAMPM, clockTitle);
};

const getTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  paintTime(hours, minutes, seconds);
};

const clockInit = () => {
  getTime();
  setInterval(getTime, 1000);
};

clockInit();

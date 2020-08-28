'use strict';

export default class Clock {
  constructor() {
    this.clockContainer = document.querySelector('.clock');
    this.clockAMPM = document.querySelector('.clock__AMPM');
    this.clockTitle = document.querySelector('.clock__time');
  }

  paintTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    hours >= 12
      ? (this.clockAMPM.textContent = 'PM ')
      : (this.clockAMPM.textContent = 'AM ');

    hours = hours % 12;
    hours = hours ? hours : 12;

    this.clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    this.clockContainer.insertBefore(this.clockAMPM, this.clockTitle);
  };

  StartTime = () => {
    setInterval(this.paintTime, 1000);
  };
}

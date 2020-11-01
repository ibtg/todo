export default class Days {
  constructor() {
    this.day = document.querySelector('.day');
    this.DAYS_LS = 'days';
  }

  saveDays = (date) => {
    localStorage.setItem(this.DAYS_LS, date);
  };

  paintDays = (dayCount) => {
    this.day.textContent = `Day ${dayCount}`;
  };

  getDays = () => {
    const loadedDays = localStorage.getItem(this.DAYS_LS);
    const today = new Date().getDay();

    if (loadedDays === null) {
      const dateJson = JSON.stringify({ dayId: today, dayCount: 1 });
      this.paintDays(1);
      this.saveDays(dateJson);
    } else if (JSON.parse(loadedDays).dayId !== today) {
      const dateJson = JSON.stringify({
        dayId: today,
        dayCount: JSON.parse(loadedDays).dayCount + 1,
      });
      this.paintDays(JSON.parse(loadedDays).dayCount + 1);
      this.saveDays(dateJson);
    } else {
      this.paintDays(JSON.parse(loadedDays).dayCount);
    }
  };

}

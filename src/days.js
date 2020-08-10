const days = document.querySelector('.days');
const DAYS_LS = 'days';

const saveDate = (date) => {
  localStorage.setItem(DAYS_LS, date);
};

const paintDays = (day) => {
  days.innerText = `${day} day`;
};

const daysInit = () => {
  const currentDays = localStorage.getItem(DAYS_LS);

  if (currentDays === null) {
    paintDays(1);
    const currentDate = new Date();
    const dateJson = JSON.stringify({ startDate: currentDate, dayCount: 1 });
    saveDate(dateJson);
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
    saveDate(dateJson);
  }
};

daysInit();

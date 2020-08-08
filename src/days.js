const days = document.querySelector('.days');
const DAYS_LS = 'days';

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month < 10 ? `0${month}` : month}-${
    day > 0 ? `0${day}` : day
  }`;
  return dateString;
};

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
    const currentDate = getDate();
    const dateJson = JSON.stringify({ startDate: currentDate, dayCount: 1 });
    saveDate(dateJson);
  } else {
    const currentDate = getDate();
    const startDate = JSON.parse(currentDays).startDate;
    let dayCountValue = JSON.parse(currentDays).dayCount;
    dayCountValue =
      currentDate === startDate ? dayCountValue : dayCountValue + 1;

    const dateJson = JSON.stringify({
      startDate: startDate,
      dayCount: dayCountValue,
    });

    paintDays(dayCountValue);
    saveDate(dateJson);
  }
};

daysInit();

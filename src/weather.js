const weatherContainer = document.querySelector('.weather__container');
const weather = weatherContainer.querySelector('.weather');
const weatherLocation = weatherContainer.querySelector('.location');

const COORDS = 'coords';
const API_KEY = 'babfdfb21b2a28a90c383505260bc2e4';

const getWeather = (lat, lon) => {
  console.log('getweather');
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp}°C`;
      weatherLocation.innerText = `${place}`;
    });
};

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

const handleGeoError = () => {
  console.log(`Can't access geo location`);
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
  const loadCoords = localStorage.getItem(COORDS);

  if (loadCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
};

const weatherInit = () => {
  loadCoords();
};

weatherInit();

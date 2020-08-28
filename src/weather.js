'use strict';

export default class Weather {
  constructor() {
    this.weatherContainer = document.querySelector('.weather__container');
    this.weather = document.querySelector('.weather');
    this.weatherLocation = document.querySelector('.location');
    this.COORDS = 'coords';
    this.API_KEY = 'babfdfb21b2a28a90c383505260bc2e4';
  }

  paintWeather = (obj) => {
    const weatherImg = document.createElement('img');
    const weatherIcon = obj.weather[0].icon;

    weatherImg.setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );

    weatherImg.style.width = `${50}px`;
    weatherImg.style.height = `${50}px`;
    weatherImg.style.transform = `translateY(${12}px)`;

    const temp = obj.main.temp;
    const place = obj.name;
    this.weather.innerText = `${temp}°C`;
    this.weatherLocation.innerText = `${place}`;
    this.weather.appendChild(weatherImg);
  };

  getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.paintWeather(json);
      });
  };

  saveCoords = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  };

  handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  };

  handleGeoError = () => {
    console.log(`Can't access geo location`);
  };

  askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  loadCoords = () => {
    const loadCoords = localStorage.getItem(this.COORDS);

    if (loadCoords === null) {
      askForCoords();
    } else {
      const parsedCoords = JSON.parse(loadCoords);
      this.getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
  };
}

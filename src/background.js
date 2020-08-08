const body = document.querySelector('body');
const BG_API_KEY = 'pwuhKpmomXVMHeUo2Hr2u2JTw8mL4XsNj9lqLI9mnNk';

const getImages = () => {
  fetch(
    `https://api.unsplash.com/photos/random?client_id=${BG_API_KEY}&query=nature&orientation=landscape`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const backgroundImageSrc = json.urls.regular;
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = `${100}% ${100}%`;
      body.style.backgroundImage = 'url(' + backgroundImageSrc + ')';
    });
};

const initBackground = () => {
  getImages();
};

initBackground();

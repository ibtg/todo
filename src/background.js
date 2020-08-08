const body = document.querySelector('body');
const bg = document.querySelector('.bg');
const BG_API_KEY = 'pwuhKpmomXVMHeUo2Hr2u2JTw8mL4XsNj9lqLI9mnNk';
const img = document.createElement('img');
console.log(img);
const getImages = () => {
  fetch(
    `https://api.unsplash.com/photos/random?client_id=${BG_API_KEY}&query=nature&orientation=landscape`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const backgroundImageSrc = json.urls.regular;
      console.log(backgroundImageSrc);
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = `${100}% ${100}%`;
      // body.style.backgroundSize = 'contain';
      body.style.backgroundImage = 'url(' + backgroundImageSrc + ')';
      // img.setAttribute('src', backgroundImageSrc);
      // bg.appendChild(img);
    });
};

getImages();

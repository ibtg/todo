const backgroundImg = document.querySelector('.background');
const BG_API_KEY = 'pwuhKpmomXVMHeUo2Hr2u2JTw8mL4XsNj9lqLI9mnNk';
const BASE_URL = `https://api.unsplash.com/photos/random?client_id=${BG_API_KEY}&query=star`;
const BG_LS = 'background';

const getImages = async () => {
  const backgroundImageSrc = await fetch(BASE_URL);
  const backgroundImageJson = await backgroundImageSrc.json();
  const backgroundImageUrl =
    backgroundImageJson.urls.raw + '&fm=jpg&crop=entropy&w=1500&fit=max';

  return backgroundImageUrl;
};

const paintImage = () => {
  const backgroundImageLS = localStorage.getItem(BG_LS);
  const parsedImageLS = JSON.parse(backgroundImageLS).ImageUrl;
  backgroundImg.style.backgroundImage = 'url(' + parsedImageLS + ')';
  backgroundImg.classList.remove('background__loading');
};

const initBackground = () => {
  const backgroundImageLS = localStorage.getItem(BG_LS);
  const today = new Date().getDay();

  if (
    backgroundImageLS === null ||
    today !== JSON.parse(backgroundImageLS).day
  ) {
    getImages().then((ImageUrl) => {
      localStorage.setItem(
        BG_LS,
        JSON.stringify({ day: today, ImageUrl: ImageUrl })
      );
      paintImage();
    });
  } else {
    paintImage();
  }
};

initBackground();

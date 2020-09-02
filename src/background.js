'use strict';

export default class Background {
  constructor() {
    this.backgroundImg = document.querySelector('.background');
    this.BG_API_KEY = 'pwuhKpmomXVMHeUo2Hr2u2JTw8mL4XsNj9lqLI9mnNk';
    this.BASE_URL = `https://api.unsplash.com/photos/random?w=1920&h=1080&&client_id=${this.BG_API_KEY}&query=star`;
    this.BG_LS = 'background';
    this.today = new Date().getDay();
  }

  saveBackground = (day, todayImageUrl, nextdayImageUrl) => {
    localStorage.setItem(
      this.BG_LS,
      JSON.stringify({
        day: day,
        todayImageUrl: todayImageUrl,
        nextdayImageUrl: nextdayImageUrl,
      })
    );
  };

  getBackground = async () => {
    const backgroundImageSrc = await fetch(this.BASE_URL);
    const backgroundImageJson = await backgroundImageSrc.json();
    return backgroundImageJson.urls.custom;
  };

  paintBackground = (backgroundImageLS) => {
    this.backgroundImg.style.backgroundImage = 'url(' + backgroundImageLS + ')';
  };

  loadBackground = () => {
    const backgroundImageLS = localStorage.getItem(this.BG_LS);

    console.log(backgroundImageLS);

    if (backgroundImageLS === null) {
      this.getBackground().then((imageUrl) => {
        this.saveBackground(
          this.today,
          './images/basic-background.jpeg',
          imageUrl
        );
      });
    } else if (this.today !== JSON.parse(backgroundImageLS).day) {
      console.log('else if');
      this.paintBackground(JSON.parse(backgroundImageLS).nextdayImageUrl);
      this.getBackground().then((imageUrl) => {
        this.saveBackground(
          this.today,
          JSON.parse(backgroundImageLS).nextdayImageUrl,
          imageUrl
        );
      });
    } else {
      this.paintBackground(JSON.parse(backgroundImageLS).todayImageUrl);
    }
  };
}

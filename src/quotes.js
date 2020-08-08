const quotes = document.querySelector('.quotes');

const getQuotes = () => {
  fetch(`https://quotes.rest/`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
};

const quotesInit = () => {};

quotesInit();

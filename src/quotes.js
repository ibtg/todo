import { USER_LS } from './greeting.js';

const quotes = document.querySelector('.quotes');

const paintQuotes = (obj) => {
  const quotesContent = document.createElement('h1');
  const quotesAuthor = document.createElement('span');
  quotesContent.innerText = obj.quote;
  quotesAuthor.innerText = `- ${obj.author} -`;
  quotes.appendChild(quotesContent);
  quotes.appendChild(quotesAuthor);
};

const getQuotes = () => {
  fetch(`https://quotes.rest/qod`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const quoteObj = {
        author: json.contents.quotes[0].author,
        quote: json.contents.quotes[0].quote,
      };

      paintQuotes(quoteObj);
    });
};

const quotesInit = () => {
  const userName = localStorage.getItem(USER_LS);
  if (userName !== null) {
    getQuotes();
  }
};

quotesInit();

export { getQuotes };

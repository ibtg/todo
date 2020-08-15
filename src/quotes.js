import { USER_LS, userForm } from './greeting.js';
const quotes = document.querySelector('.quotes');
const QUOTES_LS = 'quotes';

const onNameSubmit = () => {
  userForm.addEventListener('submit', getQuotes);
};

const paintQuotes = (obj) => {
  const quotesContent = document.createElement('h1');
  quotesContent.setAttribute('class', 'quotes__content');

  const quotesAuthor = document.createElement('span');
  quotesAuthor.setAttribute('class', 'quotes__author');

  quotesContent.textContent = `"${obj.quote}"`;
  quotesAuthor.textContent = `- ${obj.author} -`;

  quotes.appendChild(quotesContent);
  quotes.appendChild(quotesAuthor);
};

const getQuotes = () => {
  const quotesParsedObj = JSON.parse(localStorage.getItem(QUOTES_LS));

  if (quotesParsedObj === null || quotesParsedObj.day !== new Date().getDay()) {
    fetch('https://type.fit/api/quotes')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const quotesIndex = Math.floor(Math.random() * json.length);
        const author =
          json[quotesIndex].author === null
            ? 'Author Unknown '
            : json[quotesIndex].author;
        const text = json[quotesIndex].text;
        const day = new Date().getDay();

        const quoteObj = {
          day: day,
          quotesIndex: quotesIndex,
          author: author,
          quote: text,
        };

        localStorage.setItem(QUOTES_LS, JSON.stringify(quoteObj));

        paintQuotes(quoteObj);
      });
  } else {
    paintQuotes(quotesParsedObj);
  }
};

const quotesInit = () => {
  const userName = localStorage.getItem(USER_LS);
  if (userName !== null) {
    getQuotes();
  }
  onNameSubmit();
};

quotesInit();

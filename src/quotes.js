import { USER_LS, userForm } from './greeting.js';

const quotes = document.querySelector('.quotes');

const onNameSubmit = () => {
  userForm.addEventListener('submit', getQuotes);
};

const paintQuotes = (obj) => {
  const quotesContent = document.createElement('h1');
  const quotesAuthor = document.createElement('span');
  quotesContent.textContent = obj.quote;
  quotesContent.style.fontSize = '48px';

  quotesAuthor.textContent = `- ${obj.author} -`;
  quotesAuthor.style.transform = `translateX(${-150}px)`;
  quotesAuthor.style.paddingTop = '18px';
  quotesAuthor.style.fontSize = '24px';

  quotes.appendChild(quotesContent);
  quotes.appendChild(quotesAuthor);
};

const getQuotes = () => {
  fetch(`https://quotes.rest/qod`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
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
  onNameSubmit();
};

quotesInit();

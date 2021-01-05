'use strict';

export default class Quotes {
  constructor() {
    this.quotes = document.querySelector('.quotes');
    this.quotesContent = this.quotes.querySelector('.quotes__content');
    this.quotesAuthor = this.quotes.querySelector('.quotes__author');
    this.QUOTES_LS = 'quotes';
  }

  paintQuotes = (obj) => {
    this.quotesContent.textContent = `"${obj.quote}"`;
    this.quotesAuthor.textContent = `- ${obj.author} -`;
  };

  getQuotes = () => {
    const quotesParsedObj = JSON.parse(localStorage.getItem(this.QUOTES_LS));

    if (
      quotesParsedObj === null ||
      quotesParsedObj.day !== new Date().getDay()
    ) {
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

          localStorage.setItem(this.QUOTES_LS, JSON.stringify(quoteObj));

          this.paintQuotes(quoteObj);
        });
    } else {
      this.paintQuotes(quotesParsedObj);
    }
  };
}

const quotes = document.querySelector('.quotes');
const quotesContent = quotes.querySelector('h1');
const quotesAuthor = quotes.querySelector('span');

const paintQuotes = (obj) => {
  console.log(obj);
  quotesContent.innerText = obj.quote;
  quotesAuthor.innerText = obj.author;
};

const getQuotes = () => {
  fetch(`https://quotes.rest/qod`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      // console.log(json.contents.quotes);
      // console.log(json.contents.quotes[0]);
      // console.log(json.contents.quotes[0].quote);
      // console.log(json.contents.quotes[0].author);
      const quoteObj = {
        author: json.contents.quotes[0].author,
        quote: json.contents.quotes[0].quote,
      };
      // console.log(quoteObj);
      // return {
      //   author: json.contents.quotes[0].author,
      //   quote: json.contents.quotes[0].quote,
      // };
      paintQuotes(quoteObj);
    });
};

const quotesInit = () => {
  getQuotes();
};

quotesInit();

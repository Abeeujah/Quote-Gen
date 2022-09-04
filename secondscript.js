// DOM elements

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorQuote = document.getElementById('author');
const tweetButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Counter
let counter = 0;

// Loading Effect

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = false;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Quote Gen from forismatic

async function getQuote() {
    showLoadingSpinner();
    const pyroxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(pyroxyUrl + apiUrl);
        const data = await response.json();
        // Author Check
        if (data.quoteAuthor === '') {
            authorQuote.innerText = 'Unknown';
        } else {
            authorQuote.innerText = data.author;    
        }
        // Quote Check
        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.text;
        // Load Complete
        removeLoadingSpinner();
        counter++;
    } catch (error) {
        if (i < 4) {
            getQuote();
        }
        console.log('Whoops no quote', error);
    }
}

// Tweet Button

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorQuote.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

tweetButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote);

// On Load

getQuote();
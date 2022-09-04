const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const tweetButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loader

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get a Quote

function newQuote() {
    // Randomly
    // Loader display
    showLoadingSpinner();
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Author Check
    if (!quote.author) {
        quote.author = 'Unknown';
    } else {
        quoteAuthor.textContent = quote.author;
    }
    // Long Quote Check
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote and Hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

//  Get Quotes from API

async function getQuotes() {
    // Loader
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = response.json();
        newQuote();
    } catch (error) {
        // getQuotes();
    }
}

// Tweet Function

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event Listener

newQuoteButton.addEventListener('click', newQuote);
tweetButton.addEventListener('click', tweetQuote);

// On Load

getQuotes();
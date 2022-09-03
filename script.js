const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const tweetButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

let apiQuotes = [];

// Get a Quote

function newQuote() {
    // Randomly
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
    quoteText.textContent = quote.text;
}

//  Get Quotes from API

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = response.json();
        console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // getQuotes();
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener

newQuoteButton.addEventListener('click', newQuote);
tweetButton.addEventListener('click', tweetQuote);

// On Load

getQuotes();
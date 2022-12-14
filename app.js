// HTML elements
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const controls = document.querySelector('.controls');
const authorButton = controls.querySelector('.controls__author');
const listenButton = controls.querySelector('.controls__listen');
const copyButton = controls.querySelector('.controls__copy');
const copyPopup = document.querySelector('.popup')
const generateButton = controls.querySelector('.controls__generate');

// Generate new quote
randomQuote();
generateButton.addEventListener('click', randomQuote);

// Show author by mouse
authorButton.addEventListener('click', showAuthorName);

// Listen
listenButton.addEventListener('click', speech)

// Copy
copyButton.addEventListener('click', getCopy)

// Utils
function randomQuote() {
  fetch('https://api.quotable.io/random')
    .then(resolve => resolve.json())
    .then(result => {
  quoteText.textContent = result.content;
  quoteAuthor.textContent = `— ${result.author}`;

  showQuote();
  })
    .catch(err => console.log(Error(err)))
}

function showAuthor() {
  if (checkQuote()) return;
  else {
    quoteText.classList.add('quote__text--hidden')
    quoteAuthor.classList.remove('quote__author--hidden')
  }
}

function showQuote() {
  if (checkQuote()) return;
  else {
    quoteText.classList.remove('quote__text--hidden')
    quoteAuthor.classList.add('quote__author--hidden')
  }
}

function showAuthorName() {
  if (checkQuote()) return;
  else {
    quoteText.classList.toggle('quote__text--hidden')
    quoteAuthor.classList.toggle('quote__author--hidden')
  }
}

function checkQuote() {
  if (quoteText.textContent.length === 0) true;
}

function isAuthor() {
  if (quoteText.classList.contains('quote__text--hidden')) {
    return true;
  } 

  return false;
}

function speech() {
  let speech = new SpeechSynthesisUtterance(`${isAuthor() ? quoteAuthor.textContent : quoteText.textContent}`);
  speechSynthesis.speak(speech)
}

function getCopy() {
  if (checkQuote()) return;
  else {
    navigator.clipboard.writeText(`${isAuthor() ? quoteAuthor.textContent : quoteText.textContent}`);

    copyPopup.classList.remove('popup--hidden');

    setTimeout(() => {
      copyPopup.classList.add('popup--hidden');
    }, 1500)
  }
}

const wordElement = document.getElementById('random-word');

async function fetchRandomWord() {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();

    document.title = data; // Set the page title to the random word
  } catch (error) {
    console.error('Error fetching word:', error);
    wordElement.textContent = 'Error fetching word.';
  }
}

// Call the function to fetch a random word on page load
fetchRandomWord();

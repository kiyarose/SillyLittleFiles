const wordElement = document.getElementById('random-word')
// Fetch a random word for page title and downloads
async function fetchRandomWord () {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word')
    const data = await response.json()

    document.title = `SLF — ${data}` // Set the page title to the random word
  } catch (error) {
    console.error('Error fetching word:', error)
  }
}

// Call the function to fetch a random word on page load
fetchRandomWord()
// prettier-ignore
{
  document.getElementById('udate').innerHTML =
      document.getElementById('udate').innerHTML + document.lastModified
}
// Fetch last modified date and apply it to the udate element that is on some
// pages.

// Defined the copyToClipboard function, that is used on some pages
function copyToClipboard (text) {
  const textarea = document.createElement('textarea')
  textarea.textContent = text
  textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy') // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex)
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}

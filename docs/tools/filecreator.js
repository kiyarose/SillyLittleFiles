function submit () {
  const nametype = document.getElementById('nametype').value
  const hostname = document.getElementById('hostname').value
  const hostport = document.getElementById('hostport').value
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const inputBox = document.getElementById('inputBox')
  document.getElementById('nametype').disabled = true
  document.getElementById('hostname').disabled = true
  document.getElementById('hostport').disabled = true
  document.getElementById('username').disabled = true
  document.getElementById('password').disabled = true
  let text = inputBox.value
  text = text.replace('"Name": "NME"', '"Name": "' + nametype + '"')
  text = text.replace('"Host": "HST"', '"Host": "' + hostname + '"')
  text = text.replace('"Port": "PRT"', '"Port": ' + hostport)
  text = text.replace('"Username": "USNM"', '"Username": "' + username + '"')
  text = text.replace('"Password": "PASSD"', '"Password": "' + password + '"')
  inputBox.value = text // Inject data into inputbox
  const ftext = document.getElementById('inputBox').value // And now a new variable to prevent duplacated declarations
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(ftext) // Inject that var into the onc text/plain format
  )
  async function fetchRandomWord () {
    try {
      const response = await fetch(
        'https://random-word-api.herokuapp.com/word'
      )
      const data = await response.json()

      const filename = data + '.onc' // Set the page title to the random word
      return filename
    } catch (error) {
      console.error('Error fetching in fetchRandomWord:', error)
      const filename = 'pop.onc' // Fallback to default file name if error
      return filename
    }
  }
  async function downloadFile () {
    try {
      const filename = await fetchRandomWord()
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      window.location.reload()
      alert('Your file has been delivered as: ' + filename)
    } catch (error) {
      console.error('Error fetching word in downloadFile:', error)
      element.setAttribute('download', 'pop.onc')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      window.location.reload()
      alert('Your file has been delivered as: ' + filename)
    }
  }
  downloadFile() // Call the async function
}

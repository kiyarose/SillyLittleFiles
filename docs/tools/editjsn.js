// Make the JSON pretty
function beautifyJSON () {
  const jsonText = document.getElementById('jsonInput').value
  try {
    const jsonData = JSON.parse(jsonText)
    const formattedJson = JSON.stringify(jsonData, null, 2)
    document.getElementById('output').textContent = formattedJson
  } catch (error) {
    document.getElementById('output').textContent = 'Error: Invalid JSON'
  }
}
// Make sure the JSON isnt crap
function validateJSON () {
  const jsonText = document.getElementById('jsonInput').value
  try {
    JSON.parse(jsonText)
    document.getElementById('output').textContent = 'Valid JSON'
  } catch (error) {
    document.getElementById('output').textContent = 'Error: Invalid JSON'
  }
}
// Download the good JSON
function downloadJSON () {
  const jsonText = document.getElementById('jsonInput').value
  const filename = 'out.json'
  const blob = new Blob([jsonText], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

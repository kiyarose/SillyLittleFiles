const s1 = document.getElementById('script1')
s1.style.display = 'none'
console.log('Set visibility to none to prevent dual clicking')

// Function to toggle the visibility of the dropdown
function DropdownSet () {
  const s1 = document.getElementById('script1')
  s1.style.display = 'none'
  console.log('Set visibility to none to prevent dual clicking')
}
// Toggle Dropdown
function toggleDropdown (dropdownId) {
  const dropdown = document.getElementById(dropdownId)
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block'
  } else {
    dropdown.style.display = 'none'
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetchcreds() // Call fetchcreds on page load
})
window.dataLayer = window.dataLayer || []

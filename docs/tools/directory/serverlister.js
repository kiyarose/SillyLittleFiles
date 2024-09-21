      var s1 = document.getElementById("script1");
      var s0 = document.getElementById("script0");
      s1.style.display = "none";
      s0.style.display = "none";
      console.log("Set visibility to none to prevent dual clicking");

      // Function to toggle the visibility of the dropdown
      function DropdownSet() {
        var s1 = document.getElementById("script1");
        var s0 = document.getElementById("script0");
        s1.style.display = "none";
        s0.style.display = "none";
        console.log("Set visibility to none to prevent dual clicking");
      }
      function toggleDropdown(dropdownId) {
        var dropdown = document.getElementById(dropdownId);
        if (dropdown.style.display === "none") {
          dropdown.style.display = "block";
        } else {
          dropdown.style.display = "none";
        }
      }

      document.addEventListener("DOMContentLoaded", function () {
        fetchcreds(); // Call fetchcreds on page load
      });
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-009HP51NPG');

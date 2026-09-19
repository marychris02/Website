// =========================================================
// NAVBAR: mobile menu + dropdown menus (Vanilla JavaScript)
// =========================================================

// ---------------------------------------------------------
// 1. SELECT THE ELEMENTS (DOM selection)
// ---------------------------------------------------------
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown'); // both dropdowns


// ---------------------------------------------------------
// 2. HELPER FUNCTIONS
// ---------------------------------------------------------

// Keeps the arrow (▼ / ▲) and aria-expanded in sync with the menu.
function updateDropdownState(dropdown) {
  const dropdownButton = dropdown.querySelector('.dropdown-btn');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const dropdownArrow = dropdown.querySelector('.dropdown-arrow');

  const isOpen = dropdownMenu.classList.contains('show');

  dropdownArrow.innerHTML = isOpen ? '&#9650;' : '&#9660;'; // ▲ when open, ▼ when closed
  dropdownButton.setAttribute('aria-expanded', isOpen);
}

// Hides one dropdown.
function closeDropdown(dropdown) {
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  dropdownMenu.classList.remove('show');
  updateDropdownState(dropdown);
}

// Hides every dropdown.
function closeAllDropdowns() {
  dropdowns.forEach(closeDropdown);
}


// ---------------------------------------------------------
// 3. DROPDOWN CLICK EVENT (one listener per dropdown)
// ---------------------------------------------------------
dropdowns.forEach(function (dropdown) {
  const dropdownButton = dropdown.querySelector('.dropdown-btn');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');

  dropdownButton.addEventListener('click', function () {

    // Close the other dropdown so two menus are never open at once
    dropdowns.forEach(function (otherDropdown) {
      if (otherDropdown !== dropdown) {
        closeDropdown(otherDropdown);
      }
    });

    // First click adds "show" (opens), second click removes it (closes)
    dropdownMenu.classList.toggle('show');

    updateDropdownState(dropdown);
  });
});


// ---------------------------------------------------------
// 4. BONUS: CLOSE WHEN CLICKING OUTSIDE
// ---------------------------------------------------------
document.addEventListener('click', function (event) {
  dropdowns.forEach(function (dropdown) {
    if (!dropdown.contains(event.target)) {
      closeDropdown(dropdown);
    }
  });
});

// Extra: pressing Escape also closes the dropdowns
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeAllDropdowns();
  }
});


// ---------------------------------------------------------
// 5. MOBILE MENU (hamburger) — moved here from index.html
// ---------------------------------------------------------
hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// After choosing any link (normal or inside a dropdown), close the menus
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    closeAllDropdowns();
  });
});

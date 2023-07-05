// Select the navigation bar element
const navbar = document.getElementById('navbar');

// Function to toggle the background color of the navigation bar
function toggleNavbarBackground() {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const scrollThreshold = 50; // Adjust this value as needed

  if (scrollPosition > scrollThreshold) {
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-white');
  } else {
    navbar.classList.remove('bg-white');
    navbar.classList.add('bg-transparent');
  }
}

// Listen for scroll events and toggle the background color accordingly
window.addEventListener('scroll', toggleNavbarBackground);
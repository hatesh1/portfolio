
// set current year in footer
// const y = new Date().getFullYear();
// const el = document.getElementById('ryear');
// if (el) el.textContent = y;


const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

burger.addEventListener('click', () => {
  navList.classList.toggle('show');
});


// 🌗 Theme Toggle - Updated for Mobile
const toggleBtn = document.getElementById('theme-toggle');
const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

// Theme toggle function
function toggleTheme() {
  body.classList.toggle('dark-mode');

  const isDarkMode = body.classList.contains('dark-mode');
  const sunIcon = '<i class="fa-solid fa-sun"></i>';
  const moonIcon = '<i class="fa-solid fa-moon"></i>';

  if (isDarkMode) {
    // Update both buttons
    if (toggleBtn) toggleBtn.innerHTML = sunIcon;
    if (toggleBtnMobile) toggleBtnMobile.innerHTML = sunIcon;
    localStorage.setItem('theme', 'dark');
  } else {
    // Update both buttons
    if (toggleBtn) toggleBtn.innerHTML = moonIcon;
    if (toggleBtnMobile) toggleBtnMobile.innerHTML = moonIcon;
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  const sunIcon = '<i class="fa-solid fa-sun"></i>';
  if (toggleBtn) toggleBtn.innerHTML = sunIcon;
  if (toggleBtnMobile) toggleBtnMobile.innerHTML = sunIcon;
}

// Add event listeners to both theme toggle buttons
if (toggleBtn) {
  toggleBtn.addEventListener('click', toggleTheme);
}

if (toggleBtnMobile) {
  toggleBtnMobile.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent burger menu toggle when clicking theme button
    toggleTheme();
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-list') && !e.target.closest('.burger') && navList.classList.contains('show')) {
    navList.classList.remove('show');
  }
});



// Back to Top and bottom Button Functionality
const backToTopBtn = document.getElementById('backToTop');
let lastScrollPosition = 0;
let isScrollingDown = true;

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Scroll direction detect karo
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
    
    // Show/hide logic
    if (currentScroll > 100 && currentScroll < (document.body.scrollHeight - window.innerHeight - 100)) {
      backToTopBtn.classList.add('show');
      
      // Change button behavior based on scroll direction
      if (isScrollingDown) {
        backToTopBtn.innerHTML = '⬆'; // Top pe jaane ke liye
        backToTopBtn.title = "Go to Top";
      } else {
        backToTopBtn.innerHTML = '⬇'; // Bottom pe jaane ke liye  
        backToTopBtn.title = "Go to Bottom";
      }
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Click handler
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isScrollingDown) {
      // Top pe jao
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Bottom pe jao
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
}

// set current year in footer
// const y = new Date().getFullYear();
// const el = document.getElementById('ryear');
// if (el) el.textContent = y;


const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

burger.addEventListener('click', () => {
  navList.classList.toggle('show');
});



// 🌗 Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Toggle theme on click
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});


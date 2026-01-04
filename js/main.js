
// set current year in footer
// const y = new Date().getFullYear();
// const el = document.getElementById('ryear');
// if (el) el.textContent = y;


document.addEventListener('DOMContentLoaded', () => {

  const burger = document.querySelector('.burger');
  const navMenu = document.getElementById('nav-menu');
  const closeBtn = document.querySelector('.menu-close');

  // Open Menu
  burger.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.getElementById('overlay').classList.add('active');
  });

  // Close Menu
  closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
  });

  const overlay = document.getElementById('overlay');

  overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const overlay = document.getElementById('overlay');
      if (overlay) overlay.classList.remove('active');
    });
  });

  // 2. Theme Toggle Logic (Clean & Dual Button Support)
  const themeBtns = document.querySelectorAll('.theme-toggle'); // Dono buttons ko aik saath select karein
  const body = document.body;

  function updateIcons(isDark) {
    const icon = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeBtns.forEach(btn => btn.innerHTML = icon);
  }

  // Check saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    updateIcons(true);
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcons(isDark);
    });
  });

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
        backToTopBtn.innerHTML = '↑'; // Hamesha Up arrow rakhein
        backToTopBtn.title = "Back to Top";
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

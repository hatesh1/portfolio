 const burger = document.querySelector('.burger');
 const navMenu = document.querySelector('nav ul');

  burger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });


  // set current year in footer
        const y = new Date().getFullYear();
        const el = document.getElementById('ryear');
        if (el) el.textContent = y;
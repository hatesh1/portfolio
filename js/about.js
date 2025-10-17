
const subnavToggle = document.getElementById('subnavToggle');
const subnavLinks = document.querySelector('.subnav-links');

subnavToggle.addEventListener('click', () => {
  subnavLinks.classList.toggle('show');
});

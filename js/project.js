
function filterProjects(category, btn) {
  // 1. Update Active Button UI
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.project-card:not(.featured)');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // Mobile check (under 768px)
  const isMobile = window.innerWidth <= 768;
  const limit = isMobile ? 2 : 6;
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardCat = card.getAttribute('data-category');

    // 2. Logic: if category matches or 'all' is selected
    if (category === 'all' || cardCat === category) {
      if (visibleCount < limit) {
        card.style.display = 'flex';
        card.classList.remove('mobile-hidden', 'desktop-hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('mobile-hidden', 'desktop-hidden');
      }
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // See more button logic
  if (visibleCount > limit) {
    loadMoreBtn.style.display = 'inline-block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

function showMoreProjects() {
  // just show the matching cards
  const activeBtn = document.querySelector('.filter-btn.active');
  const category = activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1];

  const cards = document.querySelectorAll('.project-card:not(.featured)');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.classList.remove('mobile-hidden', 'desktop-hidden');
      card.style.animation = "fadeInUp 0.6s ease forwards";
    }
  });

  document.getElementById('loadMoreBtn').style.display = 'none';
}


function viewLive(url) {
  Swal.fire({
    title: 'Launching Live Demo',
    text: 'I am taking you to the hosted version of this project. Enjoy exploring the live interface!',
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#0078ff',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Let\'s Go!',
    cancelButtonText: 'Stay Here'
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval;
      Swal.fire({
        title: 'Redirecting...',
        html: 'Opening in <b></b> milliseconds.',
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then(() => {
        window.open(url, '_blank');
      });
    }
  });
}

function comingSoon() {
  Swal.fire({
    title: 'Project Under Deployment',
    text: 'I am currently setting up the live environment for this project. It will be available online very soon!',
    icon: 'info',
    confirmButtonColor: '#0078ff',
    confirmButtonText: 'Got it!'
  });
}

function viewCode(url) {
  Swal.fire({
    title: 'Ready to Explore?',
    text: 'I hope you find the logic behind this project interesting. A star on GitHub would be much appreciated!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#0078ff',
    cancelButtonColor: '#d33',
    confirmButtonText: 'View on GitHub',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(url, '_blank');
    }
  });
}
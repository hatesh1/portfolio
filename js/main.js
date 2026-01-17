
// set current year in footer
// const y = new Date().getFullYear();
// const el = document.getElementById('ryear');
// if (el) el.textContent = y;

// Mobile Navigation Menu Logic
document.addEventListener('DOMContentLoaded', () => {

  const burger = document.querySelector('.burger');
  const navMenu = document.getElementById('nav-menu');
  const closeBtn = document.querySelector('.menu-close');

  const rootElement = document.documentElement;

  burger.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.getElementById('overlay').classList.add('active');
  });

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
      if (overlay) overlay.classList.remove('active');
    });
  });

  // Theme Toggle Logic
  const themeBtns = document.querySelectorAll('.theme-toggle');

  function updateIcons(isDark) {
    const icon = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeBtns.forEach(btn => btn.innerHTML = icon);
  }

  if (localStorage.getItem('theme') === 'dark') {
    rootElement.classList.add('dark-mode');
    updateIcons(true);
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      rootElement.classList.toggle('dark-mode');
      const isDark = rootElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcons(isDark);
    });
  });

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
        backToTopBtn.innerHTML = '↑';
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


// Resume Download with SweetAlert2
const resumeBtn = document.getElementById('resumeBtn');

if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const resumeUrl = './asset/Hatesh-Lakhani-Resume.pdf';

    // STEP 1: first option alert
    Swal.fire({
      title: '<strong>My Resume</strong>',
      icon: 'info',
      html: `
                <div class="resume-alert-container">
                    <i class="fas fa-file-pdf resume-icon" style="font-size:50px; color:#ff4757;"></i>
                    <p style="margin-top:10px;"><b>Hatesh-Lakhani-Resume.pdf</b></p>
                </div>
            `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-eye"></i> View Online',
      denyButtonText: '<i class="fa fa-download"></i> Download PDF',
      confirmButtonColor: '#0078ff',
      denyButtonColor: '#2ed573',
    }).then((result) => {
      if (result.isConfirmed) {
        // View Online Logic
        window.open(resumeUrl, '_blank');
      } else if (result.isDenied) {
        // STEP 2: Download Progress Logic
        showDownloadProgress(resumeUrl);
      }
    });
  });
}

// Function for Circular Progress
function showDownloadProgress(url) {
  Swal.fire({
    title: 'Downloading...',
    html: `
            <div class="progress-wrapper">
                <div class="circular-progress">
                    <span class="progress-value" style="color: #0078ff !important;">0%</span>
                </div>
            </div>
        `,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      const progressBar = document.querySelector(".circular-progress");
      const valueContainer = document.querySelector(".progress-value");
      let progressValue = 0;

      let progress = setInterval(() => {
        progressValue++;
        valueContainer.textContent = `${progressValue}%`;
        progressBar.style.background = `conic-gradient(#0078ff ${progressValue * 3.6}deg, #cadcff 0deg)`;

        if (progressValue == 100) {
          clearInterval(progress);

          // Actual Download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Hatesh-Lakhani-Resume.pdf';
          link.click();

          // STEP 3: Final Success Message with OK button
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Resume has been downloaded successfully.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0078ff'
          });
        }
      }, 25); // Speed of animation
    }
  });
}

/* --- 1. Scroll Reveal Logic --- */
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal();

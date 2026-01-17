
/* --- Slider with WebP Pre-loading Logic --- */
let slideIndex = 0;
let slideTimer;
const wrapper = document.getElementById("sliderWrapper");
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");
const allImages = wrapper.querySelectorAll("img");

// Logic: check all images are loaded before starting slider
let imagesLoadedCount = 0;

function checkAndStartSlider() {
  imagesLoadedCount++;
  // when all images are loaded, start the slider
  if (imagesLoadedCount === allImages.length) {
    showSlides();
  }
}

// Check each image's load status
allImages.forEach((img) => {
  if (img.complete) {
    checkAndStartSlider();
  } else {
    img.addEventListener('load', checkAndStartSlider);
    img.addEventListener('error', checkAndStartSlider); // Error pe bhi skip karein taake slider na ruke
  }
});

function showSlides() {
  clearTimeout(slideTimer);

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  //  After 3 seconds, next slide show
  slideTimer = setTimeout(showSlides, 3000);
}

/* --- 3. Mouse Hover Controls --- */
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(slideTimer);
});

wrapper.addEventListener("mouseleave", () => {
  // leave mouse, resume after 1 second
  slideTimer = setTimeout(showSlides, 1000);
});
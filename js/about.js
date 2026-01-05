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
reveal(); // Initial check


/* --- 2. Slider with WebP Pre-loading Logic --- */
let slideIndex = 0;
let slideTimer;
const wrapper = document.getElementById("sliderWrapper");
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");
const allImages = wrapper.querySelectorAll("img");

// Logic: Check karein ke saari images download ho gayi hain
let imagesLoadedCount = 0;

function checkAndStartSlider() {
  imagesLoadedCount++;
  // Jab saari images (e.g. 3 images) load ho jayengi tab slider start hoga
  if (imagesLoadedCount === allImages.length) {
    showSlides();
  }
}

// Har image par check lagayenge
allImages.forEach((img) => {
  if (img.complete) {
    checkAndStartSlider();
  } else {
    img.addEventListener('load', checkAndStartSlider);
    img.addEventListener('error', checkAndStartSlider); // Error pe bhi skip karein taake slider na ruke
  }
});

function showSlides() {
  // Purana timer saaf karein taake double slides na chalein
  clearTimeout(slideTimer);
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }    
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if(slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
  
  // 3 second baad agli slide
  slideTimer = setTimeout(showSlides, 3000); 
}

/* --- 3. Mouse Hover Controls --- */
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(slideTimer);
});

wrapper.addEventListener("mouseleave", () => {
  // Mouse hatne ke 1 second baad dubara automatic shuru
  slideTimer = setTimeout(showSlides, 1000);
});
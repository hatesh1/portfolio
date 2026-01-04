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


let slideIndex = 0;
let slideTimer;
const wrapper = document.getElementById("sliderWrapper");

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  
  // Har 3 second baad slide change hogi
  slideTimer = setTimeout(showSlides, 3000); 
}

// Slider shuru karein
showSlides();

// Mouse hover par rokne ka logic
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(slideTimer);
});

// Mouse hatne par dubara shuru
wrapper.addEventListener("mouseleave", () => {
  slideTimer = setTimeout(showSlides, 1000);
});
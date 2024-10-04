const projectSlider = document.querySelector('.project-slider');
const projectSlides = document.querySelectorAll('.project-slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentSlide = 0;

projectSlides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

prevButton.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = projectSlides.length - 1;
  }
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= projectSlides.length) {
    currentSlide = 0;
  }
  updateSlider();
});

function updateSlider() {
  projectSlides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.style.transform = `translateX(0%)`;
    } else {
      slide.style.transform = `translateX(${index > currentSlide ? '100%' : '-100%'})`;
    }
  });
}
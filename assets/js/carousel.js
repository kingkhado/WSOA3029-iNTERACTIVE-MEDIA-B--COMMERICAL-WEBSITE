const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const carousel = document.querySelector('.carousel');
const listHTML = document.querySelector('.carousel .list');
const seeMoreButtons = document.querySelectorAll('.seeMore');
const backButton = document.getElementById('back');

let unAcceptClick; // Corrected spelling

nextButton.onclick = function() {
    showSlider('next');
}

prevButton.onclick = function() {
    showSlider('prev');
}

const showSlider = (direction) => { // Use a consistent naming convention
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    const items = document.querySelectorAll('.carousel .list .item');

    if (direction === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(unAcceptClick); // Clear timeout if it exists
    unAcceptClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
}

seeMoreButtons.forEach((button) => {
    button.onclick = function() {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

backButton.onclick = function() {
    carousel.classList.remove('showDetail');
}

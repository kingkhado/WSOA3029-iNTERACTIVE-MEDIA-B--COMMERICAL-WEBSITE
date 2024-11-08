/*=============== SHOW MENU ===============*/
const navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Define the navigation bar items
const navItems = [
  { title: 'Home', href: 'index.html' },
  { title: 'Testimony', href: 'testimony.html' },
  { title: 'Donate', href: 'donation.html' },
  { title: 'Bubble-Node Visual', href: 'datavisualisation.html' },
  { title: 'Graph Visual', href: 'datavisualisation2.html' },
  { title: 'Design', href: 'design.html' },
  { title: 'Theory', href: 'theory.html' }
];

// Create the navigation bar element
const navBar = document.querySelector('.nav');

// Create the navigation bar items
const navList = document.createElement('ul');
navList.classList.add('nav__list');

navItems.forEach((item) => {
  const navItem = document.createElement('li');
  navItem.classList.add('nav__item');

  const navLink = document.createElement('a');
  navLink.href = item.href;
  navLink.textContent = item.title;
  navLink.classList.add('nav__link');

  navItem.appendChild(navLink);
  navList.appendChild(navItem);
});

navBar.appendChild(navList);

// Add the toggle button to the navigation bar
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
})

// Add the close button to the navigation bar
navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
})

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = document.getElementById('scroll-up');
if (scrollUp) {
  window.addEventListener('scroll', () =>{
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
  })
  // Add the show-scroll class to the scroll up button when the page loads
  window.addEventListener('load', () =>{
    scrollUp.classList.add('show-scroll')
  })
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.id,
      sectionsClass = document.querySelector(`.nav__link[href*='${sectionId}']`);

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      if (sectionsClass) {
        sectionsClass.classList.add('active-link');
      }
    } else {
      if (sectionsClass) {
        sectionsClass.classList.remove('active-link');
      }
    }
  });
};
window.addEventListener('scroll', scrollActive);



/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2500,
    delay: 300,
    // reset: true, // Animations repeat
})

sr.reveal(`.home__img, .new__data, .care__img, .contact__content, .footer`)
sr.reveal(`.home__data, .care__list, .contact__img`, {delay: 500})
sr.reveal(`.new__card`, {delay: 500, interval: 100})
sr.reveal(`.shop__card`, {interval: 100})




/* Donation */

const donateButtonLetters = document.querySelectorAll('.donate__button-letter');
let currentLetterIndex = 0;

donateButtonLetters.forEach((letter, index) => {
  letter.addEventListener('click', () => {
    if (index === currentLetterIndex) {
      letter.classList.add('lit-up');
      currentLetterIndex++;
      if (currentLetterIndex === donateButtonLetters.length) {
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }
    }
  });
});

// Get all shop buttons with the redirect-to-donation class
const shopButtons = document.querySelectorAll('.redirect-to-donation');

// Add event listener to each shop button
shopButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Button clicked');
    // Redirect to donation.html page
    window.location.href = 'donation.html';
  });
});

// Get the current page's filename from the URL
const currentPage = window.location.pathname.split('/').pop();
console.log("Current page filename:", currentPage); // Debugging

// Loop through each nav link to add the 'active-link' class based on the filename
navItems.forEach((item) => {
  const navLink = document.querySelector(`.nav__link[href="${item.href}"]`);
  
  // Log to see what we’re comparing
  console.log("Comparing navItem href:", item.href, "with currentPage:", currentPage); // Debugging
  
  // Check if the link's filename matches the current page filename exactly
  if (navLink && item.href.split('/').pop() === currentPage) {
    navLink.classList.add('active-link');
  }
});

// progress bare
window.onscroll = function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Update height based on scroll
  document.getElementById('progressFill').style.height = scrollPercent + '%'; // Change width to height

  // Change color from blue to white based on scroll percentage
  const blueToWhite = Math.min(scrollPercent / 100, 1); // Calculate transition factor
  const blueValue = Math.round(255 - (blueToWhite * 255)); // Calculate blue value
  const fillColor = `rgb(${blueValue}, ${blueValue}, 255)`; // Create RGB color
  document.getElementById('progressFill').style.backgroundColor = fillColor; // Apply color
};

// essay

document.addEventListener('DOMContentLoaded', () => {
  const openEssayButtons = document.querySelectorAll('.open-essay');
  const pdfModal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');
  const closePdfButton = document.querySelector('.close-pdf');
  let currentEssayIndex = 0;

  // Open PDF in modal
  openEssayButtons.forEach(button => {
      button.addEventListener('click', () => {
          const pdfSrc = button.getAttribute('data-pdf'); // Get PDF link from data attribute
          pdfViewer.src = pdfSrc;
          pdfModal.style.display = 'flex';
      });
  });

  // Close modal
  closePdfButton.addEventListener('click', () => {
      pdfModal.style.display = 'none';
      pdfViewer.src = ''; // Clear src to stop loading the PDF
  });

  // Show the initial essay
  showEssay(currentEssayIndex);

  // Add event listeners to navigation dots
  document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentEssayIndex = index;
          showEssay(currentEssayIndex);
      });
  });
});

function showEssay(index) {
  const essays = document.querySelectorAll('.essay-card');
  const dots = document.querySelectorAll('.dot');

  essays.forEach((essay, i) => {
      essay.classList.remove('active'); // Hide all essays
      dots[i].classList.remove('active'); // Remove active class from all dots
  });

  essays[index].classList.add('active'); // Show current essay
  dots[index].classList.add('active'); // Highlight current dot
}

function toggleFullText(button) {
  const fullText = button.closest('.essay-card').querySelector('.full-text');
  const readMoreBtn = button;

  if (fullText.style.display === "none") {
      fullText.style.display = "block";
      readMoreBtn.textContent = "Read Less";
  } else {
      fullText.style.display = "none";
      readMoreBtn.textContent = "Read More";
  }
}


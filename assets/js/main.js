/*=============== SHOW MENU ===============*/
const navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Define the navigation bar items
const navItems = [
  { title: 'Home', href: 'index.html' },
  { title: 'Mission', href: 'mission.html' },
  { title: 'Donate', href: 'donation.html' },
  { title: 'Data Visualisation', href: 'datavisualisation.html' },
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
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

if (sectionsClass) {
  if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
    sectionsClass.classList.add('active-link')
  }else{
    sectionsClass.classList.remove('active-link')
  }
}

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
        // Redirect to donation.html page
        window.location.href = 'donation.html';
    });
});
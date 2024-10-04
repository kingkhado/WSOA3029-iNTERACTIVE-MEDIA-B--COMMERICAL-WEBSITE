/*=============== FOOTER ===============*/
const footer = document.createElement('footer');
footer.classList.add('footer');

const footerContainer = document.createElement('div');
footerContainer.classList.add('footer__container', 'container', 'grid');

const footerContent = document.createElement('div');
footerContent.classList.add('footer__content', 'grid');

// Company section
const companySection = document.createElement('div');
const companyTitle = document.createElement('h3');
companyTitle.classList.add('footer__title');
companyTitle.textContent = 'COMPANY';

const companyLinks = document.createElement('ul');
companyLinks.classList.add('footer__links');

const companyLink1 = document.createElement('li');
const companyLink1A = document.createElement('a');
companyLink1A.classList.add('footer__link');
companyLink1A.href = 'index.html#about'; // Link to the "About Us" section on the main page
companyLink1A.textContent = 'About Us';
companyLink1.appendChild(companyLink1A);
companyLinks.appendChild(companyLink1);

const companyLink2 = document.createElement('li');
const companyLink2A = document.createElement('a');
companyLink2A.classList.add('footer__link');
companyLink2A.href = 'index.html#contact'; // Link to the "Contact Us" section on the main page
companyLink2A.textContent = 'Contact Us';
companyLink2.appendChild(companyLink2A);
companyLinks.appendChild(companyLink2);

companySection.appendChild(companyTitle);
companySection.appendChild(companyLinks);

// Information section
const informationSection = document.createElement('div');
const informationTitle = document.createElement('h3');
informationTitle.classList.add('footer__title');
informationTitle.textContent = 'INFORMATION';

const informationLinks = document.createElement('ul');
informationLinks.classList.add('footer__links');

const informationLink1 = document.createElement('li');
const informationLink1A = document.createElement('a');
informationLink1A.classList.add('footer__link');
informationLink1A.href = 'donation.html'; // Link to the "Donate" section on the main page
informationLink1A.textContent = 'Donate';
informationLink1.appendChild(informationLink1A);
informationLinks.appendChild(informationLink1);

const informationLink2 = document.createElement('li');
const informationLink2A = document.createElement('a');
informationLink2A.classList.add('footer__link');
informationLink2A.href = 'index.html#care'; // Link to the "Care" section on the main page
informationLink2A.textContent = 'Why Your Effort Matters';
informationLink2.appendChild(informationLink2A);
informationLinks.appendChild(informationLink2);

informationSection.appendChild(informationTitle);
informationSection.appendChild(informationLinks);

// Social media section
const socialMediaSection = document.createElement('div');
const socialMediaTitle = document.createElement('h3');
socialMediaTitle.classList.add('footer__title');
socialMediaTitle.textContent = 'SOUTH AFRICAN HOMELESS ORGANISATIONS';

const socialMediaLinks = document.createElement('div');
socialMediaLinks.classList.add('contact__social');

const socialMediaLink1 = document.createElement('a');
socialMediaLink1.href = 'https://www.sacbc.org.za/'; // Link to the SACBC website
socialMediaLink1.target = '_blank';
const socialMediaLink1I = document.createElement('i');
socialMediaLink1I.classList.add('ri-link');
socialMediaLink1.appendChild(socialMediaLink1I);
socialMediaLink1.textContent = ' SACBC';
socialMediaLinks.appendChild(socialMediaLink1);



const socialMediaLink3 = document.createElement('a');
socialMediaLink3.href = 'https://homeless.org.za/'; // Link to the U-Turn Cape Town website
socialMediaLink3.target = '_blank';
socialMediaLink3.classList.add('footer__social-link');
const socialMediaLink3I = document.createElement('i');
socialMediaLink3I.classList.add('ri-link');
socialMediaLink3.appendChild(socialMediaLink3I);
socialMediaLink3.textContent = ' U-Turn Cape Town';
socialMediaLinks.appendChild(socialMediaLink3);

socialMediaSection.appendChild(socialMediaTitle);
socialMediaSection.appendChild(socialMediaLinks);

// Append sections to footer content
footerContent.appendChild(companySection);
footerContent.appendChild(informationSection);
footerContent.appendChild(socialMediaSection);

// Append footer content to footer container
footerContainer.appendChild(footerContent);

// Append footer container to footer
footer.appendChild(footerContainer);



// Append copyright text to footer
const footerCopy = document.createElement('span');
footerCopy.classList.add('footer__copy');
footerCopy.innerHTML = '&#169; HELP THE HOMELESS All Rights Reserved';
footer.appendChild(footerCopy);

// Append footer to body
document.body.appendChild(footer);
/*=============== FOOTER ===============*/
const footerElement = document.createElement('footer');
footerElement.classList.add('footer');

const footerContainerElement = document.createElement('div');
footerContainerElement.classList.add('footer__container', 'container', 'grid');

const footerContentElement = document.createElement('div');
footerContentElement.classList.add('footer__content', 'grid');

// Company section
const companySectionElement = document.createElement('div');
const companyTitleElement = document.createElement('h3');
companyTitleElement.classList.add('footer__title');
companyTitleElement.textContent = 'COMPANY';

const companyLinksElement = document.createElement('ul');
companyLinksElement.classList.add('footer__links');

const companyLink1Element = document.createElement('li');
const companyLink1AnchorElement = document.createElement('a');
companyLink1AnchorElement.classList.add('footer__link');
companyLink1AnchorElement.href = 'index.html#about'; // Link to the "About Us" section on the main page
companyLink1AnchorElement.textContent = 'About Us';
companyLink1Element.appendChild(companyLink1AnchorElement);
companyLinksElement.appendChild(companyLink1Element);

const companyLink2Element = document.createElement('li');
const companyLink2AnchorElement = document.createElement('a');
companyLink2AnchorElement.classList.add('footer__link');
companyLink2AnchorElement.href = 'index.html#contact'; // Link to the "Contact Us" section on the main page
companyLink2AnchorElement.textContent = 'Contact Us';
companyLink2Element.appendChild(companyLink2AnchorElement);
companyLinksElement.appendChild(companyLink2Element);

companySectionElement.appendChild(companyTitleElement);
companySectionElement.appendChild(companyLinksElement);

// Information section
const informationSectionElement = document.createElement('div');
const informationTitleElement = document.createElement('h3');
informationTitleElement.classList.add('footer__title');
informationTitleElement.textContent = 'INFORMATION';

const informationLinksElement = document.createElement('ul');
informationLinksElement.classList.add('footer__links');

const informationLink1Element = document.createElement('li');
const informationLink1AnchorElement = document.createElement('a');
informationLink1AnchorElement.classList.add('footer__link');
informationLink1AnchorElement.href = 'donation.html'; // Link to the "Donate" section on the main page
informationLink1AnchorElement.textContent = 'Donate';
informationLink1Element.appendChild(informationLink1AnchorElement);
informationLinksElement.appendChild(informationLink1Element);

const informationLink2Element = document.createElement('li');
const informationLink2AnchorElement = document.createElement('a');
informationLink2AnchorElement.classList.add('footer__link');
informationLink2AnchorElement.href = 'index.html#care'; // Link to the "Care" section on the main page
informationLink2AnchorElement.textContent = 'Why Your Effort Matters';
informationLink2Element.appendChild(informationLink2AnchorElement);
informationLinksElement.appendChild(informationLink2Element);

informationSectionElement.appendChild(informationTitleElement);
informationSectionElement.appendChild(informationLinksElement);

// Social media section
const socialMediaSectionElement = document.createElement('div');
const socialMediaTitleElement = document.createElement('h3');
socialMediaTitleElement.classList.add('footer__title');
socialMediaTitleElement.textContent = 'SOUTH AFRICAN HOMELESS ORGANISATIONS';

const socialMediaLinksElement = document.createElement('div');
socialMediaLinksElement.classList.add('contact__social');

const socialMediaLink1Element = document.createElement('a');
socialMediaLink1Element.href = 'https://www.sacbc.org.za/'; // Link to the SACBC website
socialMediaLink1Element.target = '_blank';
const socialMediaLink1IconElement = document.createElement('i');
socialMediaLink1IconElement.classList.add('ri-link');
socialMediaLink1Element.appendChild(socialMediaLink1IconElement);
socialMediaLink1Element.textContent = ' SACBC';
socialMediaLinksElement.appendChild(socialMediaLink1Element);

const socialMediaLink3Element = document.createElement('a');
socialMediaLink3Element.href = 'https://homeless.org.za/'; // Link to the U-Turn Cape Town website
socialMediaLink3Element.target = '_blank';
socialMediaLink3Element.classList.add('footer__social-link');
const socialMediaLink3IconElement = document.createElement('i');
socialMediaLink3IconElement.classList.add('ri-link');
socialMediaLink3Element.appendChild(socialMediaLink3IconElement);
socialMediaLink3Element.textContent = ' U-Turn Cape Town';
socialMediaLinksElement.appendChild(socialMediaLink3Element);

socialMediaSectionElement.appendChild(socialMediaTitleElement);
socialMediaSectionElement.appendChild(socialMediaLinksElement);

// Append sections to footer content
footerContentElement.appendChild(companySectionElement);
footerContentElement.appendChild(informationSectionElement);
footerContentElement.appendChild(socialMediaSectionElement);

// Append footer content to footer container
footerContainerElement.appendChild(footerContentElement);

// Append footer container to footer
footerElement.appendChild(footerContainerElement);

// Append copyright text to footer
const footerCopyrightElement = document.createElement('span');
footerCopyrightElement.classList.add('footer__copy');
footerCopyrightElement.innerHTML = '&#169; HELP THE HOMELESS All Rights Reserved';
footerElement.appendChild(footerCopyrightElement);

// Append footer to body
document.body.appendChild(footerElement);

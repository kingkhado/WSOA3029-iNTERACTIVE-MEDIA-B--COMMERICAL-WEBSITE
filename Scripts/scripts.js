// Dynamic Navbar Injection
const navbar = document.getElementById('navbar');
const navLinks = [
    { text: 'Home', href: '#' },
    { text: 'Design', href: '#design' },
    { text: 'Theory', href: '#theory' },
    { text: 'Data-Visualisations', href: '#data-visualisations' }
];

navLinks.forEach((link) => {
    const navLink = document.createElement('a');
    navLink.textContent = link.text;
    navLink.href = link.href;
    navbar.appendChild(navLink);
});

// Dynamic Footer Injection
const footer = document.getElementById('footer');
const footerText = 'Copyright 2023 Donating to the Homeless';
footer.textContent = footerText;

// Interactivity Elements
// Add event listeners to nav links
navLinks.forEach((link) => {
    const navLink = document.querySelector(`a[href="${link.href}"]`);
    navLink.addEventListener('click', (e) => {
        e.preventDefault();
        const section = document.querySelector(link.href);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add event listener to footer
footer.addEventListener('click', () => {
    alert('Footer clicked!');
});
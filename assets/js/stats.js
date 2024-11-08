// Get all statistic elements
const statistics = document.querySelectorAll('.statistic');

// Define a function to animate the counter
const animateCounter = (element) => {
    const counter = element.querySelector('.counter');
    const percent = element.querySelector('.percent-value');
    const maxValue = counter ? parseInt(counter.getAttribute('data-number-value')) : null;
    const maxPercent = percent ? parseInt(percent.getAttribute('data-percent-value')) : null;
    let currentValue = maxValue ? maxValue - 200 : null;
    let currentPercent = maxPercent ? maxPercent - 2.3 : null;

    // Check if the counter has already been animated
    if (
        (maxValue !== null && counter.textContent === maxValue.toString()) &&
        (maxPercent === null || percent.textContent === maxPercent.toString())
    ) {
        return;
    }

    // Animate the counter
    const interval = setInterval(() => {
        if (maxValue !== null && currentValue < maxValue) {
            currentValue++;
            counter.textContent = currentValue.toString();
        }

        if (maxPercent !== null && currentPercent < maxPercent) {
            currentPercent += 0.01; // Increase the percentage by 0.01
            percent.textContent = currentPercent.toFixed(1) + '%';
        }

        if (
            (maxValue === null || currentValue >= maxValue) &&
            (maxPercent === null || currentPercent >= maxPercent)
        ) {
            clearInterval(interval);
        }
    }, 10);
};

// Define a function to handle the intersection of a statistic element
const handleIntersection = (entry) => {
    if (entry.isIntersecting) {
        const statistic = entry.target;
        statistic.classList.add('scrolled');

        // Animate the counter only if it hasn't been animated before
        if (!statistic.classList.contains('animated')) {
            animateCounter(statistic);
            statistic.classList.add('animated');
        }
    }
};

// Create an intersection observer for each statistic element
statistics.forEach((statistic) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(handleIntersection);
    }, { threshold: 1.0 });

    observer.observe(statistic);
});

// Add event listener to each statistic element to handle click events
statistics.forEach((statistic) => {
    statistic.addEventListener('click', () => {
        statistic.classList.toggle('active');
    });
});

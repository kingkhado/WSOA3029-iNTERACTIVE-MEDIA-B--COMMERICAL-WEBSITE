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
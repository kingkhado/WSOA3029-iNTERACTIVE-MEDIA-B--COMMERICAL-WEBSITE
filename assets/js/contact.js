document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission
    
    let isValid = true;

    // Name validation (letters and spaces only)
    const name = document.getElementById("name").value.trim();
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError("nameError", "Please enter a valid name (letters and spaces only).");
        isValid = false;
    } else {
        hideError("nameError");
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email.");
        isValid = false;
    } else {
        hideError("emailError");
    }

    // Password validation (8 characters with at least 1 number and 1 special character)
    const password = document.getElementById("password").value;
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        showError("passwordError", "Password must be at least 8 characters, with numbers and special characters.");
        isValid = false;
    } else {
        hideError("passwordError");
    }

    // Phone number validation (10 digits only)
    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{10}$/.test(phone)) {
        showError("phoneError", "Please enter a valid phone number (10 digits).");
        isValid = false;
    } else {
        hideError("phoneError");
    }

    // Message validation (max 250 characters)
    const message = document.getElementById("message").value.trim();
    if (message.length > 250) {
        showError("messageError", "Message cannot exceed 250 characters.");
        isValid = false;
    } else {
        hideError("messageError");
    }

    // Display success message and hide form if all validations pass
    if (isValid) {
        document.getElementById("contactForm").style.display = "none"; // Hide form
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block"; // Show success message
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = "none";
}

function initMap() {
    var witsUniversity = { lat: -26.1952, lng: 28.0349 }; // Wits University coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: witsUniversity
    });
    var marker = new google.maps.Marker({
        position: witsUniversity,
        map: map
    });
}
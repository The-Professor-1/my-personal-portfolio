// Form validation and submission handling
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset error messages
    resetErrors();
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
        return false;
    }
    
    // Send email using EmailJS
    sendEmail(name, email, subject, message);
    
    return false;
}

function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Name validation
    if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
        showError('nameError', 'Please enter a valid name (2-50 characters, letters only)');
        isValid = false;
    }
    
    // Email validation
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!/^[A-Za-z0-9\s]{5,100}$/.test(subject)) {
        showError('subjectError', 'Please enter a valid subject (5-100 characters)');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10 || message.length > 1000) {
        showError('messageError', 'Message must be between 10 and 1000 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrors() {
    const errorElements = document.getElementsByClassName('error-message');
    for (let element of errorElements) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function sendEmail(name, email, subject, message) {
    // Initialize EmailJS with your public key
    emailjs.init("t4YsDGIB7o4foMTXa"); // Replace with your actual EmailJS public key
    
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'maymerlibe@gmail.com'
    };
    
    emailjs.send('service_drd16yu', 'template_zqqpewx', templateParams)
        .then(function(response) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS error:', error);
        });
} 
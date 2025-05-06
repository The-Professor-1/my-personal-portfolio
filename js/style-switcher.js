// Style Switcher Toggle
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });

    // Close style switcher on scroll
    window.addEventListener("scroll", () => {
        if (styleSwitcher.classList.contains("open")) {
            styleSwitcher.classList.remove("open");
        }
    });
}

// Color theme switching
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActvityStyle(color) {
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Dark/Light mode toggle with image switch
const dayNight = document.querySelector(".day-night");
const homeImg = document.querySelector(".home-img img");

if (dayNight && homeImg) {
    // Set initial icon and image
    const icon = dayNight.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.classList.add("fa-sun");
        homeImg.src = "images/photodarkmode.jpg";
    } else {
        icon.classList.add("fa-moon");
        homeImg.src = "images/photolightmode.jpg";
    }

    // Toggle dark/light mode
    dayNight.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
        
        // Switch image based on mode
        if (document.body.classList.contains("dark")) {
            homeImg.src = "images/photodarkmode.jpg";
        } else {
            homeImg.src = "images/photolightmode.jpg";
        }
    });
}

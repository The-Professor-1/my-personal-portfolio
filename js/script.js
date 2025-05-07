document.addEventListener("DOMContentLoaded", () => {
    // Typed.js Animation
    if (typeof Typed !== "undefined") {
        var typed = new Typed('.typing', {
            strings: ["", "Web Developer", "Django Developer", "AI/ML Developer", "Software Tester"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    } else {
        console.error("Typed.js library not loaded.");
    }

    // Navigation
    const nav = document.querySelector(".nav"),
          navList = nav.querySelectorAll("li"),
          totalNavList = navList.length,
          allSection = document.querySelectorAll(".section"),
          totalSection = allSection.length;

    if (!nav || !navList.length || !allSection.length) {
        console.error("Navigation elements not found:", { nav, navList, allSection });
        return;
    }

    // Set default section to home
    const currentHash = window.location.hash.substring(1) || "home";
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
        if (allSection[i].id === currentHash) {
            allSection[i].classList.add("active");
        }
    }

    // Function to handle section switching
    function handleSectionSwitch(element) {
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        
        // Update navigation active state
        const target = element.getAttribute("href").split("#")[1];
        const navLink = nav.querySelector(`a[href="#${target}"]`);
        if (navLink) {
            navLink.classList.add("active");
        }
        
        showSection(element);
        
        // Close sidebar on small screens when section is selected
        if (window.innerWidth <= 1199) {
            aside.classList.remove("open");
            navTogglerBtn.classList.remove("open");
        }
    }

    // Add click handlers to navigation links
    for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function(e) {
            e.preventDefault();
            handleSectionSwitch(this);
        });
    }

    // Add click handlers to all section links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.closest('.nav')) { // Skip navigation links as they're already handled
            link.addEventListener("click", function(e) {
                e.preventDefault();
                handleSectionSwitch(this);
            });
        }
    });

    function showSection(element) {
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        const targetSection = document.querySelector("#" + target);
        if (targetSection) {
            targetSection.classList.add("active");
        } else {
            console.error("Target section not found:", target);
        }
    }

    // Navigation Toggle
    const navTogglerBtn = document.querySelector(".nav-toggler"),
          aside = document.querySelector(".aside");

    if (!navTogglerBtn || !aside) {
        console.error("Toggler or aside not found:", { navTogglerBtn, aside });
        return;
    }

    navTogglerBtn.addEventListener("click", () => {
        asideSectionTogglerBtn();
    });

    function asideSectionTogglerBtn() {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    }

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 1199) {
            const isClickInsideAside = aside.contains(e.target);
            const isClickOnToggler = navTogglerBtn.contains(e.target);
            
            if (!isClickInsideAside && !isClickOnToggler && aside.classList.contains("open")) {
                aside.classList.remove("open");
                navTogglerBtn.classList.remove("open");
            }
        }
    });

    // Footer visibility control
    const footer = document.querySelector('footer');
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                
                // Show footer when user reaches bottom of the page
                if (scrollTop + windowHeight >= documentHeight - 100) {
                    footer.classList.add('show');
                } else {
                    footer.classList.remove('show');
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check for footer visibility
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100) {
        footer.classList.add('show');
    }
});

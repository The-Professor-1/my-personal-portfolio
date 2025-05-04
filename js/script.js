document.addEventListener("DOMContentLoaded", () => {
    // Typed.js Animation
    if (typeof Typed !== "undefined") {
        var typed = new Typed('.typing', {
            strings: ["", "Web Developer", "Software Engineer", "AI/ML Engineer", "Mobile Developer"],
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

    for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function () {
            for (let i = 0; i < totalSection; i++) {
                allSection[i].classList.remove("back-section");
            }
            for (let j = 0; j < totalNavList; j++) {
                if (navList[j].querySelector("a").classList.contains("active")) {
                    allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);
        });
    }

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
});
// ===============================
// VaaYU Portfolio
// Interactive Effects + Theme
// ===============================


// ===============================
// NAVBAR
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 40);
});


// ===============================
// SCROLL PROGRESS
// ===============================

const progress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
    if (!progress) return;

    const scrollTop = window.scrollY;
    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        height > 0
            ? (scrollTop / height) * 100
            : 0;

    progress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});


// ===============================
// THEME TOGGLE
// ===============================

const themeToggle = document.querySelector("#themeToggle");

function applyTheme(theme) {
    const isLight = theme === "light";

    document.documentElement.classList.toggle(
        "light-theme",
        isLight
    );

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

        // Supports either icon style
        const icon = themeToggle.querySelector(
            "i, svg, .theme-icon"
        );

        if (icon) {
            icon.textContent = isLight ? "☀" : "☾";
        }
    }

    localStorage.setItem("portfolio-theme", theme);
}


// Load saved theme
const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    applyTheme("light");
} else {
    applyTheme("dark");
}


// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        const isLight =
            document.documentElement.classList.contains(
                "light-theme"
            );

        applyTheme(
            isLight ? "dark" : "light"
        );

    });
}


// ===============================
// REVEAL ON SCROLL
// ===============================

const revealElements =
    document.querySelectorAll(
        ".reveal, .project-card, .skill-card"
    );

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


// ===============================
// PROJECT 3D TILT
// ===============================

const projects =
    document.querySelectorAll(".project-card");

projects.forEach((project) => {

    project.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 768) return;

        const rect =
            project.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY =
            (x - 0.5) * 4;

        const rotateX =
            (0.5 - y) * 4;

        project.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });

    project.addEventListener("mouseleave", () => {

        project.style.transform =
            "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});


// ===============================
// SKILL CARD TILT
// ===============================

const skills =
    document.querySelectorAll(".skill-card");

skills.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 768) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY =
            (x - 0.5) * 5;

        const rotateX =
            (0.5 - y) * 5;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px)
             rotateX(0deg)
             rotateY(0deg)
             translateY(0)";

    });

});


// ===============================
// CURSOR GLOW
// ===============================

const cursorGlow =
    document.querySelector(".cursor-glow");

if (cursorGlow) {

    window.addEventListener("mousemove", (event) => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }, {
        passive: true
    });

}


// ===============================
// MAGNETIC BUTTONS
// ===============================

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 768) return;

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX -
            (rect.left + rect.width / 2);

        const y =
            event.clientY -
            (rect.top + rect.height / 2);

        element.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    element.addEventListener("mouseleave", () => {

        element.style.transform =
            "translate(0, 0)";

    });

});


// ===============================
// SMOOTH ANCHOR SCROLL
// ===============================

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ===============================
// DYNAMIC YEAR
// ===============================

const year =
    document.querySelector("#year");

if (year) {
    year.textContent =
        new Date().getFullYear();
}


// ===============================
// PROJECT LINK FEEDBACK
// ===============================

document.querySelectorAll(
    ".project-link"
).forEach((link) => {

    link.addEventListener("click", () => {

        link.classList.add("clicked");

        setTimeout(() => {
            link.classList.remove("clicked");
        }, 500);

    });

});


// ===============================
// MOBILE MODE
// ===============================

function checkMobile() {

    document.body.classList.toggle(
        "mobile",
        window.innerWidth < 768
    );

}

checkMobile();

window.addEventListener("resize", checkMobile);


// ===============================
// INITIALIZE
// ===============================

updateScrollProgress();

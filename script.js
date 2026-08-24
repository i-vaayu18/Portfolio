// ===============================
// VaaYU Portfolio
// Interactive Effects
// ===============================


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


// ===============================
// SCROLL PROGRESS
// ===============================

const progress =
    document.querySelector(".scroll-progress");

function updateScrollProgress() {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (scrollHeight <= 0) {

        progress.style.width = "0%";

        return;
    }

    const percentage =
        (scrollTop / scrollHeight) * 100;

    progress.style.width =
        `${Math.min(100, Math.max(0, percentage))}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


// ===============================
// THEME TOGGLE
// ===============================
//
// IMPORTANT:
// Theme button ID:
// #themeToggle
//
// Theme class:
// body.light-theme
//
// Saved preference:
// localStorage
// ===============================

const themeToggle =
    document.getElementById("themeToggle");

function setTheme(theme) {

    const isLight =
        theme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    document.documentElement.classList.toggle(
        "light-theme",
        isLight
    );

    if (themeToggle) {

        const icon =
            themeToggle.querySelector(
                ".theme-toggle-icon i"
            );

        if (icon) {

            icon.classList.remove(
                "fa-sun",
                "fa-moon"
            );

            icon.classList.add(
                isLight
                    ? "fa-moon"
                    : "fa-sun"
            );

        }

        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

        themeToggle.setAttribute(
            "title",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

    }

    try {

        localStorage.setItem(
            "portfolio-theme",
            isLight
                ? "light"
                : "dark"
        );

    } catch (error) {

        console.warn(
            "Theme preference could not be saved."
        );

    }

}


// Load saved theme

let savedTheme = "dark";

try {

    savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        ) || "dark";

} catch (error) {

    savedTheme = "dark";

}

setTheme(
    savedTheme === "light"
        ? "light"
        : "dark"
);


// Theme button click

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isCurrentlyLight =
                document.body.classList.contains(
                    "light-theme"
                );

            setTheme(
                isCurrentlyLight
                    ? "dark"
                    : "light"
            );

        }
    );

}


// ===============================
// REVEAL ON SCROLL
// ===============================

const revealElements =
    document.querySelectorAll(
        ".reveal, .project-card, .skill-card"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
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

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


// ===============================
// PROJECT 3D TILT
// ===============================

const projects =
    document.querySelectorAll(
        ".project-card"
    );


projects.forEach((project) => {

    project.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 768
            ) {
                return;
            }

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

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            project.style.transform =
                "perspective(1200px) " +
                "rotateX(0deg) " +
                "rotateY(0deg) " +
                "translateY(0)";

        }
    );

});


// ===============================
// SKILL CARD TILT
// ===============================

const skills =
    document.querySelectorAll(
        ".skill-card"
    );


skills.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 768
            ) {
                return;
            }

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

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) " +
                "rotateX(0deg) " +
                "rotateY(0deg) " +
                "translateY(0)";

        }
    );

});


// ===============================
// CURSOR GLOW
// ===============================

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


if (cursorGlow) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        },
        {
            passive: true
        }
    );

}


// ===============================
// MAGNETIC BUTTONS
// ===============================

const magneticElements =
    document.querySelectorAll(
        ".magnetic"
    );


magneticElements.forEach((element) => {

    element.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 768
            ) {
                return;
            }

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                (
                    rect.left +
                    rect.width / 2
                );

            const y =
                event.clientY -
                (
                    rect.top +
                    rect.height / 2
                );

            element.style.transform =
                `translate(
                    ${x * 0.08}px,
                    ${y * 0.08}px
                )`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "translate(0, 0)";

        }
    );

});


// ===============================
// SMOOTH ANCHOR SCROLL
// ===============================

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

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

    link.addEventListener(
        "click",
        () => {

            link.classList.add(
                "clicked"
            );

            setTimeout(() => {

                link.classList.remove(
                    "clicked"
                );

            }, 500);

        }
    );

});


// ===============================
// MOBILE MODE
// ===============================

function updateMobileMode() {

    document.body.classList.toggle(
        "mobile",
        window.innerWidth < 768
    );

}

updateMobileMode();

window.addEventListener(
    "resize",
    updateMobileMode
);


// ===============================
// PREVENT THEME BUTTON
// FROM BEING AFFECTED BY
// MAGNETIC EFFECTS
// ===============================

if (themeToggle) {

    themeToggle.classList.remove(
        "magnetic"
    );

}


// ===============================
// FINAL INITIALIZATION
// ===============================

updateNavbar();

updateScrollProgress();

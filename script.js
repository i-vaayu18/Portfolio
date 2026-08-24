/* =========================================================
   VaaYU Portfolio
   Interactive JavaScript
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.querySelector(".navbar");

const progress =
    document.querySelector(".scroll-progress");

const cursorGlow =
    document.querySelector(".cursor-glow");

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");


/* =========================================================
   NAVBAR SCROLL
========================================================= */

let ticking = false;

function updateScrollUI() {

    const scrollY =
        window.scrollY;

    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            scrollY > 40
        );

    }


    if (progress) {

        const documentHeight =
            document.documentElement.scrollHeight;

        const viewportHeight =
            window.innerHeight;

        const maxScroll =
            documentHeight - viewportHeight;

        const percentage =
            maxScroll > 0
                ? (scrollY / maxScroll) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    }

    ticking = false;
}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateScrollUI
            );

            ticking = true;

        }

    },
    { passive: true }
);

updateScrollUI();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.innerHTML =
                isOpen
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                }
            );

        });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            obs.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add("visible");

        }
    );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        { passive: true }
    );


    function animateGlow() {

        glowX +=
            (mouseX - glowX) * 0.12;

        glowY +=
            (mouseY - glowY) * 0.12;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        requestAnimationFrame(
            animateGlow
        );

    }

    animateGlow();

}


/* =========================================================
   3D CARD TILT
========================================================= */

function enableTilt(
    selector,
    intensity = 4
) {

    const cards =
        document.querySelectorAll(selector);


    if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768
    ) {
        return;
    }


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) / rect.width;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height;


                const rotateY =
                    (x - 0.5) *
                    intensity;

                const rotateX =
                    (0.5 - y) *
                    intensity;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


enableTilt(
    ".project-card",
    4
);

enableTilt(
    ".skill-card",
    5
);


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".magnetic"
    );


if (
    window.matchMedia("(pointer: fine)").matches
) {

    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

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
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");


                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(id);


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


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a[href^='#']"
    );


if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const active =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (active) {

                                active.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        (section) => {

            navObserver.observe(section);

        }
    );

}


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const year =
    document.querySelector("#year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


/* =========================================================
   PROJECT LINK MICRO FEEDBACK
========================================================= */

document
    .querySelectorAll(".project-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.style.opacity = "0.65";

                setTimeout(
                    () => {

                        link.style.opacity = "";

                    },
                    350
                );

            }
        );

    });


/* =========================================================
   CLOSE MOBILE MENU WITH ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            mobileMenu &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove(
                "open"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    }
);


// ===============================
// DARK / LIGHT THEME
// ===============================

const themeToggle =
    document.querySelector("#themeToggle");

const themeIcon =
    themeToggle?.querySelector("i");


// Load saved theme
const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

}


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLight =
            document.body.classList.toggle("light-theme");


        if (isLight) {

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

            themeIcon?.classList.remove("fa-sun");
            themeIcon?.classList.add("fa-moon");

        } else {

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

            themeIcon?.classList.remove("fa-moon");
            themeIcon?.classList.add("fa-sun");

        }

    });

}

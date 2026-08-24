// ============================================================
// VaaYU Portfolio
// Premium Interactive Experience
// ============================================================

"use strict";


// ============================================================
// CONFIG
// ============================================================

const CONFIG = {
    mobileBreakpoint: 768,
    scrollOffset: 90,
    revealThreshold: 0.12,
    magneticStrength: 0.08,
    projectTilt: 4,
    skillTilt: 5
};


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initScrollProgress();
    initScrollReveal();
    initProjectTilt();
    initSkillTilt();
    initCursorGlow();
    initMagneticButtons();
    initSmoothScroll();
    initActiveNavigation();
    initMobileState();
    initDynamicYear();
    initProjectLinks();
    initExternalLinks();
    initPageLoad();

});


// ============================================================
// NAVBAR
// ============================================================

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const updateNavbar = () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


// ============================================================
// SCROLL PROGRESS
// ============================================================

function initScrollProgress() {

    const progress =
        document.querySelector(".scroll-progress");

    if (!progress) return;

    let ticking = false;

    const updateProgress = () => {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? Math.min(
                    100,
                    Math.max(
                        0,
                        (scrollTop / scrollHeight) * 100
                    )
                )
                : 0;

        progress.style.width =
            `${percentage}%`;

        ticking = false;

    };

    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(updateProgress);

            ticking = true;

        }

    }, { passive: true });

    updateProgress();

}


// ============================================================
// SCROLL REVEAL
// ============================================================

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .project-card, .skill-card"
        );

    if (!elements.length) return;

    // Accessibility / reduced motion
    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold:
                    CONFIG.revealThreshold,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );

    elements.forEach(element => {

        observer.observe(element);

    });

}


// ============================================================
// PROJECT 3D TILT
// ============================================================

function initProjectTilt() {

    const projects =
        document.querySelectorAll(".project-card");

    if (!projects.length) return;

    if (isMobile() || reducedMotion()) return;

    projects.forEach(project => {

        let animationFrame;

        project.addEventListener("mousemove", event => {

            cancelAnimationFrame(animationFrame);

            animationFrame =
                requestAnimationFrame(() => {

                    const rect =
                        project.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height;

                    const rotateY =
                        (x - 0.5) *
                        CONFIG.projectTilt;

                    const rotateX =
                        (0.5 - y) *
                        CONFIG.projectTilt;

                    project.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                        `;

                });

        });

        project.addEventListener("mouseleave", () => {

            cancelAnimationFrame(animationFrame);

            project.style.transform =
                `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
                `;

        });

    });

}


// ============================================================
// SKILL CARD TILT
// ============================================================

function initSkillTilt() {

    const skills =
        document.querySelectorAll(".skill-card");

    if (!skills.length) return;

    if (isMobile() || reducedMotion()) return;

    skills.forEach(card => {

        let animationFrame;

        card.addEventListener("mousemove", event => {

            cancelAnimationFrame(animationFrame);

            animationFrame =
                requestAnimationFrame(() => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height;

                    const rotateY =
                        (x - 0.5) *
                        CONFIG.skillTilt;

                    const rotateX =
                        (0.5 - y) *
                        CONFIG.skillTilt;

                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;

                });

        });

        card.addEventListener("mouseleave", () => {

            cancelAnimationFrame(animationFrame);

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
                `;

        });

    });

}


// ============================================================
// CURSOR GLOW
// ============================================================

function initCursorGlow() {

    const glow =
        document.querySelector(".cursor-glow");

    if (!glow) return;

    if (isMobile() || reducedMotion()) {

        glow.style.display = "none";

        return;

    }

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const followCursor = () => {

        currentX +=
            (mouseX - currentX) * 0.12;

        currentY +=
            (mouseY - currentY) * 0.12;

        glow.style.left =
            `${currentX}px`;

        glow.style.top =
            `${currentY}px`;

        requestAnimationFrame(
            followCursor
        );

    };

    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );

    followCursor();

}


// ============================================================
// MAGNETIC BUTTONS
// ============================================================

function initMagneticButtons() {

    const elements =
        document.querySelectorAll(".magnetic");

    if (!elements.length) return;

    if (isMobile() || reducedMotion()) return;

    elements.forEach(element => {

        let animationFrame;

        element.addEventListener(
            "mousemove",
            event => {

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame =
                    requestAnimationFrame(() => {

                        const rect =
                            element.getBoundingClientRect();

                        const x =
                            event.clientX -
                            (rect.left + rect.width / 2);

                        const y =
                            event.clientY -
                            (rect.top + rect.height / 2);

                        element.style.transform =
                            `
                            translate(
                                ${x * CONFIG.magneticStrength}px,
                                ${y * CONFIG.magneticStrength}px
                            )
                            `;

                    });

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                cancelAnimationFrame(
                    animationFrame
                );

                element.style.transform =
                    "translate(0, 0)";

            }
        );

    });

}


// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                CONFIG.scrollOffset;

            window.scrollTo({
                top: targetPosition,
                behavior:
                    reducedMotion()
                        ? "auto"
                        : "smooth"
            });

            // Update URL without jumping
            if (
                history.pushState
            ) {

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });

}


// ============================================================
// ACTIVE NAVIGATION
// ============================================================

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            '.navbar nav a[href^="#"]'
        );

    if (!navLinks.length) return;

    const sections = [];

    navLinks.forEach(link => {

        const id =
            link.getAttribute("href");

        const section =
            document.querySelector(id);

        if (section) {

            sections.push({
                section,
                link
            });

        }

    });

    if (!sections.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    sections.forEach(item => {

                        item.link.classList.remove(
                            "active"
                        );

                    });

                    const current =
                        sections.find(
                            item =>
                                item.section ===
                                entry.target
                        );

                    if (current) {

                        current.link.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );

    sections.forEach(item => {

        observer.observe(
            item.section
        );

    });

}


// ============================================================
// DYNAMIC YEAR
// ============================================================

function initDynamicYear() {

    const year =
        document.querySelector("#year");

    if (!year) return;

    year.textContent =
        new Date().getFullYear();

}


// ============================================================
// PROJECT LINK FEEDBACK
// ============================================================

function initProjectLinks() {

    const links =
        document.querySelectorAll(
            ".project-link"
        );

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "clicked"
                );

                window.setTimeout(() => {

                    link.classList.remove(
                        "clicked"
                    );

                }, 450);

            }
        );

    });

}


// ============================================================
// EXTERNAL LINK SECURITY
// ============================================================

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    links.forEach(link => {

        const currentRel =
            link.getAttribute("rel") || "";

        const relValues =
            new Set(
                currentRel
                    .split(" ")
                    .filter(Boolean)
            );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute(
            "rel",
            [...relValues].join(" ")
        );

    });

}


// ============================================================
// PAGE LOAD
// ============================================================

function initPageLoad() {

    document.body.classList.add(
        "page-ready"
    );

    window.setTimeout(() => {

        document.body.classList.add(
            "loaded"
        );

    }, 100);

}


// ============================================================
// MOBILE STATE
// ============================================================

function initMobileState() {

    const updateMobileState = () => {

        document.body.classList.toggle(
            "mobile",
            isMobile()
        );

    };

    updateMobileState();

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(
                    updateMobileState,
                    150
                );

        }
    );

}


// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function isMobile() {

    return window.innerWidth <
        CONFIG.mobileBreakpoint;

}


function reducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}


// ============================================================
// BACK TO TOP — OPTIONAL
// ============================================================

const backToTop =
    document.querySelector(
        "[data-back-to-top]"
    );

if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            backToTop.classList.toggle(
                "visible",
                window.scrollY > 600
            );

        },
        { passive: true }
    );

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior:
                    reducedMotion()
                        ? "auto"
                        : "smooth"
            });

        }
    );

}


// ============================================================
// END
// ============================================================

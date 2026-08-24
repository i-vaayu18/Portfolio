// ============================================================
// VaaYU Portfolio
// Complete Interactive JavaScript
// ============================================================


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENTS
    // ========================================================

    const body = document.body;

    const navbar =
        document.querySelector(".navbar");

    const progress =
        document.querySelector(".scroll-progress");

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const themeToggle =
        document.querySelector("#themeToggle");

    const themeIcon =
        themeToggle
            ? themeToggle.querySelector("i")
            : null;

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    const year =
        document.querySelector("#year");


    // ========================================================
    // MOBILE CLASS
    // ========================================================

    function updateMobileClass() {

        if (window.innerWidth < 768) {
            body.classList.add("mobile");
        } else {
            body.classList.remove("mobile");
        }

    }

    updateMobileClass();


    window.addEventListener(
        "resize",
        updateMobileClass
    );


    // ========================================================
    // NAVBAR SCROLL EFFECT
    // ========================================================

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    // ========================================================
    // SCROLL PROGRESS
    // ========================================================

    function updateScrollProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight;

        const windowHeight =
            window.innerHeight;

        const scrollable =
            documentHeight - windowHeight;

        const percentage =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;

        progress.style.width =
            `${Math.min(100, Math.max(0, percentage))}%`;

    }


    updateScrollProgress();


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateScrollProgress
    );


    // ========================================================
    // THEME SYSTEM
    // ========================================================

    const THEME_KEY =
        "portfolio-theme";


    function applyTheme(theme) {

        const isLight =
            theme === "light";


        body.classList.toggle(
            "light-theme",
            isLight
        );


        if (themeIcon) {

            themeIcon.classList.toggle(
                "fa-sun",
                !isLight
            );

            themeIcon.classList.toggle(
                "fa-moon",
                isLight
            );

        }


        if (themeToggle) {

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

    }


    function getInitialTheme() {

        const savedTheme =
            localStorage.getItem(
                THEME_KEY
            );


        if (
            savedTheme === "light" ||
            savedTheme === "dark"
        ) {

            return savedTheme;

        }


        /*
         * Default theme is DARK.
         * This keeps the portfolio dark on
         * first visit instead of unexpectedly
         * following the device theme.
         */

        return "dark";

    }


    let currentTheme =
        getInitialTheme();


    applyTheme(
        currentTheme
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                currentTheme =
                    body.classList.contains(
                        "light-theme"
                    )
                        ? "dark"
                        : "light";


                localStorage.setItem(
                    THEME_KEY,
                    currentTheme
                );


                applyTheme(
                    currentTheme
                );

            }
        );

    }


    // ========================================================
    // MOBILE MENU
    // ========================================================

    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }

    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "open"
                    );


                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );

    }


    // Close mobile menu after clicking a link

    mobileLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        }
    );


    // Close menu when clicking outside

    document.addEventListener(
        "click",
        (event) => {

            if (!mobileMenu || !menuToggle) {
                return;
            }


            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                mobileMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    // Close menu when resizing to desktop

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

                closeMobileMenu();

            }

        }
    );


    // ========================================================
    // REVEAL ON SCROLL
    // ========================================================

    const revealElements =
        document.querySelectorAll(
            ".reveal, .project-card, .skill-card, .contact-card, .stat-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

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

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                /*
                 * Only add reveal if the element
                 * does not already have it.
                 */

                if (
                    !element.classList.contains(
                        "reveal"
                    )
                ) {

                    element.classList.add(
                        "reveal"
                    );

                }


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        // Fallback for old browsers

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    // ========================================================
    // PROJECT 3D TILT
    // ========================================================

    const projects =
        document.querySelectorAll(
            ".project-card"
        );


    projects.forEach(
        (project) => {

            project.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 768 ||
                        body.classList.contains("mobile")
                    ) {
                        return;
                    }


                    const rect =
                        project.getBoundingClientRect();


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
                        (x - 0.5) * 4;


                    const rotateX =
                        (0.5 - y) * 4;


                    project.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                        `;

                }
            );


            project.addEventListener(
                "mouseleave",
                () => {

                    project.style.transform =
                        "";

                }
            );

        }
    );


    // ========================================================
    // SKILL CARD TILT
    // ========================================================

    const skills =
        document.querySelectorAll(
            ".skill-card"
        );


    skills.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 768 ||
                        body.classList.contains("mobile")
                    ) {
                        return;
                    }


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
                        (x - 0.5) * 5;


                    const rotateX =
                        (0.5 - y) * 5;


                    card.style.transform =
                        `
                        perspective(1000px)
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

        }
    );


    // ========================================================
    // CONTACT CARD HOVER
    // ========================================================

    const contactCards =
        document.querySelectorAll(
            ".contact-card"
        );


    contactCards.forEach(
        (card) => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    // ========================================================
    // CURSOR GLOW
    // ========================================================

    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let glowX =
            window.innerWidth / 2;

        let glowY =
            window.innerHeight / 2;


        let targetX =
            glowX;

        let targetY =
            glowY;


        window.addEventListener(
            "mousemove",
            (event) => {

                targetX =
                    event.clientX;

                targetY =
                    event.clientY;

            },
            { passive: true }
        );


        function animateGlow() {

            glowX +=
                (targetX - glowX) * 0.12;

            glowY +=
                (targetY - glowY) * 0.12;


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


    // ========================================================
    // MAGNETIC ELEMENTS
    // ========================================================

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(
        (element) => {

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


                    const centerX =
                        rect.left +
                        rect.width / 2;


                    const centerY =
                        rect.top +
                        rect.height / 2;


                    const x =
                        event.clientX -
                        centerX;


                    const y =
                        event.clientY -
                        centerY;


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


    // ========================================================
    // SMOOTH ANCHOR SCROLL
    // ========================================================

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });

                }
            );

        }
    );


    // ========================================================
    // DYNAMIC YEAR
    // ========================================================

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    // ========================================================
    // PROJECT LINK CLICK FEEDBACK
    // ========================================================

    const projectLinks =
        document.querySelectorAll(
            ".project-link"
        );


    projectLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    link.classList.add(
                        "clicked"
                    );


                    window.setTimeout(
                        () => {

                            link.classList.remove(
                                "clicked"
                            );

                        },
                        400
                    );

                }
            );

        }
    );


    // ========================================================
    // ESCAPE KEY
    // ========================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    // ========================================================
    // INITIAL STATE
    // ========================================================

    /*
     * Make sure reveal elements that are already
     * visible near the top of the page don't remain
     * hidden if the browser restores scroll position.
     */

    requestAnimationFrame(
        () => {

            updateScrollProgress();
            updateNavbar();

        }
    );

});

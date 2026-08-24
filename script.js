/* =========================================================
   VaaYU Portfolio
   Interactive JavaScript
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const navbar =
    document.querySelector(".navbar");

const progress =
    document.querySelector(".scroll-progress");

const cursorGlow =
    document.querySelector(".cursor-glow");

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");


/* =========================================================
   SCROLL STATE
========================================================= */

let ticking = false;


function updateScroll() {

    const scrollTop =
        window.scrollY;

    /* Navbar */

    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            scrollTop > 40
        );

    }


    /* Progress */

    if (progress) {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
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
                updateScroll
            );

            ticking = true;

        }

    },
    { passive: true }
);


updateScroll();


/* =========================================================
   CURSOR GLOW
========================================================= */

if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "pointermove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        },
        { passive: true }
    );

}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


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

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   PROJECT 3D TILT
========================================================= */

const tiltCards =
    document.querySelectorAll(
        "[data-tilt]"
    );


const supportsHover =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (supportsHover) {

    tiltCards.forEach(
        (card) => {

            card.addEventListener(
                "pointermove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX -
                            rect.left) /
                        rect.width;


                    const y =
                        (event.clientY -
                            rect.top) /
                        rect.height;


                    const rotateY =
                        (x - 0.5) * 5;


                    const rotateX =
                        (0.5 - y) * 5;


                    card.style.transform =
                        `perspective(1200px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".magnetic"
    );


if (supportsHover) {

    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "pointermove",
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
                        `translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )`;

                }
            );


            element.addEventListener(
                "pointerleave",
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
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
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
                            ? navbar.offsetHeight + 20
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo(
                        {
                            top:
                                targetPosition,

                            behavior:
                                "smooth"
                        }
                    );


                    closeMobileMenu();

                }
            );

        }
    );


/* =========================================================
   MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }


    mobileMenu.classList.add(
        "open"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMobileMenu() {

    if (!mobileMenu || !menuButton) {
        return;
    }


    mobileMenu.classList.remove(
        "open"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
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


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    (event) => {

        if (
            !mobileMenu ||
            !menuButton
        ) {
            return;
        }


        const clickedInsideMenu =
            mobileMenu.contains(
                event.target
            );


        const clickedButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a[href^='#']"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            (link) => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.25,

            rootMargin:
                "-15% 0px -55% 0px"
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const year =
    document.querySelector(
        "#year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PROJECT LINK FEEDBACK
========================================================= */

document
    .querySelectorAll(
        ".project-link"
    )
    .forEach(
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


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

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


/* =========================================================
   MOBILE CLASS
========================================================= */

function updateMobileClass() {

    body.classList.toggle(
        "mobile",
        window.innerWidth < 768
    );

}


updateMobileClass();


window.addEventListener(
    "resize",
    updateMobileClass,
    { passive: true }
);

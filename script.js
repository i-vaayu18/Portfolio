// ===============================
// VaaYU Portfolio
// Interactive Effects
// ===============================


// ===============================
// NAVBAR
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ===============================
// SCROLL PROGRESS
// ===============================

const progress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

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

});


// ===============================
// REVEAL ON SCROLL
// ===============================

const revealElements =
    document.querySelectorAll(
        ".reveal, .project-card, .skill-card"
    );

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

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
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

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
// DISABLE HEAVY EFFECTS ON MOBILE
// ===============================

if (window.innerWidth < 768) {

    document.body.classList.add("mobile");

}

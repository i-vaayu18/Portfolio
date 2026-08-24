// ===============================
// VaaYU Portfolio
// Interactive Effects
// ===============================


// ===============================
// Navbar Scroll Effect
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.style.background = "rgba(5, 5, 5, 0.92)";
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.72)";
    }

});


// ===============================
// Reveal Elements On Scroll
// ===============================

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .building-section"
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

    element.classList.add("reveal");

    observer.observe(element);

});


// ===============================
// Project Hover Movement
// ===============================

const projects = document.querySelectorAll(".project-card");

projects.forEach((project) => {

    project.addEventListener("mousemove", (event) => {

        const rect = project.getBoundingClientRect();

        const x =
            ((event.clientX - rect.left) / rect.width - 0.5) * 4;

        const y =
            ((event.clientY - rect.top) / rect.height - 0.5) * 4;

        project.style.transform =
            `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;

    });


    project.addEventListener("mouseleave", () => {

        project.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});


// ===============================
// Dynamic Year
// ===============================

const year = document.querySelector("footer p:last-child");

if (year) {

    year.textContent =
        `© ${new Date().getFullYear()} VaaYU`;

}

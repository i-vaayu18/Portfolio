// VaaYU Portfolio — Interactive Layer

const navbar = document.querySelector(".navbar");
const progress = document.querySelector(".scroll-progress");
const glow = document.querySelector(".cursor-glow");
const year = document.querySelector("#year");

// Dynamic year
if (year) year.textContent = new Date().getFullYear();

// Navbar + scroll progress
function onScroll() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (scrollTop / max) * 100 : 0;

    progress.style.width = `${percent}%`;
    navbar.classList.toggle("scrolled", scrollTop > 30);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Cursor spotlight on desktop
if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

// Reveal-on-scroll
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(item);
});

// Active navigation based on section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
            );
        });
    });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

// Subtle 3D tilt on skill cards
if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
        card.addEventListener("pointermove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform =
                `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

// Magnetic buttons/cards
if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
        el.addEventListener("pointermove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
        });

        el.addEventListener("pointerleave", () => {
            el.style.transform = "";
        });
    });
}

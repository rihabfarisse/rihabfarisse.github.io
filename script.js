
// ===== MOBILE MENU =====

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after a link is clicked

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.textContent = "☰";
    });
});

// ===== AUTOMATIC YEAR =====

document.getElementById("year").textContent =
    new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("span");

function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", isDark);
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    themeIcon.textContent = isDark ? "☀️" : "🌙";
}

try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
    }
} catch (error) {
    console.warn("Unable to load the saved appearance preference.", error);
}

themeToggle.addEventListener("click", () => {
    const nextTheme =
        document.body.dataset.theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    try {
        localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
        console.warn("Unable to save the appearance preference.", error);
    }
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:f.rihab@hestim.ma?${new URLSearchParams({
        subject: String(subject),
        body: emailBody
    })}`;

    window.location.href = mailtoUrl;
});

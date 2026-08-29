document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("menu-button");
    const navigation = document.getElementById("main-nav");
    const year = document.getElementById("year");
    const demoForm = document.getElementById("demo-form");

    const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 16);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (year) year.textContent = new Date().getFullYear();

    const closeMenu = () => {
        navigation?.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    menuButton?.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        navigation?.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 860) closeMenu(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

    demoForm?.addEventListener("submit", () => {
        const name = document.getElementById("demo-name")?.value.trim() || "";
        const phone = document.getElementById("demo-phone")?.value.trim() || "";
        const email = document.getElementById("demo-email")?.value.trim() || "";
        const messageField = document.getElementById("whatsapp-message");
        const status = document.getElementById("form-status");

        if (messageField) {
            messageField.value = [
                "Hi EstateOS team, I'd like to request a demo.",
                "",
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${email}`
            ].join("\n");
        }

        if (status) {
            status.textContent = "Opening WhatsApp with your demo request…";
            window.setTimeout(() => { status.textContent = ""; }, 8000);
        }
    });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
});

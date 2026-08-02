/* =====================================================
   EstateOS Marketing Website
   main.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       Mobile Menu
    =============================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");

            menuBtn.textContent =
                navbar.classList.contains("active") ? "✕" : "☰";
        });

        document.querySelectorAll(".navbar a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuBtn.textContent = "☰";
            });
        });
    }

    /* ===============================
       Sticky Header Shadow
    =============================== */

    const header = document.querySelector(".header");

    function handleHeader() {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 10px 30px rgba(15,23,42,.08)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    handleHeader();
    window.addEventListener("scroll", handleHeader);

    /* ===============================
       FAQ Accordion
    =============================== */

    document.querySelectorAll(".faq-item").forEach(item => {

        const button = item.querySelector(".faq-question");

        button.addEventListener("click", () => {

            document.querySelectorAll(".faq-item").forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove("active");
                }
            });

            item.classList.toggle("active");

        });

    });

    /* ===============================
       Counter Animation
    =============================== */

    const counters = document.querySelectorAll(".stat h2");

    const animateCounter = (counter) => {

        const original = counter.innerText;

        const number = parseInt(original.replace(/[^0-9]/g, ""));

        if (!number) return;

        const suffix = original.replace(/[0-9]/g, "");

        let current = 0;

        const increment = Math.ceil(number / 80);

        const timer = setInterval(() => {

            current += increment;

            if (current >= number) {

                counter.innerText = original;

                clearInterval(timer);

            } else {

                counter.innerText = current + suffix;

            }

        }, 20);

    };

    const statsSection = document.querySelector(".stats");

    if (statsSection) {

        const statsObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    counters.forEach(animateCounter);

                    statsObserver.disconnect();

                }

            });

        }, { threshold: 0.4 });

        statsObserver.observe(statsSection);

    }

    /* ===============================
       Reveal on Scroll
    =============================== */

    const revealElements = document.querySelectorAll(
        ".problem-card, .feature-card, .product-box, .testimonial-card, .price-card, .step"
    );

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";

    });

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.transition = ".7s ease";

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ===============================
       Smooth Scroll
    =============================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

    /* ===============================
       Active Nav Link
    =============================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                current &&
                link.getAttribute("href") === "#" + current
            ) {
                link.classList.add("active");
            }

        });

    });

    /* ===============================
       Scroll To Top Button
    =============================== */

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className = "scroll-top";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style, {

        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        color: "#fff",
        background: "#2563EB",
        fontSize: "22px",
        display: "none",
        zIndex: "999",
        boxShadow: "0 10px 25px rgba(37,99,235,.3)"

    });

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 500 ? "block" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});
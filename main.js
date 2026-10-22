document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navigation = document.getElementById("main-nav");
    const year = document.getElementById("year");
    const demoForm = document.getElementById("demo-form");
    const demoPlan = document.getElementById("demo-plan");
    const demoFormTitle = document.getElementById("demo-form-title");
    const formStatus = document.getElementById("form-status");
    const mobileNavigation = window.matchMedia("(max-width: 860px)");

    if (year) year.textContent = new Date().getFullYear();

    const closeMenu = () => {
        navigation?.classList.remove("open");
        if (navigation && mobileNavigation.matches) navigation.inert = true;
        menuButton?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    menuButton?.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        navigation?.classList.toggle("open", !isOpen);
        if (navigation) navigation.inert = isOpen;
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    const syncNavigation = () => {
        closeMenu();
        if (navigation) navigation.inert = mobileNavigation.matches;
    };
    syncNavigation();
    // Only breakpoint changes reset the menu; mobile browser chrome also resizes the viewport.
    mobileNavigation.addEventListener("change", syncNavigation);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

    // Open deep-linked topics before native anchor scrolling (including links from other pages).
    const openLinkedTopic = (hash) => {
        if (!hash) return;
        let id;
        try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (!target) return;
        const panels = [];
        for (let node = target; node; node = node.parentElement) {
            if (node instanceof HTMLDetailsElement) panels.push(node);
        }
        panels.reverse().forEach((panel) => { panel.open = true; });
    };
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => openLinkedTopic(link.hash));
    });
    const restoreLinkedTopic = () => {
        openLinkedTopic(window.location.hash);
    };
    restoreLinkedTopic();
    window.addEventListener("hashchange", restoreLinkedTopic);

    let planHighlightTimer;
    let formStatusTimer;
    document.querySelectorAll(".plan-cta").forEach((button) => {
        button.addEventListener("click", () => {
            const plan = button.dataset.plan || "General enquiry";
            if (demoPlan) demoPlan.value = plan;
            if (demoForm) {
                clearTimeout(planHighlightTimer);
                demoForm.classList.add("plan-selected");
                planHighlightTimer = window.setTimeout(() => demoForm.classList.remove("plan-selected"), 2400);
            }
            if (demoFormTitle) {
                demoFormTitle.textContent = plan === "Pilot" ? "Start your Pilot trial" : `Enquire about ${plan}`;
            }
            if (formStatus) formStatus.textContent = `${plan} selected. Share your details and we’ll take it from here.`;
        });
    });

    demoForm?.addEventListener("submit", () => {
        const name = document.getElementById("demo-name")?.value.trim() || "";
        const phone = document.getElementById("demo-phone")?.value.trim() || "";
        const email = document.getElementById("demo-email")?.value.trim() || "";
        const messageField = document.getElementById("whatsapp-message");
        const selectedPlan = demoPlan?.value || "General enquiry";

        if (messageField) {
            messageField.value = [
                "Hi EstateOS team, I'd like to request a demo.",
                "",
                `Plan: ${selectedPlan}`,
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${email}`
            ].join("\n");
        }

        if (formStatus) {
            formStatus.textContent = "Opening WhatsApp with your demo request…";
            clearTimeout(formStatusTimer);
            formStatusTimer = window.setTimeout(() => { formStatus.textContent = ""; }, 8000);
        }
    });

    window.addEventListener("pagehide", () => {
        clearTimeout(planHighlightTimer);
        clearTimeout(formStatusTimer);
        demoForm?.classList.remove("plan-selected");
        closeMenu();
    });
    // Re-establish the breakpoint state after restoration from the back/forward cache.
    window.addEventListener("pageshow", syncNavigation);
});

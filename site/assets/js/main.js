// Loop — shared behavior across all pages

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navPanel = document.getElementById("nav-panel");
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const isOpen = navPanel.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Generic accordion: any [data-acc-trigger] toggles its [data-acc-panel]
  document.querySelectorAll("[data-acc-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(trigger.getAttribute("data-acc-trigger"));
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) {
        panel.classList.toggle("open");
        panel.style.maxHeight = !expanded ? panel.scrollHeight + "px" : "0px";
      }
    });
  });

  // Generic tabs: [data-tab-target] buttons show matching [data-tab-panel]
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const buttons = group.querySelectorAll("[data-tab-target]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab-target");
        group.querySelectorAll("[data-tab-panel]").forEach((panel) => {
          panel.classList.toggle("hidden", panel.id !== targetId);
        });
        buttons.forEach((b) => {
          b.classList.remove("border-[var(--ink)]", "text-[var(--ink)]");
          b.classList.add("border-transparent", "text-[var(--ink-soft)]");
        });
        btn.classList.add("border-[var(--ink)]", "text-[var(--ink)]");
        btn.classList.remove("border-transparent", "text-[var(--ink-soft)]");
      });
    });
  });

  // Simple testimonial carousel: [data-carousel] wraps [data-slide] items + prev/next buttons
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = carousel.querySelectorAll("[data-slide]");
    const prev = carousel.querySelector("[data-prev]");
    const next = carousel.querySelector("[data-next]");
    let index = 0;
    const show = (i) => {
      slides.forEach((s, idx) => s.classList.toggle("hidden", idx !== i));
    };
    show(index);
    if (prev) prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      show(index);
    });
    if (next) next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      show(index);
    });
  });

  // Form validation for any form with [data-validate]
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      let valid = true;
      form.querySelectorAll("[data-error-for]").forEach((el) => (el.textContent = ""));

      form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
        const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
        let message = "";

        if (!field.value.trim()) {
          message = "This field is required.";
        } else if (field.type === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            message = "Enter a valid email address.";
          }
        } else if (field.type === "password" && field.value.length < 8) {
          message = "Password must be at least 8 characters.";
        } else if (field.dataset.match) {
          const other = form.querySelector(`[name="${field.dataset.match}"]`);
          if (other && other.value !== field.value) {
            message = "Passwords do not match.";
          }
        }

        if (message) {
          valid = false;
          field.classList.add("border-red-500");
          if (errorEl) errorEl.textContent = message;
        } else {
          field.classList.remove("border-red-500");
        }
      });

      const consent = form.querySelector('input[type="checkbox"][required]');
      if (consent && !consent.checked) {
        valid = false;
        const errorEl = form.querySelector(`[data-error-for="${consent.name}"]`);
        if (errorEl) errorEl.textContent = "You must agree to continue.";
      }

      if (!valid) {
        e.preventDefault();
        return;
      }

      // Forms without a real backend (Sign Up / Sign In demo forms) get an
      // inline success message instead of actually submitting.
      if (form.dataset.demoOnly === "true") {
        e.preventDefault();
        const successBox = document.getElementById(form.dataset.successTarget);
        if (successBox) {
          successBox.classList.remove("hidden");
          form.reset();
        }
      }
      // Forms pointed at Formspree (data-demoOnly absent) submit for real.
    });
  });
});

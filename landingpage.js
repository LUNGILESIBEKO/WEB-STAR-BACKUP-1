// MindCare Hub – Landing Page JavaScript

// ── SMOOTH SCROLL for nav anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ── STICKY NAV shadow on scroll ─────────────────────────────────
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// ── FEATURE CARDS — navigate to their respective pages ──────────
document.querySelectorAll(".feature-card[data-href]").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = card.dataset.href;
  });
});

// ── FOOTER INTERNAL LINKS — already use real hrefs, no override needed ──

// ── FADE-IN on scroll (Intersection Observer) ───────────────────
const fadeEls = document.querySelectorAll(
  ".feature-card, .step, .testimonial-card, .privacy-feature",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

fadeEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

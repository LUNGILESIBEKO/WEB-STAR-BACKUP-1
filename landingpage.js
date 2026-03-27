// MindCare Hub – JavaScript

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Sticky nav shadow on scroll
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// Feature cards — click to go to dashboard
document.querySelectorAll(".feature-card").forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
});

// Footer links — click to go to dashboard
document.querySelectorAll(".footer-col a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
});

// Social media icons — open in new tab (placeholders)
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // Replace '#' with real URLs when ready
    alert("Social media link coming soon!");
  });
});

// Fade-in on scroll (Intersection Observer)
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

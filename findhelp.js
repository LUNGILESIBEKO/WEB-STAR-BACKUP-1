/* ═══════════════════════════════════════════════════════
   MindCare Hub – Find Help Near Me
   findhelp.js
═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Nav items ──────────────────────────────────────
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
    });
  });

  // ── 2. Crisis Call button ─────────────────────────────
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (
      confirm(
        "You are about to call the crisis line: 0800 567 567\n\nFree and available 24/7.\n\nProceed?",
      )
    ) {
      window.location.href = "tel:0800567567";
    }
  });

  // ── 3. Filter tabs ────────────────────────────────────
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".service-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter || "all";
      cards.forEach((card) => {
        const cat = card.dataset.category || "";
        if (filter === "all" || cat === filter) {
          card.style.display = "";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.transition = "opacity 0.3s ease";
            card.style.opacity = "1";
          }, 20);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ── 4. Map pin hover highlights service card ──────────
  const pins = document.querySelectorAll(".map-pin");
  pins.forEach((pin, i) => {
    pin.addEventListener("mouseenter", () => {
      if (cards[i]) {
        cards[i].style.boxShadow = "0 0 0 3px #5b3ec8";
        cards[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    pin.addEventListener("mouseleave", () => {
      if (cards[i]) cards[i].style.boxShadow = "";
    });
    pin.addEventListener("click", () => {
      if (cards[i]) {
        cards[i].style.boxShadow = "0 0 0 3px #5b3ec8";
        setTimeout(() => {
          if (cards[i]) cards[i].style.boxShadow = "";
        }, 1500);
      }
    });
  });

  // ── 5. View Details buttons ───────────────────────────
  document.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name =
        this.closest(".service-card")?.querySelector(
          ".service-name",
        )?.textContent;
      alert(
        `📍 ${name}\n\nFull details, opening hours, and directions would open here when connected to the backend.`,
      );
    });
  });

  // ── 6. Start Chat button ──────────────────────────────
  document.getElementById("startChatBtn")?.addEventListener("click", () => {
    alert(
      "💬 Online Counselling SA\n\nA secure video therapy session would launch here when connected to the booking API.",
    );
  });

  // ── 7. Nav direction buttons ──────────────────────────
  document.querySelectorAll(".nav-icon-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name =
        this.closest(".service-card")?.querySelector(
          ".service-name",
        )?.textContent;
      alert(
        `🗺️ Directions to ${name}\n\nThis would open Google Maps or a campus map integration.`,
      );
    });
  });

  // ── 8. Change Location ────────────────────────────────
  document
    .getElementById("changeLocationBtn")
    ?.addEventListener("click", () => {
      const newLoc = prompt(
        "Enter your campus or location:",
        "University of Johannesburg",
      );
      if (newLoc && newLoc.trim()) {
        document.querySelector(".your-location-value").textContent =
          newLoc.trim();
        document.querySelector(".location-text").textContent = newLoc.trim();
      }
    });

  // ── 9. Directory centre buttons ───────────────────────
  document.querySelectorAll(".centre-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Briefly highlight
      this.style.background = "#eee9ff";
      this.style.borderColor = "#5b3ec8";
      setTimeout(() => {
        this.style.background = "";
        this.style.borderColor = "";
      }, 400);
      alert(
        `📋 ${this.textContent}\n\nContact details and hours would display here.`,
      );
    });
  });

  // ── 10. Download Directory ────────────────────────────
  document.getElementById("downloadBtn")?.addEventListener("click", () => {
    alert(
      "📄 Downloading UJ Wellness Directory (PDF)\n\nThis would trigger a PDF download from the server.",
    );
  });

  // ── 11. Filter icon button ────────────────────────────
  document.getElementById("filterIconBtn")?.addEventListener("click", () => {
    alert(
      "⚙️ Advanced Filters\n\nOptions for distance, hours, language, and accessibility would appear here.",
    );
  });

  // ── 12. Entrance animations ───────────────────────────
  // Service cards
  document.querySelectorAll(".service-card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(14px)";
    setTimeout(
      () => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "";
      },
      100 + i * 100,
    );
  });

  // Directory buttons
  document.querySelectorAll(".centre-btn").forEach((btn, i) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateY(8px)";
    setTimeout(
      () => {
        btn.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        btn.style.opacity = "1";
        btn.style.transform = "";
      },
      300 + i * 40,
    );
  });
});

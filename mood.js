/* ═══════════════════════════════════════════════════════
   MindCare Hub – Mood & AI Insights
   mood.js
═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Nav active state ───────────────────────────────
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
    });
  });

  // ── 2. Crisis Call button ─────────────────────────────
  document
    .getElementById("crisisCallBtn")
    ?.addEventListener("click", function () {
      if (
        confirm(
          "You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?",
        )
      ) {
        window.location.href = "tel:0800567567";
      }
    });

  // ── 3. Emoji mood selector ────────────────────────────
  const emojiScores = { 2: 2, 4: 4, 6: 6, 8: 8, 10: 10 };
  const slider = document.getElementById("moodSlider");
  const sliderDisplay = document.getElementById("sliderDisplay");

  document.querySelectorAll(".emoji-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".emoji-btn")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      const score = parseInt(this.dataset.score);
      slider.value = score;
      updateSlider(score);
    });
  });

  // ── 4. Precision slider ───────────────────────────────
  function updateSlider(val) {
    sliderDisplay.textContent = `${val} / 10`;
    const pct = ((val - 1) / 9) * 100;
    slider.style.background = `linear-gradient(to right, #5b3ec8 0%, #5b3ec8 ${pct}%, #e8e8f0 ${pct}%, #e8e8f0 100%)`;

    // Auto-select matching emoji
    const thresholds = [
      { max: 2, idx: 0 },
      { max: 4, idx: 1 },
      { max: 6, idx: 2 },
      { max: 8, idx: 3 },
      { max: 10, idx: 4 },
    ];
    const btns = document.querySelectorAll(".emoji-btn");
    btns.forEach((b) => b.classList.remove("selected"));
    for (const t of thresholds) {
      if (val <= t.max) {
        btns[t.idx].classList.add("selected");
        break;
      }
    }
  }

  slider?.addEventListener("input", function () {
    updateSlider(parseInt(this.value));
  });

  // Initialise slider fill on load
  updateSlider(parseInt(slider?.value || 6));

  // ── 5. Log Reflection button ──────────────────────────
  let logged = false;
  document.getElementById("logBtn")?.addEventListener("click", function () {
    if (logged) return;
    logged = true;
    const score = slider?.value || 6;
    this.textContent = `✓ Reflection Logged (${score}/10)`;
    this.style.background = "#16a34a";
    this.style.letterSpacing = "0.02em";

    // Animate stat update
    setTimeout(() => {
      const statBig = document.querySelector(".stat-big");
      if (statBig) {
        statBig.style.transition = "color 0.4s";
        statBig.style.color = "#16a34a";
        setTimeout(() => (statBig.style.color = ""), 800);
      }
    }, 400);
  });

  // ── 6. Bar / Line chart toggle ────────────────────────
  const barChart = document.getElementById("barChart");
  const lineChart = document.getElementById("lineChart");
  const barBtn = document.getElementById("barBtn");
  const lineBtn = document.getElementById("lineBtn");

  barBtn?.addEventListener("click", () => {
    barChart.style.display = "";
    lineChart.style.display = "none";
    barBtn.classList.add("active");
    lineBtn.classList.remove("active");
  });

  lineBtn?.addEventListener("click", () => {
    barChart.style.display = "none";
    lineChart.style.display = "";
    lineBtn.classList.add("active");
    barBtn.classList.remove("active");
  });

  // ── 7. Build bar chart ────────────────────────────────
  const moodData = [
    5, 6, 4, 7, 8, 6, 9, 7, 5, 6, 8, 7, 6, 8, 7, 9, 8, 6, 7, 5, 8, 9, 7, 8, 9,
    7, 6, 8,
  ];
  const barsWrap = document.querySelector(".bars-wrap");
  if (barsWrap) {
    const max = Math.max(...moodData);
    moodData.forEach((val, i) => {
      const bar = document.createElement("div");
      bar.className = "bar-item" + (i === 12 ? " highlight" : "");
      bar.style.height = "0px";
      bar.title = `Day ${i + 1}: ${val}/10`;
      barsWrap.appendChild(bar);

      // Animate in
      setTimeout(
        () => {
          bar.style.transition = "height 0.6s cubic-bezier(0.4,0,0.2,1)";
          bar.style.height = `${(val / max) * 100}%`;
        },
        100 + i * 30,
      );
    });
  }

  // ── 8. Month picker ───────────────────────────────────
  const months = [
    "January 2026",
    "February 2026",
    "March 2026",
    "April 2026",
    "May 2026",
    "June 2026",
  ];
  let currentMonth = 2; // March
  document
    .getElementById("monthPicker")
    ?.addEventListener("click", function () {
      currentMonth = (currentMonth + 1) % months.length;
      this.childNodes.forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = " " + months[currentMonth] + " ";
        }
      });
    });

  // ── 9. Export PDF button ──────────────────────────────
  document.getElementById("exportBtn")?.addEventListener("click", () => {
    alert(
      "📄 Clinical Summary PDF\n\nGenerating your report…\nThis would trigger a PDF download from the server.",
    );
  });

  // ── 10. Pattern cards hover ───────────────────────────
  document.querySelectorAll(".pattern-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.style.background = "#f7f4ff";
      setTimeout(() => (this.style.background = ""), 500);
    });
  });

  // ── 11. Entrance animations ───────────────────────────
  const fadeUp = (els, delay = 0, step = 80) => {
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      setTimeout(
        () => {
          el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          el.style.opacity = "1";
          el.style.transform = "";
        },
        delay + i * step,
      );
    });
  };

  fadeUp(document.querySelectorAll(".stat-block, .trend-card"), 100, 80);
  fadeUp(document.querySelectorAll(".pattern-card"), 200, 80);

  const moodCard = document.querySelector(".mood-card");
  if (moodCard) {
    moodCard.style.opacity = "0";
    moodCard.style.transform = "translateY(12px)";
    setTimeout(() => {
      moodCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      moodCard.style.opacity = "1";
      moodCard.style.transform = "";
    }, 60);
  }
});

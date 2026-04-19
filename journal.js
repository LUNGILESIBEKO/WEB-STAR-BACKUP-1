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

  // ── 3. Set today's date ───────────────────────────────
  const dateEl = document.getElementById("journalDate");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // ── 4. Mood emoji selector ────────────────────────────
  document.querySelectorAll(".mood-emoji-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".mood-emoji-btn")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      updateSentimentTags(this.dataset.mood);
    });
  });

  function updateSentimentTags(mood) {
    const map = {
      struggling: [
        { label: "ANXIOUS", cls: "anxious" },
        { label: "REFLECTIVE", cls: "reflective" },
      ],
      neutral: [
        { label: "NEUTRAL", cls: "reflective" },
        { label: "CALM", cls: "hopeful" },
      ],
      okay: [
        { label: "HOPEFUL", cls: "hopeful" },
        { label: "REFLECTIVE", cls: "reflective" },
      ],
      good: [
        { label: "POSITIVE", cls: "positive" },
        { label: "HOPEFUL", cls: "hopeful" },
      ],
      excellent: [
        { label: "EXCELLENT", cls: "positive" },
        { label: "ENERGISED", cls: "hopeful" },
      ],
    };
    const tags = map[mood] || map["okay"];
    const container = document.getElementById("sentimentTags");
    if (container) {
      container.innerHTML = tags
        .map((t) => `<span class="sentiment-tag ${t.cls}">${t.label}</span>`)
        .join("");
    }
  }

  // ── 5. Word counter ───────────────────────────────────
  const textarea = document.getElementById("journalTextarea");
  const wordCount = document.getElementById("wordCount");

  textarea?.addEventListener("input", function () {
    const words = this.value.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount)
      wordCount.textContent = `${words} word${words !== 1 ? "s" : ""}`;
    updateSlider(this.value.length);
    liveAnalyse(this.value);
  });

  function updateSlider(len) {
    const pct = Math.min((len / 1000) * 100, 100);
    if (textarea) {
      textarea.style.background = `linear-gradient(to bottom, white ${100 - pct}%, #f7f4ff ${100 - pct}%)`;
    }
  }

  // ── 6. Live AI sentiment analysis ────────────────────
  const stressWords = [
    "anxious",
    "stress",
    "overwhelmed",
    "behind",
    "fail",
    "pressure",
    "panic",
    "scared",
    "worried",
    "exhausted",
  ];
  const positiveWords = [
    "happy",
    "grateful",
    "excited",
    "proud",
    "balance",
    "calm",
    "peace",
    "enjoy",
    "love",
    "grateful",
    "succeed",
  ];

  function liveAnalyse(text) {
    const lower = text.toLowerCase();
    const alertBox = document.getElementById("alertBox");
    const hasStress = stressWords.some((w) => lower.includes(w));
    const hasPositive = positiveWords.some((w) => lower.includes(w));

    if (alertBox) {
      alertBox.style.display = hasStress ? "" : "none";
    }

    // Update tags based on content
    if (text.length > 20) {
      const tags = document.getElementById("sentimentTags");
      if (tags && hasStress && !hasPositive) {
        tags.innerHTML = `<span class="sentiment-tag anxious">ANXIOUS</span><span class="sentiment-tag reflective">REFLECTIVE</span>`;
      } else if (tags && hasPositive && !hasStress) {
        tags.innerHTML = `<span class="sentiment-tag positive">POSITIVE</span><span class="sentiment-tag hopeful">HOPEFUL</span>`;
      }
    }
  }

  // ── 7. Submit Entry ───────────────────────────────────
  document.getElementById("submitBtn")?.addEventListener("click", function () {
    const text = textarea?.value.trim();
    if (!text) {
      textarea.style.borderColor = "#c8002b";
      textarea.placeholder = "Please write something before submitting…";
      setTimeout(() => {
        textarea.style.borderColor = "";
        textarea.placeholder = "Start writing your thoughts...";
      }, 2000);
      return;
    }

    const selectedMood =
      document.querySelector(".mood-emoji-btn.selected")?.textContent || "😊";
    const words = text.split(/\s+/).filter(Boolean).length;
    const today = new Date().toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const titleGuess =
      text.split(/[.!?]/)[0].trim().slice(0, 40) || "Today's Reflection";

    // Add to history
    addHistoryEntry(today, selectedMood, titleGuess, text.slice(0, 60) + "…");

    // Animate submit
    this.textContent = "✓ Entry Saved!";
    this.style.background = "#16a34a";
    textarea.value = "";
    if (wordCount) wordCount.textContent = "0 words";

    setTimeout(() => {
      this.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Submit Entry`;
      this.style.background = "";
    }, 2500);
  });

  function addHistoryEntry(date, mood, title, preview) {
    const container = document.getElementById("historyEntries");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "history-entry";
    div.innerHTML = `
      <div class="entry-left-bar green-bar"></div>
      <div class="entry-body">
        <div class="entry-meta-row">
          <span class="entry-date">${date}</span>
          <span class="entry-mood">${mood}</span>
        </div>
        <div class="entry-title">${title}</div>
        <div class="entry-preview">${preview}</div>
      </div>
    `;
    div.style.opacity = "0";
    div.style.transform = "translateY(-8px)";
    container.prepend(div);

    requestAnimationFrame(() => {
      div.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      div.style.opacity = "1";
      div.style.transform = "";
    });

    div.addEventListener("click", () => {
      div.style.outline = "2px solid #5b3ec8";
      setTimeout(() => (div.style.outline = ""), 1200);
    });
  }

  // ── 8. History entry click ────────────────────────────
  document.querySelectorAll(".history-entry").forEach((entry) => {
    entry.addEventListener("click", function () {
      document
        .querySelectorAll(".history-entry")
        .forEach((e) => (e.style.outline = ""));
      this.style.outline = "2px solid #5b3ec8";
      setTimeout(() => (this.style.outline = ""), 1200);
    });
  });

  // ── 9. Calendar nav ───────────────────────────────────
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonthIdx = 2; // March

  document.getElementById("calPrev")?.addEventListener("click", () => {
    currentMonthIdx = (currentMonthIdx - 1 + 12) % 12;
    updateCalMonth();
  });
  document.getElementById("calNext")?.addEventListener("click", () => {
    currentMonthIdx = (currentMonthIdx + 1) % 12;
    updateCalMonth();
  });
  function updateCalMonth() {
    const el = document.getElementById("calMonth");
    if (el) el.textContent = `${months[currentMonthIdx]} 2026`;
  }

  // ── 10. Box breathing link ────────────────────────────
  document.getElementById("boxBreathingLink")?.addEventListener("click", () => {
    window.location.href = "crisis.html";
  });

  // ── 11. Bar chart animation on load ──────────────────
  document.querySelectorAll(".i-bar").forEach((bar, i) => {
    const h = bar.style.height;
    bar.style.height = "0%";
    setTimeout(
      () => {
        bar.style.transition = "height 0.6s cubic-bezier(0.4,0,0.2,1)";
        bar.style.height = h;
      },
      200 + i * 60,
    );
  });

  // ── 12. Entrance animations ───────────────────────────
  [
    ".journal-card",
    ".ai-insights-card",
    ".history-card",
    ".weekly-insight-card",
  ].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    setTimeout(
      () => {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "";
      },
      80 + i * 100,
    );
  });
});

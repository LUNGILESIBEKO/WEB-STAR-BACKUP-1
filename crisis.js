/* ═══════════════════════════════════════════════════════
   MindCare Hub – Crisis Centre
   crisis.js
═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Nav active highlight ───────────────────────────
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
      document
        .querySelectorAll(".nav-item")
        .forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
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

  // ── 3. Share details toggle ───────────────────────────
  const shareToggle = document.getElementById("shareToggle");
  let shareDetails = false;
  if (shareToggle) {
    shareToggle.addEventListener("click", function () {
      shareDetails = !shareDetails;
      this.classList.toggle("on", shareDetails);
      this.setAttribute("aria-checked", shareDetails.toString());
    });
  }

  // ── 4. Send Anonymous Alert ───────────────────────────
  const sendAlertBtn = document.getElementById("sendAlertBtn");
  if (sendAlertBtn) {
    sendAlertBtn.addEventListener("click", () => {
      sendAlertBtn.textContent = "ALERT SENT ✓";
      sendAlertBtn.style.background = "#e8f5e9";
      sendAlertBtn.style.color = "#2e7d32";
      sendAlertBtn.disabled = true;

      // Show confirmation after a moment
      setTimeout(() => {
        alert(
          shareDetails
            ? "✅ Priority alert sent to UJ Wellness Centre.\nYour details have been shared with the responder."
            : "✅ Anonymous priority alert sent to UJ Wellness Centre.\nYour identity remains protected.",
        );
      }, 300);
    });
  }

  // ── 5. Need Immediate Help FAB ────────────────────────
  const needHelpFab = document.getElementById("needHelpFab");
  if (needHelpFab) {
    needHelpFab.addEventListener("click", () => {
      // Scroll to crisis support cards
      const cards = document.querySelector(".support-cards");
      if (cards) cards.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ── 6. Notification button flash ─────────────────────
  const notifBtn = document.getElementById("notifBtn");
  if (notifBtn) {
    notifBtn.addEventListener("click", function () {
      this.style.background = "#eee9ff";
      setTimeout(() => (this.style.background = ""), 350);
    });
  }

  // ── 7. Breathing exercise button ─────────────────────
  const breathingBtn = document.querySelector(".breathing-btn");
  if (breathingBtn) {
    breathingBtn.addEventListener("click", () => {
      launchBreathingExercise();
    });
  }

  function launchBreathingExercise() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(91,62,200,0.92);
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; z-index:200; color:white; font-family:'DM Sans',sans-serif;
    `;

    const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    const durations = [4, 4, 4, 4];
    let phase = 0;
    let count = durations[0];

    overlay.innerHTML = `
      <div style="font-size:13px;font-weight:700;letter-spacing:0.15em;opacity:0.7;margin-bottom:16px;">BOX BREATHING</div>
      <div id="breathCircle" style="
        width:130px;height:130px;border-radius:50%;
        border:3px solid rgba(255,255,255,0.4);
        display:flex;align-items:center;justify-content:center;
        font-size:36px;font-weight:800;margin-bottom:20px;
        transition:transform 4s ease, border-color 0.5s;
      ">${count}</div>
      <div id="breathPhase" style="font-size:20px;font-weight:700;margin-bottom:8px;">${phases[0]}</div>
      <div style="font-size:13px;opacity:0.65;margin-bottom:32px;">4 • 4 • 4 • 4 seconds</div>
      <button id="closeBreath" style="
        background:rgba(255,255,255,0.2);border:1.5px solid rgba(255,255,255,0.4);
        color:white;border-radius:8px;padding:10px 24px;
        font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;
      ">Close</button>
    `;
    document.body.appendChild(overlay);

    const circle = overlay.querySelector("#breathCircle");
    const phaseLabel = overlay.querySelector("#breathPhase");

    // Animate circle size based on phase
    const scaleMap = {
      "Breathe In": 1.4,
      Hold: 1.4,
      "Breathe Out": 0.9,
      Hold: 0.9,
    };

    const interval = setInterval(() => {
      count--;
      if (circle) circle.textContent = count;
      if (count === 0) {
        phase = (phase + 1) % 4;
        count = durations[phase];
        phaseLabel.textContent = phases[phase];
        const scales = [1.4, 1.4, 0.9, 0.9];
        circle.style.transform = `scale(${scales[phase]})`;
        circle.style.borderColor =
          phase < 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)";
      }
    }, 1000);

    overlay.querySelector("#closeBreath").addEventListener("click", () => {
      clearInterval(interval);
      overlay.remove();
    });
  }

  // ── 8. AI Chat ────────────────────────────────────────
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatMessages");
  const typingRow = document.getElementById("typingRow");

  const aiResponses = [
    "I hear you. It sounds like you're carrying a lot right now. What feels most overwhelming at this moment?",
    "Thank you for sharing that with me. Remember, it's okay to take things one small step at a time. What is one thing you could do right now that might help, even slightly?",
    "You're not alone in feeling this way. Many students go through periods like this. Would you like me to connect you with a counsellor who can offer more support?",
    "I'm here with you. Let's take a slow breath together. In for 4 counts... hold... and out. How are you feeling now?",
    "That takes courage to share. Have you been able to sleep or eat today? Taking care of the basics can sometimes help us face bigger challenges.",
  ];
  let aiIndex = 0;

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user bubble
    const userRow = document.createElement("div");
    userRow.className = "msg-row user";
    userRow.innerHTML = `
      <div class="msg-bubble user-bubble">${text}</div>
      <div class="msg-avatar user-avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    `;
    chatMessages.insertBefore(userRow, typingRow);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing for 1.5s then reply
    typingRow.style.display = "flex";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingRow.style.display = "none";
      const aiRow = document.createElement("div");
      aiRow.className = "msg-row ai";
      aiRow.innerHTML = `
        <div class="msg-avatar ai-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <div class="msg-bubble ai-bubble">${aiResponses[aiIndex % aiResponses.length]}</div>
      `;
      chatMessages.insertBefore(aiRow, typingRow);
      aiIndex++;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
  }

  if (chatSendBtn) chatSendBtn.addEventListener("click", sendMessage);
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // ── 9. Resource buttons ───────────────────────────────
  document.querySelectorAll(".resource-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const label = this.querySelector("span")?.textContent;
      alert(`Opening: ${label}\n\nThis would navigate to the ${label} page.`);
    });
  });

  // ── 10. Support card phone links — visual feedback ────
  document.querySelectorAll(".card-number").forEach((link) => {
    link.addEventListener("click", function (e) {
      // On mobile this dials; on desktop just confirms
      if (!this.href.startsWith("tel:")) e.preventDefault();
    });
  });

  // ── 11. Entrance animations ───────────────────────────
  const fadeUp = (els, delayStart = 0, step = 80) => {
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      setTimeout(
        () => {
          el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
          el.style.opacity = "1";
          el.style.transform = "";
        },
        delayStart + i * step,
      );
    });
  };

  fadeUp(document.querySelectorAll(".support-card"), 100, 100);
  fadeUp(document.querySelectorAll(".resource-btn"), 300, 60);

  // Hero banner slide in
  const hero = document.querySelector(".hero-banner");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(-10px)";
    setTimeout(() => {
      hero.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      hero.style.opacity = "1";
      hero.style.transform = "";
    }, 50);
  }
});
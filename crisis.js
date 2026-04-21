document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Sidebar Navigation ─────────────────────────────
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();

      document
        .querySelectorAll(".nav-item")
        .forEach((n) => n.classList.remove("active"));

      this.classList.add("active");
    });
  });

  // ── 2. Crisis Call Button ─────────────────────────────
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    const confirmCall = confirm(
      "You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?"
    );

    if (confirmCall) {
      window.location.href = "tel:0800567567";
    }
  });

  // ── 3. Share Details Toggle ───────────────────────────
  const shareToggle = document.getElementById("shareToggle");
  let shareDetails = false;

  if (shareToggle) {
    shareToggle.addEventListener("click", function () {
      shareDetails = !shareDetails;
      this.classList.toggle("on", shareDetails);
      this.setAttribute("aria-checked", shareDetails);
    });
  }

  // ── 4. Anonymous Alert Button ─────────────────────────
  const sendAlertBtn = document.getElementById("sendAlertBtn");

  if (sendAlertBtn) {
    sendAlertBtn.addEventListener("click", () => {
      sendAlertBtn.textContent = "ALERT SENT ✓";
      sendAlertBtn.style.background = "#e8f5e9";
      sendAlertBtn.style.color = "#2e7d32";
      sendAlertBtn.disabled = true;

      setTimeout(() => {
        alert(
          shareDetails
            ? "✅ Priority alert sent.\nYour details were shared."
            : "✅ Anonymous priority alert sent.\nYour identity is protected."
        );
      }, 300);
    });
  }

  // ── 5. Floating Help Button ───────────────────────────
  const needHelpFab = document.getElementById("needHelpFab");

  if (needHelpFab) {
    needHelpFab.addEventListener("click", () => {
      const cards = document.querySelector(".support-cards");

      if (cards) {
        cards.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  // ── 6. Notification Button ────────────────────────────
  const notifBtn = document.getElementById("notifBtn");

  if (notifBtn) {
    notifBtn.addEventListener("click", function () {
      this.style.background = "#eee9ff";

      setTimeout(() => {
        this.style.background = "";
      }, 350);
    });
  }

  // ── 7. Breathing Exercise ─────────────────────────────
  const breathingBtn = document.querySelector(".breathing-btn");

  if (breathingBtn) {
    breathingBtn.addEventListener("click", launchBreathingExercise);
  }

  function launchBreathingExercise() {
    const overlay = document.createElement("div");

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(91,62,200,0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      font-family: 'DM Sans', sans-serif;
      color: white;
    `;

    const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    const times = [4, 4, 4, 4];

    let phase = 0;
    let count = times[0];

    overlay.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.15em;opacity:0.7;margin-bottom:16px;">
          BOX BREATHING
        </div>

        <div id="breathCircle" style="
          width:130px;
          height:130px;
          border-radius:50%;
          border:3px solid rgba(255,255,255,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:36px;
          font-weight:800;
          margin:auto auto 20px;
          transition:transform 4s ease;
        ">
          ${count}
        </div>

        <div id="breathPhase" style="font-size:20px;font-weight:700;margin-bottom:8px;">
          ${phases[0]}
        </div>

        <div style="font-size:13px;opacity:0.65;margin-bottom:30px;">
          4 • 4 • 4 • 4 seconds
        </div>

        <button id="closeBreath" style="
          background:rgba(255,255,255,0.18);
          color:white;
          border:1px solid rgba(255,255,255,0.35);
          border-radius:10px;
          padding:10px 22px;
          font-weight:700;
          cursor:pointer;
        ">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const circle = overlay.querySelector("#breathCircle");
    const phaseText = overlay.querySelector("#breathPhase");
    const closeBtn = overlay.querySelector("#closeBreath");

    const interval = setInterval(() => {
      count--;
      circle.textContent = count;

      if (count === 0) {
        phase = (phase + 1) % phases.length;
        count = times[phase];

        phaseText.textContent = phases[phase];
        circle.textContent = count;

        if (phase === 0 || phase === 1) {
          circle.style.transform = "scale(1.35)";
        } else {
          circle.style.transform = "scale(0.9)";
        }
      }
    }, 1000);

    closeBtn.addEventListener("click", () => {
      clearInterval(interval);
      overlay.remove();
    });
  }
});
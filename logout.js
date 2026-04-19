document.addEventListener("DOMContentLoaded", () => {
  // ── SESSION TIMER ───────────────────────
  // Track how long the user has been on this page / simulate session time
  const sessionStart = Date.now() - 42 * 60 * 1000; // simulate 42 min session
  const sessionInfoEl = document.getElementById("sessionInfo");

  function updateSessionTime() {
    const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    if (sessionInfoEl) {
      sessionInfoEl.textContent =
        mins > 0
          ? `Session started ${mins} minute${mins !== 1 ? "s" : ""} ago`
          : `Session started ${secs} second${secs !== 1 ? "s" : ""} ago`;
    }
  }

  updateSessionTime();
  setInterval(updateSessionTime, 30000); // update every 30s

  // ── COUNTDOWN OVERLAY ───────────────────
  // Create the countdown overlay dynamically
  const overlay = document.createElement("div");
  overlay.className = "countdown-overlay";
  overlay.id = "countdownOverlay";
  overlay.innerHTML = `
    <div style="position:relative;width:100px;height:100px;display:flex;align-items:center;justify-content:center;">
      <div class="countdown-ring"></div>
      <span class="countdown-num" id="countdownNum">3</span>
    </div>
    <p class="countdown-msg" id="countdownMsg">Logging you out safely…</p>
    <button id="cancelCountdownBtn" style="
      margin-top:10px;
      background:rgba(255,255,255,0.12);
      border:1px solid rgba(255,255,255,0.25);
      border-radius:10px;
      color:rgba(255,255,255,0.8);
      font-size:13px;
      font-weight:600;
      font-family:'DM Sans',sans-serif;
      padding:10px 24px;
      cursor:pointer;
      transition:background 0.15s;
    ">Cancel</button>
  `;
  document.body.appendChild(overlay);

  let countdownInterval = null;
  let countdownCancelled = false;

  // ── LOG OUT BUTTON ───────────────────────
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    startLogoutCountdown();
  });

  function startLogoutCountdown() {
    countdownCancelled = false;
    let count = 3;
    overlay.classList.add("show");

    const numEl = document.getElementById("countdownNum");
    const msgEl = document.getElementById("countdownMsg");

    if (numEl) numEl.textContent = count;
    if (msgEl) msgEl.textContent = "Logging you out safely…";

    countdownInterval = setInterval(() => {
      if (countdownCancelled) {
        clearInterval(countdownInterval);
        overlay.classList.remove("show");
        return;
      }

      count--;

      if (numEl) numEl.textContent = count;

      if (count === 0) {
        clearInterval(countdownInterval);
        if (msgEl) msgEl.textContent = "Goodbye! Take care 👋";
        if (numEl) numEl.textContent = "✓";

        // After brief pause, redirect to index/login
        setTimeout(() => {
          if (!countdownCancelled) {
            // In production this would redirect to the login page
            // window.location.href = 'index.html';
            // For demo, show a confirmation message
            window.location.href = "landingpage.html";
          }
        }, 1200);
      }
    }, 1000);
  }

  // Cancel countdown
  document
    .getElementById("cancelCountdownBtn")
    ?.addEventListener("click", () => {
      countdownCancelled = true;
      clearInterval(countdownInterval);
      overlay.classList.remove("show");
    });

  // ── STAY LOGGED IN BUTTON ────────────────
  document.getElementById("stayBtn")?.addEventListener("click", () => {
    // Animate button
    const btn = document.getElementById("stayBtn");
    btn.textContent = "Taking you back…";
    btn.style.background = "var(--purple-xlight)";
    btn.style.borderColor = "var(--purple-sidebar-active)";
    btn.style.color = "var(--purple-sidebar-active)";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  });

  // ── LOGGED OUT STATE ─────────────────────
  function showLoggedOutState() {
    const card = document.getElementById("logoutCard");
    if (!card) return;

    card.style.transition = "opacity 0.3s, transform 0.3s";
    card.style.opacity = "0";
    card.style.transform = "scale(0.95)";

    setTimeout(() => {
      card.innerHTML = `
        <div class="card-accent"></div>
        <div class="logout-icon" style="background:#dcfce7">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 class="logout-heading" style="font-size:26px">You've been logged out</h1>
        <p class="logout-sub">
          Your session has ended safely. Your journal, mood data, and progress are securely saved and waiting for your return.
        </p>
        <a href="landingpage.html" style="
          display:inline-block;
          background:var(--purple-sidebar-active);
          color:white;
          border:none;
          border-radius:14px;
          padding:15px 36px;
          font-size:15px;
          font-weight:700;
          font-family:'DM Sans',sans-serif;
          cursor:pointer;
          text-decoration:none;
          margin-bottom:24px;
          transition:background 0.15s;
        ">Return to Dashboard</a>
        <p class="session-info">See you next time 👋</p>
      `;

      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    }, 350);
  }

  // ── SIDEBAR NAV — prevent default on # links ──
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
    });
  });
});

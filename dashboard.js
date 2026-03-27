// MindCare Hub – Dashboard JavaScript

// ── Emoji mood selector ──
document.querySelectorAll(".emoji-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".emoji-btn")
      .forEach((b) => b.classList.remove("selected"));
    this.classList.add("selected");
  });
});

// ── Animate bars on load ──
window.addEventListener("load", () => {
  document.querySelectorAll(".bar").forEach((bar, i) => {
    const target = bar.style.height;
    bar.style.height = "0%";
    setTimeout(
      () => {
        bar.style.height = target;
      },
      100 + i * 80,
    );
  });
});

// ── Active nav highlight ──
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") e.preventDefault();
    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("active"));
    this.classList.add("active");
  });
});

// ── Notification button pulse ──
const notifBtn = document.querySelector(".notif-btn");
if (notifBtn) {
  notifBtn.addEventListener("click", () => {
    notifBtn.style.background = "#EEE9FF";
    setTimeout(() => (notifBtn.style.background = "white"), 300);
  });
}

// ── Journal entry expand (click to highlight) ──
document.querySelectorAll(".journal-entry").forEach((entry) => {
  entry.addEventListener("click", function () {
    document
      .querySelectorAll(".journal-entry")
      .forEach((e) => (e.style.borderColor = ""));
    this.style.borderColor = "#5B3EC8";
  });
});

// ── Crisis button confirmation ──
const crisisBtn = document.querySelector(".crisis-btn");
if (crisisBtn) {
  crisisBtn.addEventListener("click", () => {
    if (
      confirm(
        "You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?",
      )
    ) {
      window.location.href = "tel:0800567567";
    }
  });
}

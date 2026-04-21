document.addEventListener("DOMContentLoaded", () => {
  // Sync button state with saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.getElementById("darkModeBtn")?.classList.add("active");
    document.getElementById("lightModeBtn")?.classList.remove("active");
  }

  document.querySelectorAll(".settings-card").forEach((card, i) => {
    setTimeout(
      () => {
        card.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        card.style.opacity = "1";
        card.style.transform = "";
      },
      80 + i * 100,
    );
  });

  function showToast(msg, type = "") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = "toast show " + type;
    setTimeout(() => {
      toast.className = "toast";
    }, 3200);
  }

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("on");
      const isOn = this.classList.contains("on");
      this.setAttribute("aria-checked", String(isOn));
      const label =
        this.closest(".toggle-row")?.querySelector(".toggle-label")
          ?.textContent || "Setting";
      showToast(
        `${label} ${isOn ? "enabled" : "disabled"}`,
        isOn ? "success" : "",
      );
    });
  });

  //  THEME BUTTONS 
  document.getElementById("lightModeBtn")?.addEventListener("click", () => {
    document.getElementById("lightModeBtn").classList.add("active");
    document.getElementById("darkModeBtn").classList.remove("active");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    showToast("Light mode activated", "success");
  });

  document.getElementById("darkModeBtn")?.addEventListener("click", () => {
    document.getElementById("darkModeBtn").classList.add("active");
    document.getElementById("lightModeBtn").classList.remove("active");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    showToast("Dark mode activated", "success");
  });

  //  CHANGE PASSWORD 
  let pwVisible = false;
  document.getElementById("changePwBtn")?.addEventListener("click", () => {
    const input = document.getElementById("passwordInput");
    const btn = document.getElementById("changePwBtn");
    if (!pwVisible) {
      input.type = "text";
      btn.textContent = "Hide";
      pwVisible = true;
    } else {
      const newPw = input.value.trim();
      if (newPw.length < 8) {
        showToast("Password must be at least 8 characters.", "error");
        return;
      }
      input.type = "password";
      btn.textContent = "Change";
      pwVisible = false;
      showToast("Password updated successfully.", "success");
    }
  });

  document.getElementById("saveBtn")?.addEventListener("click", function () {
    const orig = this.textContent;
    this.textContent = "Saving…";
    this.style.background = "#4a4a6a";
    setTimeout(() => {
      this.textContent = "Saved ✓";
      this.style.background = "#16a34a";
      showToast("Settings saved successfully.", "success");
      setTimeout(() => {
        this.textContent = orig;
        this.style.background = "";
      }, 2000);
    }, 800);
  });

  const legalContent = {
    privacyBtn: {
      title: "Privacy Policy",
      body: `<p><strong>Last updated: March 2026</strong></p><br>
      <p>MindCare Hub is committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data in accordance with South African law.</p><br>
      <p><strong>What we collect:</strong> Mood logs, journal entries, session bookings, and anonymised forum interactions.</p><br>
      <p><strong>How we use it:</strong> To provide personalised mental health insights, connect you with campus support, and improve our services.</p><br>
      <p><strong>Data sharing:</strong> We do not sell your data. We may share anonymised, aggregated statistics with your university's wellness department.</p><br>
      <p><strong>Your rights:</strong> You may request access, correction, or deletion of your data at any time via the Settings page.</p>`,
    },
    tosBtn: {
      title: "Terms of Service",
      body: `<p><strong>Last updated: March 2026</strong></p><br>
      <p>By using MindCare Hub, you agree to the following terms:</p><br>
      <p><strong>Acceptable use:</strong> MindCare Hub is a supplementary support tool. It is not a substitute for professional medical or psychological care.</p><br>
      <p><strong>Account:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p><br>
      <p><strong>Content:</strong> You retain ownership of your journal entries. By posting in the Forum, you grant MindCare Hub a non-exclusive licence to display your content anonymously.</p><br>
      <p><strong>Termination:</strong> We reserve the right to suspend accounts that violate community guidelines.</p>`,
    },
    popiaBtn: {
      title: "POPIA Notice",
      body: `<p><strong>Protection of Personal Information Act (POPIA) — South Africa</strong></p><br>
      <p>MindCare Hub processes your personal information in compliance with the Protection of Personal Information Act 4 of 2013 (POPIA).</p><br>
      <p><strong>Information Officer:</strong> data@mindcarehub.ac.za</p><br>
      <p><strong>Purpose of processing:</strong> To provide mental health support services to registered students.</p><br>
      <p><strong>Lawful basis:</strong> Consent and legitimate interest in student wellbeing.</p><br>
      <p><strong>Retention:</strong> Your data is retained for the duration of your enrolment plus 12 months, unless you request deletion earlier.</p><br>
      <p><strong>Your rights under POPIA:</strong> Access, correction, deletion, objection to processing, and the right to lodge a complaint with the Information Regulator.</p>`,
    },
  };

  const legalModal = document.getElementById("legalModal");
  Object.keys(legalContent).forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      document.getElementById("legalModalTitle").textContent =
        legalContent[id].title;
      document.getElementById("legalModalBody").innerHTML =
        legalContent[id].body;
      legalModal.classList.add("open");
    });
  });

  document
    .getElementById("legalModalClose")
    ?.addEventListener("click", () => legalModal.classList.remove("open"));
  legalModal?.addEventListener("click", (e) => {
    if (e.target === legalModal) legalModal.classList.remove("open");
  });

  document.getElementById("exportBtn")?.addEventListener("click", function () {
    const orig = this.innerHTML;
    this.textContent = "Preparing…";
    this.style.opacity = "0.7";
    setTimeout(() => {
      this.innerHTML = orig;
      this.style.opacity = "";
      showToast(
        "📥 Export request submitted. Check your email within 24 hours.",
        "success",
      );
    }, 1200);
  });

  const deleteModal = document.getElementById("deleteModal");

  document.getElementById("deleteBtn")?.addEventListener("click", () => {
    document.getElementById("deleteConfirmInput").value = "";
    deleteModal.classList.add("open");
  });

  document
    .getElementById("deleteModalClose")
    ?.addEventListener("click", () => deleteModal.classList.remove("open"));
  document
    .getElementById("deleteCancelBtn")
    ?.addEventListener("click", () => deleteModal.classList.remove("open"));
  deleteModal?.addEventListener("click", (e) => {
    if (e.target === deleteModal) deleteModal.classList.remove("open");
  });

  document.getElementById("deleteConfirmBtn")?.addEventListener("click", () => {
    const val = document
      .getElementById("deleteConfirmInput")
      .value.trim()
      .toUpperCase();
    if (val !== "DELETE") {
      showToast("Please type DELETE to confirm.", "error");
      return;
    }
    deleteModal.classList.remove("open");
    showToast(
      "Account deletion request submitted. You will receive a confirmation email.",
      "success",
    );
  });

  document.getElementById("emailInput")?.addEventListener("blur", function () {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
    this.style.borderColor = valid ? "" : "#c8002b";
    if (!valid) showToast("Please enter a valid email address.", "error");
  });
});

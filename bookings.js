// Campus selection
document.querySelectorAll(".campus-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".campus-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Time slot selection
document.querySelectorAll(".slot-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".slot-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// FAQ toggle
function toggleFaq(id) {
  const item = document.getElementById(id);
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector("svg");
  const isOpen = answer.style.display !== "none";
  answer.style.display = isOpen ? "none" : "block";
  icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
}

// Confirm button
document.getElementById("confirmBtn").addEventListener("click", () => {
  const check = document.getElementById("consentCheck");
  if (!check.checked) {
    alert("Please confirm you have read the confidentiality policy.");
    return;
  }
  alert(
    "Appointment confirmed! You will receive a confirmation email shortly.",
  );
});

// Applies saved theme on every page
(function () {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
})();

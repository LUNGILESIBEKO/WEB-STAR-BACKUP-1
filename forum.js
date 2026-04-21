
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
    });
  });

  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (
      confirm(
        "You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?",
      )
    ) {
      window.location.href = "tel:0800567567";
    }
  });

  document.getElementById("contactCrisisBtn")?.addEventListener("click", () => {
    if (
      confirm(
        "Connecting you to the Crisis Line: 988\n\nThis is free, confidential and available 24/7.\n\nProceed?",
      )
    ) {
      window.location.href = "tel:988";
    }
  });

  const pills = document.querySelectorAll(".pill");
  const posts = document.querySelectorAll(".post-card");

  pills.forEach((pill) => {
    pill.addEventListener("click", function () {
      pills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;
      posts.forEach((post) => {
        const cat = post.dataset.category || "";
        if (filter === "all" || cat === filter) {
          post.style.display = "";
          post.style.opacity = "0";
          post.style.transform = "translateY(8px)";
          requestAnimationFrame(() => {
            post.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            post.style.opacity = "1";
            post.style.transform = "";
          });
        } else {
          post.style.display = "none";
        }
      });
    });
  });

  document.querySelectorAll(".tag-pill").forEach((tag) => {
    tag.addEventListener("click", function () {
      const filter = this.dataset.filter || "all";
      // Click the matching pill
      pills.forEach((p) => {
        if (p.dataset.filter === filter) p.click();
      });
    });
  });

  const overlay = document.getElementById("modalOverlay");
  const newPostBtn = document.getElementById("newPostBtn");
  const modalClose = document.getElementById("modalClose");
  const modalCancel = document.getElementById("modalCancel");
  const modalSubmit = document.getElementById("modalSubmit");

  const openModal = () => overlay.classList.add("open");
  const closeModal = () => overlay.classList.remove("open");

  newPostBtn?.addEventListener("click", openModal);
  modalClose?.addEventListener("click", closeModal);
  modalCancel?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  modalSubmit?.addEventListener("click", () => {
    const title = document.getElementById("postTitle")?.value.trim();
    const body = document.getElementById("postBody")?.value.trim();
    const category = document.getElementById("postCategory")?.value;

    if (!title || !body || !category) {
      alert("Please fill in all fields before posting.");
      return;
    }

    const card = document.createElement("article");
    card.className = "post-card";
    card.dataset.category = category;
    card.style.opacity = "0";
    card.style.transform = "translateY(-10px)";
    card.innerHTML = `
      <div class="post-header">
        <div class="post-author-wrap">
          <div class="post-avatar anon-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <div class="post-author">Anonymous Student</div>
            <div class="post-meta">Posted just now in <span class="post-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span></div>
          </div>
        </div>
      </div>
      <h2 class="post-title">${title}</h2>
      <p class="post-body">${body}</p>
      <div class="post-footer">
        <div class="post-actions">
          <button class="action-btn like-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            0 Helpful
          </button>
          <button class="action-btn comment-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            0 Comments
          </button>
        </div>
        <button class="bookmark-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
    `;

    const feed = document.getElementById("postsFeed");
    feed.prepend(card);

    requestAnimationFrame(() => {
      card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      card.style.opacity = "1";
      card.style.transform = "";
    });

    wirePostActions(card);

    // Reset form
    document.getElementById("postTitle").value = "";
    document.getElementById("postBody").value = "";
    document.getElementById("postCategory").value = "";
    closeModal();
  });

  function wirePostActions(scope) {
    scope.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const isLiked = this.classList.toggle("liked");
        const countText = this.textContent.trim();
        const num = parseInt(countText) || 0;
        const label = countText.replace(/^\d+\s*/, "");
        this.innerHTML = this.innerHTML.replace(
          /\d+/,
          isLiked ? num + 1 : Math.max(0, num - 1),
        );
      });
    });
    scope.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.classList.toggle("saved");
      });
    });
  }

  document.querySelectorAll(".post-card").forEach(wirePostActions);

  document
    .getElementById("audioPlayBtn")
    ?.addEventListener("click", function () {
      const isPlaying = this.dataset.playing === "true";
      if (!isPlaying) {
        this.dataset.playing = "true";
        this.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      } else {
        this.dataset.playing = "false";
        this.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    });

  document
    .getElementById("searchInput")
    ?.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      document.querySelectorAll(".post-card").forEach((post) => {
        const title =
          post.querySelector(".post-title")?.textContent.toLowerCase() || "";
        const body =
          post.querySelector(".post-body")?.textContent.toLowerCase() || "";
        post.style.display =
          !query || title.includes(query) || body.includes(query) ? "" : "none";
      });
    });

  document.querySelector(".find-center-btn")?.addEventListener("click", () => {
    window.open("https://findahelpline.com", "_blank");
  });

  document.querySelectorAll(".post-card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    setTimeout(
      () => {
        card.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        card.style.opacity = "1";
        card.style.transform = "";
      },
      80 + i * 100,
    );
  });
});


const overlay = document.getElementById("modalOverlay");
document
  .getElementById("newPostBtn")
  .addEventListener("click", () => overlay.classList.add("open"));
document
  .getElementById("modalClose")
  .addEventListener("click", () => overlay.classList.remove("open"));
document
  .getElementById("modalCancel")
  .addEventListener("click", () => overlay.classList.remove("open"));
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.remove("open");
});

document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document
      .querySelectorAll(".pill")
      .forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    const filter = pill.dataset.filter;
    document.querySelectorAll(".post-card").forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "" : "none";
    });
  });
});

// Crisis btn
document
  .getElementById("contactCrisisBtn")
  .addEventListener("click", () => (window.location.href = "crisis.html"));

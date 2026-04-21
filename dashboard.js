
   document.addEventListener('DOMContentLoaded', () => {

  // ── Set current date ──
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // ── Emoji mood selector ──
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // ── Animate mood bars on load ──
  document.querySelectorAll('.bar').forEach((bar, i) => {
    const target = bar.style.height;
    bar.style.height = '0%';
    bar.style.transition = 'height 0.6s ease';
    setTimeout(() => { bar.style.height = target; }, 150 + i * 80);
  });

  // ── Active nav highlight ──
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') e.preventDefault();
    });
  });

  // ── Notification button pulse ──
  const notifBtn = document.querySelector('.notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      notifBtn.style.background = '#EEE9FF';
      setTimeout(() => (notifBtn.style.background = 'white'), 300);
    });
  }

  // ── Journal entry highlight on click ──
  document.querySelectorAll('.journal-entry').forEach(entry => {
    entry.addEventListener('click', function () {
      document.querySelectorAll('.journal-entry').forEach(e => e.style.borderColor = '');
      this.style.borderColor = '#5b3ec8';
    });
  });

  // ── Logout link → go to logout.html ──
  document.querySelectorAll('a.sidebar-link').forEach(link => {
    if (link.getAttribute('href') === 'logout.html') {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'logout.html';
      });
    }
  });

  // ── Crisis button ──
  const crisisBtn = document.querySelector('.crisis-btn');
  if (crisisBtn) {
    crisisBtn.addEventListener('click', () => {
      if (confirm('You are about to call the crisis line: 0800 567 567\n\nFree and available 24/7.\n\nProceed?')) {
        window.location.href = 'tel:0800567567';
      }
    });
  }

});
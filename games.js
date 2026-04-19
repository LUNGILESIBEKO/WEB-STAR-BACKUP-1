// ══════════════════════════════════════════
// MindCare Hub – Games & Mindfulness
// games.js
// ══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  // ── SEARCH FILTER ──────────────────────
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll(".game-card, .video-card").forEach((card) => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? "" : "none";
      });
    });
  }

  // ── PLAY NOW BUTTONS (games) ───────────
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const gameName = btn
        .closest(".game-card")
        .querySelector(".game-name").textContent;
      openGameModal(gameName);
    });
  });

  // ── VIDEO PLAY BUTTONS ──────────────────
  document.querySelectorAll(".play-circle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn
        .closest(".video-card")
        .querySelector(".video-title").textContent;
      const duration = btn
        .closest(".video-card")
        .querySelector(".video-duration").textContent;
      openVideoModal(title, duration);
    });
  });

  // ── VIDEO CARDS (clicking anywhere) ────
  document.querySelectorAll(".video-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (e.target.closest(".play-circle")) return; // handled above
      const title = card.querySelector(".video-title").textContent;
      const duration = card.querySelector(".video-duration").textContent;
      openVideoModal(title, duration);
    });
  });
});

// ══════════════════════════════════════════
// GAME MODAL
// ══════════════════════════════════════════
function openGameModal(gameName) {
  const existing = document.getElementById("gameModal");
  if (existing) existing.remove();

  let content = "";

  if (gameName === "Memory Focus") {
    content = buildMemoryGame();
  } else if (gameName === "Puzzle Escape Game") {
    content = buildPuzzleGame();
  } else if (gameName === "Breathing Rhythms") {
    content = buildBreathingGame();
  }

  const modal = document.createElement("div");
  modal.id = "gameModal";
  modal.className = "mc-modal-overlay";
  modal.innerHTML = `
    <div class="mc-modal mc-modal-large">
      <div class="mc-modal-header">
        <h2 class="mc-modal-title">${gameName}</h2>
        <button class="mc-modal-close" onclick="closeModal('gameModal')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="mc-modal-body">${content}</div>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add("open"));
}

// ══════════════════════════════════════════
// VIDEO MODAL
// ══════════════════════════════════════════
function openVideoModal(title, duration) {
  const existing = document.getElementById("videoModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "videoModal";
  modal.className = "mc-modal-overlay";
  modal.innerHTML = `
    <div class="mc-modal mc-modal-large">
      <div class="mc-modal-header">
        <h2 class="mc-modal-title">${title}</h2>
        <button class="mc-modal-close" onclick="closeModal('videoModal')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="mc-modal-body">
        <div class="video-player">
          <div class="video-player-screen">
            <div class="video-player-icon" id="videoPlayIcon" onclick="toggleVideoPlay()">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
            <div class="video-playing-indicator" id="videoPlaying" style="display:none">
              <div class="vp-bar"></div><div class="vp-bar"></div><div class="vp-bar"></div>
              <span style="color:white;font-size:13px;font-weight:600;margin-left:10px">Playing…</span>
            </div>
          </div>
          <div class="video-progress-wrap">
            <div class="video-progress-bar" id="videoProgress"></div>
          </div>
          <div class="video-controls-row">
            <span class="video-current-time" id="videoCurrentTime">0:00</span>
            <span class="video-duration-label">${duration}</span>
          </div>
        </div>
        <p style="font-size:14px;color:#4a4a6a;line-height:1.6;margin-top:16px">
          This mindfulness video was curated by campus therapists. Find a quiet space, put on headphones, and follow along at your own pace.
        </p>
      </div>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add("open"));
}

let videoInterval = null;
let videoSeconds = 0;
let videoPlaying = false;

function toggleVideoPlay() {
  videoPlaying = !videoPlaying;
  const icon = document.getElementById("videoPlayIcon");
  const indicator = document.getElementById("videoPlaying");
  if (videoPlaying) {
    icon.style.display = "none";
    indicator.style.display = "flex";
    videoInterval = setInterval(tickVideo, 1000);
  } else {
    icon.style.display = "flex";
    indicator.style.display = "none";
    clearInterval(videoInterval);
  }
}

function tickVideo() {
  videoSeconds++;
  const mins = Math.floor(videoSeconds / 60);
  const secs = videoSeconds % 60;
  const el = document.getElementById("videoCurrentTime");
  const prog = document.getElementById("videoProgress");
  if (el) el.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  if (prog) prog.style.width = Math.min((videoSeconds / 300) * 100, 100) + "%";
}

// ══════════════════════════════════════════
// MEMORY FOCUS GAME
// ══════════════════════════════════════════
function buildMemoryGame() {
  return `
    <p style="font-size:14px;color:#4a4a6a;margin-bottom:20px;line-height:1.6">
      Memorise the pattern, then recreate it. Each round adds one more step.
    </p>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <span style="font-size:13px;font-weight:600;color:#7a7a9a">ROUND <span id="memRound">1</span></span>
      <span style="font-size:13px;font-weight:600;color:#7a7a9a">SCORE <span id="memScore">0</span></span>
    </div>
    <div id="memGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8]
        .map(
          (i) => `
        <button onclick="memTileClick(${i})" id="memTile${i}"
          style="height:80px;border-radius:12px;border:2px solid #e8e8f0;background:#f7f4ff;cursor:pointer;transition:all 0.15s;font-size:22px">
        </button>`,
        )
        .join("")}
    </div>
    <div id="memStatus" style="text-align:center;font-size:14px;font-weight:600;color:#5b3ec8;margin-bottom:16px">Watch the pattern…</div>
    <button onclick="startMemoryGame()" id="memStartBtn"
      style="width:100%;background:#5b3ec8;color:white;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer">
      Start Game
    </button>`;
}

let memSequence = [];
let memPlayerSeq = [];
let memRound = 1;
let memScore = 0;
let memWaiting = false;
const EMOJIS = ["🌟", "🎯", "💜", "🔥", "🌊", "🎵", "🌿", "⚡", "🦋"];

function startMemoryGame() {
  memSequence = [];
  memPlayerSeq = [];
  memRound = 1;
  memScore = 0;
  document.getElementById("memScore").textContent = "0";
  document.getElementById("memStartBtn").style.display = "none";
  addMemStep();
}

function addMemStep() {
  memPlayerSeq = [];
  memWaiting = false;
  memSequence.push(Math.floor(Math.random() * 9));
  document.getElementById("memRound").textContent = memRound;
  document.getElementById("memStatus").textContent = "Watch the pattern…";
  playMemSequence();
}

function playMemSequence(idx = 0) {
  if (idx >= memSequence.length) {
    memWaiting = true;
    document.getElementById("memStatus").textContent =
      "Your turn! Repeat the pattern.";
    return;
  }
  const tile = document.getElementById("memTile" + memSequence[idx]);
  setTimeout(() => {
    tile.style.background = "#5b3ec8";
    tile.style.borderColor = "#5b3ec8";
    tile.textContent = EMOJIS[memSequence[idx]];
    setTimeout(() => {
      tile.style.background = "#f7f4ff";
      tile.style.borderColor = "#e8e8f0";
      tile.textContent = "";
      playMemSequence(idx + 1);
    }, 600);
  }, idx * 900);
}

function memTileClick(i) {
  if (!memWaiting) return;
  const tile = document.getElementById("memTile" + i);
  tile.style.background = "#eee9ff";
  tile.textContent = EMOJIS[i];
  setTimeout(() => {
    tile.style.background = "#f7f4ff";
    tile.textContent = "";
  }, 300);
  memPlayerSeq.push(i);
  const pos = memPlayerSeq.length - 1;
  if (memPlayerSeq[pos] !== memSequence[pos]) {
    document.getElementById("memStatus").textContent =
      `❌ Wrong! You scored ${memScore}. Try again.`;
    memWaiting = false;
    document.getElementById("memStartBtn").style.display = "block";
    document.getElementById("memStartBtn").textContent = "Play Again";
    return;
  }
  if (memPlayerSeq.length === memSequence.length) {
    memScore += memRound * 10;
    memRound++;
    document.getElementById("memScore").textContent = memScore;
    document.getElementById("memStatus").textContent =
      "✅ Correct! Next round…";
    memWaiting = false;
    setTimeout(addMemStep, 1000);
  }
}

// ══════════════════════════════════════════
// PUZZLE ESCAPE GAME
// ══════════════════════════════════════════
function buildPuzzleGame() {
  return `
    <p style="font-size:14px;color:#4a4a6a;margin-bottom:20px;line-height:1.6">
      Slide the tiles to restore the image. Click a tile next to the empty space to move it.
    </p>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <span style="font-size:13px;font-weight:600;color:#7a7a9a">MOVES: <span id="puzzleMoves">0</span></span>
      <button onclick="shufflePuzzle()" style="background:none;border:1px solid #e8e8f0;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;color:#4a4a6a">Shuffle</button>
    </div>
    <div id="puzzleGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-width:300px;margin:0 auto 20px"></div>
    <div id="puzzleStatus" style="text-align:center;font-size:14px;font-weight:600;color:#5b3ec8;min-height:22px"></div>`;
}

const PUZZLE_EMOJIS = ["🌸", "🌊", "🌿", "🦋", "⭐", "🌙", "🔮", "🎯", ""];
let puzzleState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let puzzleMoves = 0;

function renderPuzzle() {
  const grid = document.getElementById("puzzleGrid");
  if (!grid) return;
  grid.innerHTML = "";
  puzzleState.forEach((val, idx) => {
    const btn = document.createElement("button");
    btn.style.cssText = `height:90px;border-radius:10px;font-size:28px;border:2px solid ${val === 8 ? "transparent" : "#e8e8f0"};background:${val === 8 ? "transparent" : "#f7f4ff"};cursor:${val === 8 ? "default" : "pointer"};transition:all 0.15s;`;
    btn.textContent = PUZZLE_EMOJIS[val];
    if (val !== 8) btn.onclick = () => movePuzzleTile(idx);
    grid.appendChild(btn);
  });
}

function movePuzzleTile(idx) {
  const empty = puzzleState.indexOf(8);
  const valid = [idx - 1, idx + 1, idx - 3, idx + 3];
  const sameRow = (i, j) => Math.floor(i / 3) === Math.floor(j / 3);
  if (
    (idx === empty - 1 && sameRow(idx, empty)) ||
    (idx === empty + 1 && sameRow(idx, empty)) ||
    idx === empty - 3 ||
    idx === empty + 3
  ) {
    [puzzleState[idx], puzzleState[empty]] = [
      puzzleState[empty],
      puzzleState[idx],
    ];
    puzzleMoves++;
    document.getElementById("puzzleMoves").textContent = puzzleMoves;
    renderPuzzle();
    if (puzzleState.join("") === "012345678") {
      document.getElementById("puzzleStatus").textContent =
        `🎉 Solved in ${puzzleMoves} moves!`;
    }
  }
}

function shufflePuzzle() {
  puzzleMoves = 0;
  document.getElementById("puzzleMoves").textContent = "0";
  document.getElementById("puzzleStatus").textContent = "";
  puzzleState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < 100; i++) {
    const empty = puzzleState.indexOf(8);
    const moves = [];
    if (empty % 3 !== 0) moves.push(empty - 1);
    if (empty % 3 !== 2) moves.push(empty + 1);
    if (empty >= 3) moves.push(empty - 3);
    if (empty <= 5) moves.push(empty + 3);
    const pick = moves[Math.floor(Math.random() * moves.length)];
    [puzzleState[empty], puzzleState[pick]] = [
      puzzleState[pick],
      puzzleState[empty],
    ];
  }
  renderPuzzle();
}

// ══════════════════════════════════════════
// BREATHING RHYTHMS GAME
// ══════════════════════════════════════════
function buildBreathingGame() {
  return `
    <p style="font-size:14px;color:#4a4a6a;margin-bottom:24px;line-height:1.6;text-align:center">
      Follow the circle. Breathe in as it expands, hold, then breathe out as it shrinks.
    </p>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      <div id="breathCircle" style="width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,#7c4fd4,#5b3ec8);box-shadow:0 0 0 20px rgba(91,62,200,0.1);transition:all 1s ease;display:flex;align-items:center;justify-content:center;">
        <span id="breathLabel" style="color:white;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif">Ready</span>
      </div>
      <div id="breathProgress" style="width:200px;height:6px;background:#e8e8f0;border-radius:99px;overflow:hidden">
        <div id="breathBar" style="height:100%;width:0%;background:#5b3ec8;border-radius:99px;transition:width 0.1s linear"></div>
      </div>
      <div id="breathCycles" style="font-size:13px;color:#7a7a9a;font-weight:600">Cycles: <span id="breathCount">0</span></div>
      <div style="display:flex;gap:12px">
        <button onclick="startBreathing()" id="breathStartBtn"
          style="background:#5b3ec8;color:white;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer">
          Begin
        </button>
        <button onclick="stopBreathing()" id="breathStopBtn" style="display:none;background:#e8e8f0;color:#4a4a6a;border:none;border-radius:12px;padding:12px 28px;font-size:14px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer">
          Stop
        </button>
      </div>
      <div id="breathTip" style="font-size:13px;color:#7a7a9a;text-align:center;max-width:260px;line-height:1.6"></div>
    </div>`;
}

const BREATH_PHASES = [
  { label: "Breathe In", duration: 4000, size: "180px", opacity: 0.2 },
  { label: "Hold", duration: 7000, size: "180px", opacity: 0.25 },
  { label: "Breathe Out", duration: 8000, size: "120px", opacity: 0.1 },
];
const BREATH_TIPS = [
  "Box breathing reduces cortisol by up to 30%.",
  "This technique is used by Navy SEALs to stay calm under pressure.",
  "Even 2 minutes of deep breathing improves focus significantly.",
  "Your heart rate is already slowing down. Keep going.",
];
let breathRunning = false;
let breathPhase = 0;
let breathCycles = 0;
let breathTimeout = null;
let breathBarInterval = null;
let breathBarStart = 0;

function startBreathing() {
  breathRunning = true;
  breathCycles = 0;
  breathPhase = 0;
  document.getElementById("breathStartBtn").style.display = "none";
  document.getElementById("breathStopBtn").style.display = "inline-block";
  runBreathPhase();
}

function stopBreathing() {
  breathRunning = false;
  clearTimeout(breathTimeout);
  clearInterval(breathBarInterval);
  const circle = document.getElementById("breathCircle");
  if (circle) {
    circle.style.width = "140px";
    circle.style.height = "140px";
    circle.style.boxShadow = "0 0 0 20px rgba(91,62,200,0.1)";
  }
  const label = document.getElementById("breathLabel");
  if (label) label.textContent = "Done";
  const bar = document.getElementById("breathBar");
  if (bar) bar.style.width = "0%";
  document.getElementById("breathStartBtn").style.display = "inline-block";
  document.getElementById("breathStopBtn").style.display = "none";
  document.getElementById("breathTip").textContent =
    `Great session! You completed ${breathCycles} full cycle${breathCycles !== 1 ? "s" : ""}.`;
}

function runBreathPhase() {
  if (!breathRunning) return;
  const phase = BREATH_PHASES[breathPhase];
  const circle = document.getElementById("breathCircle");
  const label = document.getElementById("breathLabel");
  const bar = document.getElementById("breathBar");
  if (!circle || !label || !bar) return;

  circle.style.width = phase.size;
  circle.style.height = phase.size;
  circle.style.boxShadow = `0 0 0 20px rgba(91,62,200,${phase.opacity})`;
  label.textContent = phase.label;

  bar.style.width = "0%";
  breathBarStart = Date.now();
  clearInterval(breathBarInterval);
  breathBarInterval = setInterval(() => {
    const elapsed = Date.now() - breathBarStart;
    bar.style.width = Math.min((elapsed / phase.duration) * 100, 100) + "%";
  }, 50);

  breathTimeout = setTimeout(() => {
    clearInterval(breathBarInterval);
    breathPhase = (breathPhase + 1) % BREATH_PHASES.length;
    if (breathPhase === 0) {
      breathCycles++;
      document.getElementById("breathCount").textContent = breathCycles;
      document.getElementById("breathTip").textContent =
        BREATH_TIPS[breathCycles % BREATH_TIPS.length];
    }
    runBreathPhase();
  }, phase.duration);
}

// ══════════════════════════════════════════
// CLOSE MODAL
// ══════════════════════════════════════════
function closeModal(id) {
  stopBreathing();
  clearInterval(videoInterval);
  videoPlaying = false;
  videoSeconds = 0;
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("open");
    setTimeout(() => modal.remove(), 250);
  }
}

// Close on overlay click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("mc-modal-overlay")) {
    closeModal(e.target.id);
  }
});

// ══════════════════════════════════════════
// INJECT MODAL + VIDEO STYLES
// ══════════════════════════════════════════
const style = document.createElement("style");
style.textContent = `
  .mc-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(26,26,46,0.6);
    z-index: 200;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .mc-modal-overlay.open { display: flex; }
  .mc-modal {
    background: #ffffff;
    border-radius: 18px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.2);
    animation: mcModalIn 0.25s ease;
    max-height: 90vh;
    overflow-y: auto;
  }
  .mc-modal-large { max-width: 560px; }
  @keyframes mcModalIn {
    from { opacity:0; transform: translateY(20px) scale(0.97); }
    to   { opacity:1; transform: none; }
  }
  .mc-modal-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px 16px;
    border-bottom: 1px solid #e8e8f0;
    position: sticky; top: 0; background: white; z-index: 1;
  }
  .mc-modal-title { font-size: 18px; font-weight: 700; color: #1a1a2e; }
  .mc-modal-close {
    background: none; border: none; cursor: pointer;
    color: #7a7a9a; padding: 4px; border-radius: 6px;
    transition: background 0.15s;
  }
  .mc-modal-close:hover { background: #f5f5fa; }
  .mc-modal-body { padding: 20px 24px 24px; }

  .video-player { background: #f5f5fa; border-radius: 14px; overflow: hidden; }
  .video-player-screen {
    height: 200px;
    background: linear-gradient(135deg, #2d1465, #5b3ec8);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .video-player-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s;
  }
  .video-player-icon:hover { background: rgba(255,255,255,0.35); }
  .video-playing-indicator { display: flex; align-items: center; gap: 4px; }
  .vp-bar {
    width: 4px; height: 20px; background: white; border-radius: 2px;
    animation: vpBounce 0.8s ease-in-out infinite alternate;
  }
  .vp-bar:nth-child(2) { animation-delay: 0.2s; height: 30px; }
  .vp-bar:nth-child(3) { animation-delay: 0.4s; }
  @keyframes vpBounce { from { transform: scaleY(0.5); } to { transform: scaleY(1); } }
  .video-progress-wrap { height: 4px; background: #e8e8f0; }
  .video-progress-bar { height: 100%; width: 0%; background: #5b3ec8; transition: width 0.5s linear; }
  .video-controls-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 14px; font-size: 12px; font-weight: 600; color: #7a7a9a;
  }
`;
document.head.appendChild(style);

// Init puzzle on load in case game opens later
window.initPuzzleIfNeeded = () => {
  if (document.getElementById("puzzleGrid") && puzzleState) {
    shufflePuzzle();
  }
};

// Auto-init puzzle when its modal opens
const origOpenGameModal = openGameModal;
window.openGameModal = function (name) {
  origOpenGameModal(name);
  if (name === "Puzzle Escape Game") {
    setTimeout(shufflePuzzle, 100);
  }
};

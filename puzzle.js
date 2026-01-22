window.addEventListener("DOMContentLoaded", () => {
  const puzzleEl = document.getElementById("puzzle");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const nextBtn = document.getElementById("nextBtn");

  const PUZZLE_IMG = "./images/Girlfriend_puzzle.jpg";
  const SIZE = 3;

  if (!puzzleEl) return;

  let order = Array.from({ length: SIZE * SIZE }, (_, i) => i);
  let firstPick = null;

  function renderTiles() {
    const tiles = puzzleEl.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
      const piece = order[index];
      const x = piece % SIZE;
      const y = Math.floor(piece / SIZE);

      tile.style.backgroundImage = `url("${PUZZLE_IMG}?v=1")`;
      tile.style.backgroundPosition = `${(x * 100) / (SIZE - 1)}% ${(y * 100) / (SIZE - 1)}%`;
    });
  }

  function shufflePuzzle() {
    for (let k = 0; k < 40; k++) {
      const a = Math.floor(Math.random() * order.length);
      const b = Math.floor(Math.random() * order.length);
      [order[a], order[b]] = [order[b], order[a]];
    }
    firstPick = null;
    puzzleEl.querySelectorAll(".tile").forEach(t => t.classList.remove("selected"));
    renderTiles();
    if (nextBtn) nextBtn.disabled = true;
  }

  function isSolved() {
    return order.every((v, i) => v === i);
  }

  function pickTile(index) {
    const tiles = puzzleEl.querySelectorAll(".tile");

    if (firstPick === null) {
      firstPick = index;
      tiles[index].classList.add("selected");
      return;
    }

    [order[firstPick], order[index]] = [order[index], order[firstPick]];
    tiles[firstPick].classList.remove("selected");
    firstPick = null;

    renderTiles();

    if (isSolved()) {
      if (nextBtn) nextBtn.disabled = false;
      alert("เก่งมาก! ต่อภาพได้แล้ว 💗");
    }
  }

  function buildPuzzle() {
    puzzleEl.innerHTML = "";
    for (let i = 0; i < SIZE * SIZE; i++) {
      const tile = document.createElement("button");
      tile.className = "tile";
      tile.type = "button";
      puzzleEl.appendChild(tile);
    }
    renderTiles();
    shufflePuzzle();
  }

  puzzleEl.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    const index = Array.from(puzzleEl.children).indexOf(tile);
    pickTile(index);
  });

  if (shuffleBtn) shuffleBtn.addEventListener("click", shufflePuzzle);

  buildPuzzle();
});

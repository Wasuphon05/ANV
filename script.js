// ------- เปลี่ยนหน้า -------
const screens = document.querySelectorAll(".screen");

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if(!btn) return;
  show(btn.dataset.go);
});

// ------- ปุ่มให้อภัย/ไม่ให้อภัย -------
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const btnRow = document.querySelector(".btnRow");

let noClicks = 0;

const growStep = 0.18;     // ความเร็วการโตของปุ่มให้อภัย
const maxNoClicks = 5;     // กดไม่ให้อภัยได้กี่ครั้ง

// เลือกโหมดตอนครบ 5 ครั้ง: "hide" หรือ "behind"
const afterMaxMode = "behind";

function moveNoButton() {
  const rowRect = btnRow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 8;
  const maxX = Math.max(padding, rowRect.width - btnRect.width - padding);
  const maxY = Math.max(padding, rowRect.height - btnRect.height - padding);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";
}

function finishNoButton() {
  if (afterMaxMode === "hide") {
    // แบบ A: หายไปเลย
    noBtn.classList.add("hidden");
    result.textContent = "โอเค ๆ ไม่ให้อภัยหายไปแล้ว 😅 งั้นกดให้อภัยได้เลยนะ";
  } else {
    // แบบ B: ซ่อนหลังปุ่มให้อภัย
    // ย้ายไปตำแหน่งเดียวกับปุ่มให้อภัยและทำให้คลิกไม่ได้
    const yesRect = yesBtn.getBoundingClientRect();
    const rowRect = btnRow.getBoundingClientRect();

    const x = yesRect.left - rowRect.left + 6;  // ขยับนิดให้ “ซ้อน” ดูเนียน
    const y = yesRect.top - rowRect.top + 6;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.opacity = "0.05";
    noBtn.style.pointerEvents = "none"; // กดต่อไม่ได้
    noBtn.style.zIndex = "1";
    yesBtn.style.zIndex = "2";

    result.textContent = "ให้อภัยได้แล้วคั้บบ 🥺 ";
  }
}

noBtn.addEventListener("click", () => {
  noClicks++;

  const scale = 1 + noClicks * growStep;
  yesBtn.style.transform = `scale(${scale})`;

  if (noClicks >= maxNoClicks) {
    finishNoButton();
    return;
  }
  moveNoButton();
});

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (noClicks >= maxNoClicks) return;
  moveNoButton();
}, { passive: false });

yesBtn.addEventListener("click", () => {
  result.textContent = "เย้ กอดๆนะ รักบี๋นะคั้บบ รักที่สุดเลยยย 🤍 ";
  setTimeout(() => show("s4"), 600);
});


// Hämta referenser
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const paletteButtons = document.querySelectorAll('.color-btn');
const clearBtn = document.getElementById('clearCanvas');

let currentColor = '#000000'; // Standardfärg: svart
let drawing = false;

// Anpassa canvasstorlek (t.ex. 90% av viewportens bredd och 60% av höjden)
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.6;
  // Valfritt: Fyll med vit bakgrund om så önskas
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Starta ritningen
function startDrawing(e) {
  drawing = true;
  draw(e); // Starta rita direkt
}

// Avsluta ritningen
function endDrawing() {
  drawing = false;
  ctx.beginPath();
}

// Rita på canvas
function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  let x, y;
  const rect = canvas.getBoundingClientRect();
  
  if (e.touches) {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
  
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Eventlyssnare för mus och touch
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing, {passive: false});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw, {passive: false});
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('touchend', endDrawing);

// Välj färg från paletten
paletteButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-color');
    if (selected === 'eraser') {
      currentColor = '#ffffff'; // Suddgummi: vit
    } else {
      currentColor = selected;
    }
  });
});

// Rensa hela canvasen
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Fyll med vit bakgrund igen
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

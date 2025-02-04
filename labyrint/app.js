// Globala variabler för drag
let activePlayer = null;
let offsetX = 0;
let offsetY = 0;

// Ljud för när man når mål
const successSound = new Audio("../bollar/success.mp3");
let goalReached = false; // För att hindra att ljudet spelas flera gånger

const alertElem = document.querySelector(".alert");

// Kör när sidan är laddad
window.addEventListener("load", () => {
  const startBtn = document.querySelector(".start-btn");
  
  // Lägg på klick-lyssnare för start-knappen
  startBtn.addEventListener("click", function() {
    // Spela upp och pausa ljudet för att "låsa upp" uppspelningen (viktigt på iOS)
    successSound.play()
      .then(() => {
        successSound.pause();
        successSound.currentTime = 0;
      })
      .catch(err => console.log(err));
      
    // Döljer start-overlay
    document.querySelector(".start-overlay").style.display = "none";
    
    // Lägg på event-lyssnare för att kunna initiera drag
    const player = document.querySelector(".player");
    player.addEventListener("mousedown", startDrag);
    player.addEventListener("touchstart", startDrag, { passive: false });
  });
});

// -----------------------------------------------------
//   DRAG & DROP-FUNKTIONER
// -----------------------------------------------------
function startDrag(e) {
  e.preventDefault();

  activePlayer = e.target;

  if (e.type === "touchstart") {
    offsetX = e.touches[0].clientX - activePlayer.offsetLeft;
    offsetY = e.touches[0].clientY - activePlayer.offsetTop;
  } else {
    offsetX = e.clientX - activePlayer.offsetLeft;
    offsetY = e.clientY - activePlayer.offsetTop;
  }

  // Lyssna på förflyttningar och avslut
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function onDrag(e) {
  if (!activePlayer) return;
  e.preventDefault();

  let x, y;
  if (e.type === "touchmove") {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  // Beräkna den nya positionen för spelaren
  const newLeft = x - offsetX;
  const newTop = y - offsetY;

  // Spara nuvarande position ifall vi måste återställa
  const currentLeft = activePlayer.offsetLeft;
  const currentTop = activePlayer.offsetTop;

  // Flytta spelaren tillfälligt
  activePlayer.style.left = newLeft + "px";
  activePlayer.style.top = newTop + "px";

  // Kolla om vi krockar med någon vägg
  if (checkCollisionWithWalls(activePlayer)) {
    // Vid kollision återställ positionen
    activePlayer.style.left = currentLeft + "px";
    activePlayer.style.top = currentTop + "px";
  } else {
    // Om ingen kollision med väggar, kontrollera om målet nåtts
    checkGoalCollision(activePlayer);
  }
}

function endDrag() {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
  activePlayer = null;
}

// -----------------------------------------------------
//   KOLLISIONSKONTROLL VÄGGAR
// -----------------------------------------------------
function checkCollisionWithWalls(player) {
  const walls = document.querySelectorAll(".wall");
  const playerRect = player.getBoundingClientRect();

  // Kontrollera kollision med varje vägg
  for (let wall of walls) {
    const wallRect = wall.getBoundingClientRect();
    if (isColliding(playerRect, wallRect)) {
      return true;
    }
  }
  return false;
}

/**
 * Returnerar true om två rektanglar överlappar
 */
function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// -----------------------------------------------------
//   KOLLISIONSKONTROLL MÅL
// -----------------------------------------------------
function checkGoalCollision(player) {
  if (goalReached) return;

  const goal = document.querySelector(".goal");
  if (!goal) return;

  const playerRect = player.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();

  // Om spelaren överlappar eller nuddar målet, anses målet vara nått
  if (isColliding(playerRect, goalRect)) {
    successSound.play().catch(err => console.log(err));
    goalReached = true;

    if (alertElem) {
      alertElem.style.display = "block";
    }
  }
}

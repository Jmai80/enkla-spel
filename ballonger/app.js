// Hur många ballonger vill du skapa?
const NUM_BALLOONS = 5; 

// Referenser
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const winningMessage = document.getElementById("winningMessage");

// Ljud (valfritt)
const popSound = new Audio("pop.mp3");
const successSound = new Audio("../bollar/success.mp3");

// Antal ballonger som återstår
let balloonsRemaining = 0;

// Starta spelet när man klickar på knappen
startBtn.addEventListener("click", startGame);

function startGame() {
  // Dölj ev. vinn-meddelande
  winningMessage.style.display = "none";

  // Rensa spelområdet 
  gameArea.innerHTML = ""; 

  // Sätt hur många ballonger vi ska skapa
  balloonsRemaining = NUM_BALLOONS;

  // Skapa ballonger
  for (let i = 0; i < NUM_BALLOONS; i++) {
    createBalloon();
  }
}

// Skapa en ballong i spelområdet
function createBalloon() {
  // Ballongens element
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Slumpa en position inom gameArea
  const areaWidth = gameArea.offsetWidth;
  const areaHeight = gameArea.offsetHeight;

  const randomX = Math.random() * (areaWidth - 60);  // 60px är ballongens bredd
  const randomY = Math.random() * (areaHeight - 80); // 80px är ballongens höjd

  balloon.style.left = randomX + "px";
  balloon.style.top = randomY + "px";

  // (Valfritt) Slumpa en färg 
  const colors = ["#ff69b4", "#ff6347", "#6a5acd", "#ff8c00", "#008b8b"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.backgroundColor = randomColor;

  // Lägg lyssnare för klick/touch => "poppa" ballongen
  balloon.addEventListener("click", popBalloon);
  balloon.addEventListener("touchstart", popBalloon, { passive: true });

  // Lägg till i spelområdet
  gameArea.appendChild(balloon);
}

// När man klickar på en ballong
function popBalloon(e) {
  const balloon = e.currentTarget;

  // Spela pop-ljud (om det finns)
  if (popSound) {
    popSound.currentTime = 0;
    popSound.play().catch(err => console.log(err));
  }

  // Ta bort ballongen från DOM
  balloon.remove();

  // Minska räknaren med 1
  balloonsRemaining--;
  // Kolla om alla poppats
  if (balloonsRemaining <= 0) {
    endGame();
  }
}

// När alla ballonger är borta
function endGame() {
  // Spela success-ljud (om det finns)
  if (successSound) {
    successSound.currentTime = 0;
    successSound.play().catch(err => console.log(err));
  }
  // Visa en “Grattis”-ruta 
  winningMessage.style.display = "block";
}

// ----------------------
//       Ljud-filer
// ----------------------
const succesSound = new Audio("success.mp3");
const doubleGoalSound = new Audio("win.mp3");
const clickSound = new Audio("click.mp3");

// ----------------------
//  Globala variabler
// ----------------------
let hasPlayedDoubleGoalAlert = false; 
let hasPlayedSuccessSoundForBallOne = false;
let hasPlayedSuccessSoundForBallTwo = false;

let activeBall = null; // Håller koll på vilken boll som dras just nu
let offsetX = 0;
let offsetY = 0;

const startButton = document.getElementById("startBtn");
// ----------------------
//       Spelets logik
// ----------------------
function checkForGoals() {
  const redGoal = document.getElementById("redGoal");
  const blueGoal = document.getElementById("blueGoal");
  const ballOne = document.getElementById("ballOne");
  const ballTwo = document.getElementById("ballTwo");

  // Kontrollera om ballOne är i redGoal
  if (isGoal(ballOne, redGoal) && !hasPlayedSuccessSoundForBallOne) {
    console.log("ballOne är i redGoal!");
    succesSound.play();
    hasPlayedSuccessSoundForBallOne = true;
    lockBall(ballOne);
  }

  // Kontrollera om ballTwo är i blueGoal
  if (isGoal(ballTwo, blueGoal) && !hasPlayedSuccessSoundForBallTwo) {
    console.log("ballTwo är i blueGoal!");
    succesSound.play();
    hasPlayedSuccessSoundForBallTwo = true;
    lockBall(ballTwo);
  }

  // Kontrollera om båda bollarna är i sina respektive mål
  if (isGoal(ballOne, redGoal) && isGoal(ballTwo, blueGoal) && !hasPlayedDoubleGoalAlert) {
    console.log("Båda bollarna är i sina mål!");
    doubleGoalSound.play();
    showWinningAlert();
    hasPlayedDoubleGoalAlert = true;
  }

  // Återställ om bollen/bollarna flyttas ut från målen (om du vill tillåta att de dras ut igen)
  if (!isGoal(ballOne, redGoal)) {
    hasPlayedSuccessSoundForBallOne = false;
    // unlockBall(ballOne); // Om du vill att den ska kunna flyttas igen
  }
  if (!isGoal(ballTwo, blueGoal)) {
    hasPlayedSuccessSoundForBallTwo = false;
    // unlockBall(ballTwo);
  }
  if (!isGoal(ballOne, redGoal) || !isGoal(ballTwo, blueGoal)) {
    hasPlayedDoubleGoalAlert = false;
  }
}

// Låser en boll så att den inte kan flyttas mer
function lockBall(ball) {
  ball.removeEventListener("mousedown", startDrag);
  ball.removeEventListener("touchstart", startDrag);
  ball.style.pointerEvents = "none";

  // Avbryter pågående drag
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
}

// (Valfritt) Låser upp en boll om du vill kunna flytta den igen
function unlockBall(ball) {
  ball.addEventListener("mousedown", startDrag);
  ball.addEventListener("touchstart", startDrag);
  ball.style.pointerEvents = "auto";
}

// Kollar om en boll är helt inne i sitt mål
function isGoal(ball, goal) {
  const ballRect = ball.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();

  return (
    ballRect.left   >= goalRect.left   &&
    ballRect.right  <= goalRect.right  &&
    ballRect.top    >= goalRect.top    &&
    ballRect.bottom <= goalRect.bottom
  );
}

// ----------------------
//   Drag-and-Drop
// ----------------------
function startDrag(e) {
  e.preventDefault();
  activeBall = e.target;

  if (e.type === "touchstart") {
    offsetX = e.touches[0].clientX - activeBall.offsetLeft;
    offsetY = e.touches[0].clientY - activeBall.offsetTop;
  } else {
    offsetX = e.clientX - activeBall.offsetLeft;
    offsetY = e.clientY - activeBall.offsetTop;
  }

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function onDrag(e) {
  if (!activeBall) return;
  e.preventDefault();

  let x, y;
  if (e.type === "touchmove") {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  activeBall.style.left = (x - offsetX) + "px";
  activeBall.style.top  = (y - offsetY) + "px";
}

function endDrag() {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
  activeBall = null;
}

// ----------------------
//   Start-knapp & init
// ----------------------
function initGame() {
  const ballOne = document.getElementById("ballOne");
  const ballTwo = document.getElementById("ballTwo");

  // Lägg event-lyssnare på bollar
  ballOne.addEventListener("mousedown", startDrag);
  ballOne.addEventListener("touchstart", startDrag);

  ballTwo.addEventListener("mousedown", startDrag);
  ballTwo.addEventListener("touchstart", startDrag);

  // Börja kontinuerligt kolla mål
  setInterval(checkForGoals, 100);
}

// Denna funktion anropas när du klickar på "Start Game"-knappen
function startGame() {
    clickSound.play();
    startButton.style.display = "none"; // Göm start-knappen
  // Försök spela och pausa ljuden en gång för att "låsa upp" ljud i iOS Safari
  succesSound.play().then(() => {
    succesSound.pause();
    succesSound.currentTime = 0;
  }).catch(err => {
    console.log("Kunde inte spela upp successSound:", err);
  });

  doubleGoalSound.play().then(() => {
    doubleGoalSound.pause();
    doubleGoalSound.currentTime = 0;
  }).catch(err => {
    console.log("Kunde inte spela upp doubleGoalSound:", err);
  });

  // Nu är ljuden aktiverade på iOS, så vi kan starta spelet
  initGame();
}

// ----------------------
//   Visar vinst-meddelande
// ----------------------
function showWinningAlert() {
  let alertElem = document.getElementById("alert");
  alertElem.style.display = "block"; // Gör alerten synlig (du kanske har style="display:none" i CSS)
}

// ----------------------
//  Koppla start-knapp
// ----------------------
window.addEventListener("load", () => {
     //Slumpa positioner direkt vid sidladdning
  randomizeBallPositions();
  startButton.addEventListener("click", startGame);
});

function randomizeBallPositions() {
    const ballOne = document.getElementById("ballOne");
    const ballTwo = document.getElementById("ballTwo");
  
    // Hämta skärmens bredd/höjd
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
  
    // Hur stort område vill du ha kring mitten?
    const boundary = 200; // 200px åt varje håll runt mitten
  
    // Räkna ut mittpunkten
    const centerX = maxWidth / 2;
    const centerY = maxHeight / 2;
  
    // ----------------------
    //  Slumpa för ballOne
    // ----------------------
    const ballOneWidth = ballOne.offsetWidth;
    const ballOneHeight = ballOne.offsetHeight;
  
    // Minsta och största X/Y som bollens översta vänstra hörn kan ha
    // så att bollen fortfarande hamnar inom "boundary"-rutan
    const minX1 = centerX - boundary;
    const maxX1 = centerX + boundary - ballOneWidth;
    const minY1 = centerY - boundary;
    const maxY1 = centerY + boundary - ballOneHeight;
  
    // Se till att min-värden inte blir större än max-värden (t.ex. på väldigt små skärmar)
    // I de flesta fall räcker det såhär:
  
    // Slumpa fram en position inom intervallet [min, max]
    const randomX1 = minX1 + Math.random() * (maxX1 - minX1);
    const randomY1 = minY1 + Math.random() * (maxY1 - minY1);
  
    // Sätt bollens position
    ballOne.style.left = randomX1 + "px";
    ballOne.style.top  = randomY1 + "px";
  
    // ----------------------
    //  Slumpa för ballTwo
    // ----------------------
    const ballTwoWidth = ballTwo.offsetWidth;
    const ballTwoHeight = ballTwo.offsetHeight;
  
    const minX2 = centerX - boundary;
    const maxX2 = centerX + boundary - ballTwoWidth;
    const minY2 = centerY - boundary;
    const maxY2 = centerY + boundary - ballTwoHeight;
  
    const randomX2 = minX2 + Math.random() * (maxX2 - minX2);
    const randomY2 = minY2 + Math.random() * (maxY2 - minY2);
  
    ballTwo.style.left = randomX2 + "px";
    ballTwo.style.top  = randomY2 + "px";
  }
  
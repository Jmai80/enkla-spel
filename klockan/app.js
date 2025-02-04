// Referenser till HTML-element
const timeTextEl = document.getElementById("timeText");
const clockOptionsContainer = document.querySelector(".clock-options");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let correctTime = null; // Objekt { hour, minute }

// Starta spelet när sidan laddas
window.addEventListener("load", initGame);

function initGame() {
  // Generera en slumpad tid (endast hel- eller halvtimme)
  const hour = getRandomInt(1, 12);
  const minute = Math.random() < 0.5 ? 0 : 30;
  correctTime = { hour, minute };

  // Visa tidsfrasen
  timeTextEl.textContent = generateTimeText(correctTime);

  // Generera tre alternativ: en korrekt och två felaktiga
  const options = [correctTime];
  while (options.length < 3) {
    const randTime = generateRandomTime();
    if (!timeEquals(randTime, correctTime) && !options.some(t => timeEquals(t, randTime))) {
      options.push(randTime);
    }
  }
  // Blanda alternativen
  shuffleArray(options);

  // Töm container och skapa klockelement
  clockOptionsContainer.innerHTML = "";
  options.forEach(time => {
    const clockEl = createClockElement(time);
    clockEl.addEventListener("click", () => handleClockClick(clockEl, time));
    clockOptionsContainer.appendChild(clockEl);
  });
}

// Generera tidsfrasen (t.ex. "Klockan två" eller "Halv sex")
function generateTimeText(time) {
  const hourWords = {
    1: "ett",
    2: "två",
    3: "tre",
    4: "fyra",
    5: "fem",
    6: "sex",
    7: "sju",
    8: "åtta",
    9: "nio",
    10: "tio",
    11: "elva",
    12: "tolv"
  };

  if (time.minute === 0) {
    return "Klockan " + hourWords[time.hour];
  } else {
    // För halvtimme: "Halv" + nästa timme (t.ex. 5:30 blir "Halv sex")
    const nextHour = time.hour % 12 + 1;
    return "Halv " + hourWords[nextHour];
  }
}

// Generera en slumpad tid (hel- eller halvtimme)
function generateRandomTime() {
  const hour = getRandomInt(1, 12);
  const minute = Math.random() < 0.5 ? 0 : 30;
  return { hour, minute };
}

// Returnerar ett slumptal mellan min och max (inklusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Jämför två tidobjekt
function timeEquals(t1, t2) {
  return t1.hour === t2.hour && t1.minute === t2.minute;
}

// Skapa ett klock-element (div) baserat på tid
function createClockElement(time) {
  const clock = document.createElement("div");
  clock.classList.add("clock");

  // Skapa timvisaren
  const hourHand = document.createElement("div");
  hourHand.classList.add("hand", "hour-hand");
  clock.appendChild(hourHand);

  // Skapa minutvisaren
  const minuteHand = document.createElement("div");
  minuteHand.classList.add("hand", "minute-hand");
  clock.appendChild(minuteHand);

  // Lägg till siffror (1 till 12) på urtavlan
  for (let i = 1; i <= 12; i++) {
    const numEl = document.createElement("div");
    numEl.classList.add("clock-number");
    numEl.textContent = i;
    // Beräkna positionen baserat på cirkelns mitt (75, 75) och en vald radie (t.ex. 60px)
    const angle = (i * 30 - 90) * Math.PI / 180;
    const radius = 60;
    const centerX = 75;
    const centerY = 75;
    const x = centerX + radius * Math.cos(angle) - 10; // 10 = halva bredden på numret (20px)
    const y = centerY + radius * Math.sin(angle) - 10;
    numEl.style.left = x + "px";
    numEl.style.top = y + "px";
    clock.appendChild(numEl);
  }

  // Ställ in visarnas rotation baserat på tid
  setClockHands(clock, time);

  return clock;
}

// Sätt rotation för tim- och minutvisare
function setClockHands(clock, time) {
  const minuteAngle = time.minute === 0 ? 0 : 180;
  const hourAngle = ((time.hour % 12) * 30) + (time.minute === 30 ? 15 : 0);

  const hourHand = clock.querySelector(".hour-hand");
  const minuteHand = clock.querySelector(".minute-hand");

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
}

// Hantera klick på ett klockalternativ
function handleClockClick(clockEl, time) {
  if (timeEquals(time, correctTime)) {
    clockEl.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play().catch(err => console.log(err));
    setTimeout(initGame, 1000);
  } else {
    clockEl.classList.add("wrong");
    wrongSound.currentTime = 0;
    wrongSound.play().catch(err => console.log(err));
  }
}

// Fisher-Yates-algoritm för att blanda en array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

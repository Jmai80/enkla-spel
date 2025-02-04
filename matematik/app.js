// Hämta referenser till HTML-element
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const answerBtns = document.querySelectorAll(".answer-btn");

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// Här sparas det korrekta svaret
let correctAnswer = 0;

// När sidan laddas
window.addEventListener("load", initGame);

// Initiera spelet (skapa nya tal + svarsalternativ)
function initGame() {
  // Slumpa två ental (0-9)
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);

  // Visa talen i HTML
  num1El.textContent = num1;
  num2El.textContent = num2;

  // Beräkna rätt svar
  correctAnswer = num1 + num2;

  // Skapa en array med svar: 1 korrekt, 2 felaktiga
  const answers = [];
  answers.push(correctAnswer);

  // Lägg till två slumpade felaktiga svar (mellan 0 och 18 ex.)
  while (answers.length < 3) {
    let wrong = Math.floor(Math.random() * 19); 
    // Se till att fel svar inte är samma som rätt eller duplicerat
    if (wrong !== correctAnswer && !answers.includes(wrong)) {
      answers.push(wrong);
    }
  }

  // Blanda alternativen slumpmässigt
  shuffleArray(answers);

  // Tilldela varje knapp ett av svaren
  answerBtns.forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.dataset.answer = answers[i];
    
    // Rensa ev. tidigare klasser
    btn.classList.remove("correct", "wrong");

    // Lyssna på klick => kolla om rätt/fel
    btn.addEventListener("click", handleAnswer);
  });
}

// Funktion för klick på svarsalternativ
function handleAnswer(e) {
  const chosenAnswer = Number(e.target.dataset.answer);

  if (chosenAnswer === correctAnswer) {
    // Rätt svar
    e.target.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play().catch(err => console.log(err));

    // Starta nytt “tal” efter kort fördröjning
    setTimeout(initGame, 1000);
  } else {
    // Fel svar
    e.target.classList.add("wrong");
    wrongSound.currentTime = 0;
    wrongSound.play().catch(err => console.log(err));
  }
}

// Liten hjälp-funktion för att blanda en array (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
}

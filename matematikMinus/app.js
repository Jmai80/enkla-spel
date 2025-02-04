// Hämta referenser till HTML-elementen
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const answerBtns = document.querySelectorAll(".answer-btn");

const correctSound = new Audio("../matematik/correct.mp3");
const wrongSound = new Audio("../matematik/wrong.mp3");

let correctAnswer = 0;

// Starta spelet när sidan laddas
window.addEventListener("load", initGame);

function initGame() {
  // Slumpa två ental där det första talet (a) är >= det andra (b)
  const a = Math.floor(Math.random() * 10);      // a: 0–9
  const b = Math.floor(Math.random() * (a + 1));   // b: 0–a
  num1El.textContent = a;
  num2El.textContent = b;
  
  // Räkna ut korrekt svar
  correctAnswer = a - b;

  // Skapa en array med svar: 1 korrekt, 2 felaktiga
  const answers = [];
  answers.push(correctAnswer);

  // Generera två unika felaktiga svar
  while (answers.length < 3) {
    // Här väljer vi ett fel svar mellan 0 och 9 (justera intervallet om så önskas)
    let wrong = Math.floor(Math.random() * 10);
    if (wrong !== correctAnswer && !answers.includes(wrong)) {
      answers.push(wrong);
    }
  }

  // Blanda svarsalternativen
  shuffleArray(answers);

  // Tilldela varje knapp ett svar och rensa tidigare klasser
  answerBtns.forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.dataset.answer = answers[i];
    btn.classList.remove("correct", "wrong");
    btn.removeEventListener("click", handleAnswer); // Ta bort gamla lyssnare om de finns
    btn.addEventListener("click", handleAnswer);
  });
}

function handleAnswer(e) {
  const chosenAnswer = Number(e.target.dataset.answer);
  
  if (chosenAnswer === correctAnswer) {
    // Rätt svar: markera knappen grön och spela upp rätt ljud
    e.target.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play().catch(err => console.log(err));

    // Starta ett nytt tal efter en kort fördröjning
    setTimeout(initGame, 1000);
  } else {
    // Fel svar: markera knappen röd och spela fel ljud
    e.target.classList.add("wrong");
    wrongSound.currentTime = 0;
    wrongSound.play().catch(err => console.log(err));
  }
}

// Fisher-Yates-algoritm för att blanda en array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
}

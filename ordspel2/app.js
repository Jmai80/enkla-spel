// Fråge-array med ord (substantiv) och korrekt emoji (bild)
const questions = [
    { word: "hund", correct: "🐶" },
    { word: "katt", correct: "😺" },
    { word: "bil", correct: "🚗" },
    { word: "sol", correct: "☀️" },
    { word: "måne", correct: "🌙" },
    { word: "taxi", correct: "🚕" },
    { word: "räv", correct: "🦊" },
    { word: "bi", correct: "🐝" },
    { word: "öga", correct: "👁️" },
    { word: "hand", correct: "🤚" },
    { word: "sko", correct: "👞" },
    { word: "ros", correct: "🌹" },
    { word: "anka", correct: "🪿" },
    { word: "uggla", correct: "🦉" },
    { word: "gris", correct: "🐷" },
    { word: "gran", correct: "🌲" },
    { word: "älg", correct: "🫎" },
    { word: "boll", correct: "⚽️" },
    { word: "orm", correct: "🐍" },
    { word: "keps", correct: "🧢" },
    { word: "apa", correct: "🐒" },
    { word: "tupp", correct: "🐓" },
    { word: "eld", correct: "🔥" },
    { word: "ägg", correct: "🥚" },
    { word: "majs", correct: "🌽" },
    { word: "ost", correct: "🧀" },
    { word: "båt", correct: "⛵️" },
    { word: "yxa", correct: "🪓" },
  ];
  
  // Pool för att hämta felaktiga svar (ord)
  const wordPool = questions.map(q => q.word);
  
  let currentQuestion = null;
  let correctAnswer = "";
  let options = [];
  
  const questionImageEl = document.getElementById("questionImage");
  const answerBtns = document.querySelectorAll(".answer-btn");
  const feedbackEl = document.getElementById("feedback");
  
  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");
  
  // Initiera spelet när sidan laddas
  initGame();
  
  function initGame() {
    // Nollställ feedback och rensa eventuella klassmarkeringar
    feedbackEl.textContent = "";
    answerBtns.forEach(btn => btn.classList.remove("correct", "wrong"));
    
    // Välj en slumpad fråga
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    correctAnswer = currentQuestion.word;
    
    // Visa bilden (emoji) för frågan
    questionImageEl.textContent = currentQuestion.correct;
    
    // Generera två felaktiga alternativ
    let wrongOptions = [];
    while (wrongOptions.length < 2) {
      let candidate = wordPool[Math.floor(Math.random() * wordPool.length)];
      if (candidate !== correctAnswer && !wrongOptions.includes(candidate)) {
        wrongOptions.push(candidate);
      }
    }
    
    // Kombinera korrekt svar med de felaktiga och blanda ordningen
    options = [correctAnswer, ...wrongOptions];
    shuffleArray(options);
    
    // Tilldela svarsalternativen till knapparna
    answerBtns.forEach((btn, i) => {
      btn.textContent = options[i];
      btn.dataset.answer = options[i];
      btn.onclick = handleAnswer;
    });
  }
  
  function handleAnswer(e) {
    const chosen = e.currentTarget.dataset.answer;
    if (chosen === correctAnswer) {
      e.currentTarget.classList.add("correct");
      correctSound.currentTime = 0;
      correctSound.play().catch(err => console.log(err));
      feedbackEl.textContent = "Rätt!";
      setTimeout(initGame, 1000);
    } else {
      e.currentTarget.classList.add("wrong");
      wrongSound.currentTime = 0;
      wrongSound.play().catch(err => console.log(err));
      feedbackEl.textContent = "Försök igen!";
    }
  }
  
  // Fisher-Yates shuffle-algoritm för att blanda en array
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
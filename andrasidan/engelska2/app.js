
  let currentWordIndex = 0;
  let score = 0;
  let errors = 0;
  let timer;
  let timeLeft = 10;
  
  const wordDisplay = document.getElementById("word-display");
  const optionsContainer = document.getElementById("options");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score");
  const errorsDisplay = document.getElementById("errors");
  const popup = document.getElementById("popup");
  const finalScoreDisplay = document.getElementById("final-score");
  
  // Starta spelet
  function startGame() {
    // Blanda frågorna så att de visas i slumpmässig ordning
    shuffleArray(words);
    
    currentWordIndex = 0;
    score = 0;
    errors = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    errorsDisplay.textContent = errors;
    popup.style.display = "none";
    document.querySelector(".game-container").classList.remove("blur");
    loadWord();
    startTimer();
  }
  
  // Fisher–Yates-algoritmen för att blanda en array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Ladda ett ord och skapa fem unika svarsalternativ
  function loadWord() {
    const currentWord = words[currentWordIndex];
    wordDisplay.textContent = currentWord.sv;
    
    // Skapa en array med det korrekta svaret
    const options = [currentWord.en];
    
    // Lägg till slumpade, unika felalternativ
    while (options.length < 5) {
      const randomAnswer = words[Math.floor(Math.random() * words.length)].en;
      if (!options.includes(randomAnswer)) {
        options.push(randomAnswer);
      }
    }
    
    // Blanda svarsalternativen med Fisher–Yates
    shuffleArray(options);
    
    // Rensa tidigare alternativ och skapa nya knappar
    optionsContainer.innerHTML = "";
    options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", function() {
        handleAnswerClick(this, option, currentWord.en);
      });
      optionsContainer.appendChild(button);
    });
  }
  
  // Hantera användarens svar
  function handleAnswerClick(clickedButton, selectedAnswer, correctAnswer) {
    // Inaktivera alla svarsknappar
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
    clearInterval(timer);
    
    if (selectedAnswer === correctAnswer) {
      score++;
      scoreDisplay.textContent = score;
      clickedButton.style.backgroundColor = "green";
    } else {
      errors++;
      errorsDisplay.textContent = errors;
      if (clickedButton) {
        clickedButton.style.backgroundColor = "red";
      }
      // Markera det korrekta svaret
      Array.from(optionsContainer.children).forEach(btn => {
        if (btn.textContent === correctAnswer) {
          btn.style.backgroundColor = "green";
        }
      });
    }
    
    // Vänta en sekund innan nästa ord
    setTimeout(() => {
      if (errors >= 5) {
        endGame();
      } else {
        currentWordIndex++;
        if (currentWordIndex < words.length) {
          timeLeft = 10;
          startTimer();
          loadWord();
        } else {
          endGame();
        }
      }
    }, 1000);
  }
  
  // Starta nedräkningen
  function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        // Tiden är slut – behandla som fel svar
        handleAnswerClick(null, "", words[currentWordIndex].en);
      }
    }, 1000);
  }
  
  // Avsluta spelet och visa popup med slutresultat samt en omstart-knapp
  function endGame() {
    clearInterval(timer);
    document.querySelector(".game-container").classList.add("blur");
    popup.style.display = "flex";
    finalScoreDisplay.textContent = score;
    
    // Skapa omstartsknapp om den inte redan finns
    if (!document.getElementById("restart-button")) {
      const restartButton = document.createElement("button");
      restartButton.id = "restart-button";
      restartButton.textContent = "Spela igen!";
      restartButton.addEventListener("click", restartGame);
      popup.querySelector(".popup-content").appendChild(restartButton);
    }
  }
  
  // Återställ spelet
  function restartGame() {
    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.remove();
    }
    startGame();
  }
  
  // Lyssna på startknappen på startskärmen
  document.getElementById("start-button").addEventListener("click", function() {
    // Döljer startskärmen
    document.getElementById("start-screen").style.display = "none";
    // Startar spelet
    startGame();
  });
  
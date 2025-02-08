document.addEventListener("DOMContentLoaded", () => {
    // Hämta referenser till knappar och nivådisplay
    const simonButtons = {
      red: document.getElementById("red"),
      green: document.getElementById("green"),
      blue: document.getElementById("blue"),
      yellow: document.getElementById("yellow")
    };
    const levelDisplay = document.getElementById("levelDisplay");
  
    // Skapa Audio-objekt för varje färg
    const sounds = {
      red: new Audio("red.mp3"),
      green: new Audio("green.mp3"),
      blue: new Audio("blue.mp3"),
      yellow: new Audio("yellow.mp3")
    };
  
    const buttonColors = ["red", "green", "blue", "yellow"];
    let sequence = [];
    let userSequence = [];
    let level = 1;
    let acceptingInput = false;
  
    // Uppdatera nivådisplayen
    function updateLevelDisplay() {
      levelDisplay.textContent = "Nivå: " + level;
    }
  
    // Starta spelet
    function startGame() {
      sequence = [];
      level = 1;
      nextLevel();
    }
  
    // Gå vidare till nästa nivå
    function nextLevel() {
      userSequence = [];
      updateLevelDisplay();
      // Lägg till en slumpmässig färg i sekvensen
      const randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
      sequence.push(randomColor);
      playSequence();
    }
  
    // Spela upp sekvensen med blinkande knappar och ljud
    function playSequence() {
      acceptingInput = false;
      let delay = 0;
      sequence.forEach((color) => {
        setTimeout(() => {
          flashButton(color);
        }, delay);
        delay += 600; // Tid för varje blink
      });
      setTimeout(() => {
        acceptingInput = true;
      }, delay);
    }
  
    // Blinkar en knapp och spelar ljud
    function flashButton(color) {
      const button = simonButtons[color];
      if (!button) return;
      button.classList.add("active");
      playSound(color);
      setTimeout(() => {
        button.classList.remove("active");
      }, 300);
    }
  
    // Lyssna på klick för användarens input
    Object.keys(simonButtons).forEach(color => {
      simonButtons[color].addEventListener("click", () => {
        if (!acceptingInput) return;
        userSequence.push(color);
        flashButton(color);
        checkUserInput(userSequence.length - 1);
      });
    });
  
    // Kontrollera användarens input
    function checkUserInput(currentIndex) {
      if (userSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
      }
      if (userSequence.length === sequence.length) {
        setTimeout(() => {
          level++;
          nextLevel();
        }, 1000);
      }
    }
  
    // Game over
    function gameOver() {
      alert("Fel! Spelet är över. Du nådde nivå " + level);
      startGame();
    }
  
    // Spela upp ljudet för en given färg
    function playSound(color) {
      if (sounds[color]) {
        // Återställ ljudet så att det kan spelas upp från början
        sounds[color].currentTime = 0;
        sounds[color].play().catch(err => console.log(err));
      }
    }
  
    // Starta spelet direkt
    startGame();
  });
  
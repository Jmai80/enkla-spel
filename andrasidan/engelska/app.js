document.addEventListener("DOMContentLoaded", () => {
    const questionArea = document.getElementById("questionArea");
    const optionsContainer = document.getElementById("optionsContainer");
    const timerEl = document.getElementById("timer");
    const correctCountEl = document.getElementById("correctCount");
    const wrongCountEl = document.getElementById("wrongCount");
  
    let correctCount = 0;
    let wrongCount = 0;
    let currentQuestion = null;
    let roundTimer = null;
    let timeLeft = 10;
    let gameLocked = false; // Flagga för att låsa spelet
  
    // Fråge-array med ca 100 ord (engelska och svenska)
    const questions = [
      { english: "tree", swedish: "träd" },
      { english: "pine", swedish: "tall" },
      { english: "house", swedish: "hus" },
      { english: "dog", swedish: "hund" },
      { english: "cat", swedish: "katt" },
      { english: "sun", swedish: "sol" },
      { english: "moon", swedish: "måne" },
      { english: "car", swedish: "bil" },
      { english: "flower", swedish: "blomma" },
      { english: "apple", swedish: "äpple" },
      { english: "book", swedish: "bok" },
      { english: "water", swedish: "vatten" },
      { english: "fire", swedish: "eld" },
      { english: "bird", swedish: "fågel" },
      { english: "pen", swedish: "penna" },
      { english: "chair", swedish: "stol" },
      { english: "table", swedish: "bord" },
      { english: "school", swedish: "skola" },
      { english: "computer", swedish: "dator" },
      { english: "phone", swedish: "telefon" },
      { english: "clock", swedish: "klocka" },
      { english: "window", swedish: "fönster" },
      { english: "door", swedish: "dörr" },
      { english: "road", swedish: "väg" },
      { english: "city", swedish: "stad" },
      { english: "river", swedish: "flod" },
      { english: "mountain", swedish: "berg" },
      { english: "forest", swedish: "skog" },
      { english: "sea", swedish: "hav" },
      { english: "star", swedish: "stjärna" },
      { english: "sweater", swedish: "tröja" },
      { english: "sibling", swedish: "syskon" },
      { english: "hedgehog", swedish: "igelkott" },
      { english: "queen", swedish: "drottning" },
      { english: "uncle", swedish: "farbror" },
      { english: "crow", swedish: "kråka" },
      { english: "magpie", swedish: "skata" },
      { english: "raven", swedish: "korp" },
      { english: "liquid", swedish: "vätska" },
      { english: "moose", swedish: "älg" },
      { english: "slipper", swedish: "toffla" },
      { english: "ball", swedish: "boll" },
      { english: "doll", swedish: "docka" },
      { english: "toy", swedish: "leksak" },
      { english: "game", swedish: "spel" },
      { english: "pencil", swedish: "blyertspenna" },
      { english: "paper", swedish: "papper" },
      { english: "carpet", swedish: "matta" },
      { english: "bed", swedish: "säng" },
      { english: "cup", swedish: "kopp" },
      { english: "plate", swedish: "tallrik" },
      { english: "fork", swedish: "gaffel" },
      { english: "knife", swedish: "kniv" },
      { english: "spoon", swedish: "sked" },
      { english: "bottle", swedish: "flaska" },
      { english: "shirt", swedish: "skjorta" },
      { english: "pants", swedish: "byxor" },
      { english: "hat", swedish: "hatt" },
      { english: "glove", swedish: "handske" },
      { english: "socks", swedish: "strumpor" },
      { english: "shoes", swedish: "skor" },
      { english: "rain", swedish: "regn" },
      { english: "cloud", swedish: "moln" },
      { english: "sky", swedish: "himmel" },
      { english: "earth", swedish: "jord" },
      { english: "flowerpot", swedish: "blomkruka" },
      { english: "garden", swedish: "trädgård" },
      { english: "bush", swedish: "buske" },
      { english: "grass", swedish: "gräs" },
      { english: "leaf", swedish: "löv" },
      { english: "branch", swedish: "gren" },
      { english: "rock", swedish: "sten" },
      { english: "sand", swedish: "sand" },
      { english: "waterfall", swedish: "vattenfall" },
      { english: "island", swedish: "ö" },
      { english: "bridge", swedish: "bro" },
      { english: "bus", swedish: "buss" },
      { english: "train", swedish: "tåg" },
      { english: "plane", swedish: "flygplan" },
      { english: "boat", swedish: "båt" },
      { english: "ship", swedish: "skepp" },
      { english: "ferry", swedish: "färja" },
      { english: "path", swedish: "stig" },
      { english: "field", swedish: "fält" },
      { english: "farm", swedish: "gård" },
      { english: "cow", swedish: "ko" },
      { english: "pig", swedish: "gris" },
      { english: "sheep", swedish: "får" },
      { english: "goat", swedish: "get" },
      { english: "chicken", swedish: "kyckling" },
      { english: "rooster", swedish: "tupp" },
      { english: "horse", swedish: "häst" },
      { english: "donkey", swedish: "åsna" },
      { english: "camel", swedish: "kamel" },
      { english: "elephant", swedish: "elefant" },
      { english: "giraffe", swedish: "giraff" },
      { english: "monkey", swedish: "apa" },
      { english: "bear", swedish: "björn" },
      { english: "lion", swedish: "lejon" },
      { english: "tiger", swedish: "tiger" }
    ];
  
    function startRound() {
      clearInterval(roundTimer);
      gameLocked = false; // Lås upp spelet när en ny runda startar
      timeLeft = 10;
      timerEl.textContent = timeLeft;
  
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
      questionArea.textContent = currentQuestion.english;
  
      let options = [currentQuestion.swedish];
      while (options.length < 3) {
        let candidate = questions[Math.floor(Math.random() * questions.length)].swedish;
        if (!options.includes(candidate)) {
          options.push(candidate);
        }
      }
      options = shuffleArray(options);
  
      optionsContainer.innerHTML = "";
      options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => handleAnswer(opt));
        optionsContainer.appendChild(btn);
      });
  
      roundTimer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(roundTimer);
          wrongCount++;
          wrongCountEl.textContent = "fel: " + wrongCount;
          if (wrongCount >= 5) {
            showPopup();
          } else {
            setTimeout(startRound, 2000);
          }
        }
      }, 1000);
    }
  
    function handleAnswer(selected) {
        // Om spelet redan är låst (t.ex. tidigare klick registrerats) ignoreras klicket.
        if (gameLocked) return;
        
        // Lås spelet omedelbart för att undvika flera klick
        gameLocked = true;
        
        // Rensa nedräkningstimer
        clearInterval(roundTimer);
        
        // Inaktivera alla svarsknappar för att förhindra extra klick
        const buttons = optionsContainer.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = true);
        
        // Kontrollera svaret
        if (selected === currentQuestion.swedish) {
          correctCount++;
          correctCountEl.textContent = "rätt: " + correctCount;
        } else {
          wrongCount++;
          wrongCountEl.textContent = "fel: " + wrongCount;
        }
        
        // Om felcount når 5, visa popup och lås spelet
        if (wrongCount >= 5) {
          showPopup();
        } else {
          // Om inte, vänta 2 sekunder och starta en ny runda
          setTimeout(() => {
            // Innan vi startar en ny runda, lås upp spelet igen
            gameLocked = false;
            startRound();
          }, 2000);
        }
      }
      
  
      function showPopup() {
        // Lås spelet, inga fler klick accepteras
        gameLocked = true;
        
        const popup = document.createElement("div");
        popup.id = "resultPopup";
        popup.innerHTML = `<p>Grattis, du fick ${correctCount} rätt!</p><button id="restartButton">Spela igen!</button>`;
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "#fff";
        popup.style.padding = "20px";
        popup.style.border = "2px solid #000";
        popup.style.borderRadius = "8px";
        popup.style.zIndex = "300";
        popup.style.color = "dodgerblue";
        
        document.body.appendChild(popup);
      
        // Hämta restart-knappen och centrera den
        const restartButton = popup.querySelector("button");
        restartButton.style.padding = "10px 20px";
        restartButton.style.backgroundColor = "rgba(0, 128, 0, 0.7)";
        restartButton.style.borderRadius = "8px";
        restartButton.style.display = "block";
        restartButton.style.margin = "20px auto 0"; // Toppen 20px, auto vänster/höger, 0 botten
      
        restartButton.addEventListener("click", () => {
          // Återställ poängen
          correctCount = 0;
          wrongCount = 0;
          correctCountEl.textContent = "rätt: 0";
          wrongCountEl.textContent = "fel: 0";
          popup.remove();
          startRound();
        });
      }
      
  
    function shuffleArray(arr) {
      let array = arr.slice();
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    startRound();
  });
  
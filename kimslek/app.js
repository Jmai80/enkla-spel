document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const timerEl = document.getElementById("timer");
    const subHeadingEl = document.getElementById("subHeading");
    const objectContainer = document.getElementById("objectContainer");
    const optionsContainer = document.getElementById("optionsContainer");
    const feedbackEl = document.getElementById("feedback");
  
    // Pool med föremål (emojis). Du kan lägga till fler om du vill.
    const objectsPool = ["🐶", "😺", "🚗", "☀️", "🌙", "🚕", "🦊", "🍎", "🍌", "🍇"];
    let numObjects = 5; // Vi använder 5 objekt (ex. 3 på övre raden, 2 på understa)
    let currentObjects = [];
    let missingObject = "";
    let options = [];
    let timerInterval = null;
  
    startButton.addEventListener("click", startGame);
  
    function startGame() {
      console.log("startGame() triggered");
      // Rensa eventuell tidigare timer
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      
      // Döljer start-knappen, rensa feedback och underrubrik
      startButton.style.display = "none";
      feedbackEl.textContent = "";
      subHeadingEl.textContent = "";
      optionsContainer.innerHTML = "";
      objectContainer.style.visibility = "visible";
      
      // Välj numObjects slumpmässigt från objectsPool
      currentObjects = shuffleArray([...objectsPool]).slice(0, numObjects);
      renderObjects(currentObjects);
      
      // Starta nedräkning från 10 sekunder
      let countdown = 10;
      timerEl.textContent = countdown;
      timerEl.style.display = "block";
      
      timerInterval = setInterval(() => {
        countdown--;
        timerEl.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(timerInterval);
          timerEl.style.display = "none";
          
          // Visa underrubrik när timern är slut
          subHeadingEl.textContent = "Vilket föremål saknas?";
          
          // Välj ett föremål att ta bort (det saknade)
          missingObject = currentObjects[Math.floor(Math.random() * currentObjects.length)];
          const remainingObjects = currentObjects.filter(obj => obj !== missingObject);
          
          // Visa de återstående objekten
          renderObjects(remainingObjects);
          
          // Efter 3 sekunder, visa svarsalternativen
          setTimeout(() => {
            showOptions();
          }, 3000);
        }
      }, 1000);
    }
    
    // Funktion för att rendera objekten i container
    function renderObjects(arr) {
      objectContainer.innerHTML = "";
      // Om det finns exakt 5 objekt, kan vi använda en specifik grid-layout
      // Om du har satt en CSS-klass på container (t.ex. "two-rows-5"), så får den hantera placeringen
      arr.forEach(obj => {
        const el = document.createElement("div");
        el.classList.add("object-item");
        el.textContent = obj;
        objectContainer.appendChild(el);
      });
    }
    
    function showOptions() {
      optionsContainer.innerHTML = "";
      // Rätt svar
      const correctOption = missingObject;
      
      // Skapa två falska alternativ
      let falseOptions = [];
      while (falseOptions.length < 2) {
        let candidate = objectsPool[Math.floor(Math.random() * objectsPool.length)];
        if (candidate !== missingObject && !falseOptions.includes(candidate)) {
          falseOptions.push(candidate);
        }
      }
      
      // Blanda alternativen
      options = shuffleArray([correctOption, ...falseOptions]);
      
      // Skapa en knapp för varje alternativ
      options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(opt));
        optionsContainer.appendChild(btn);
      });
    }
    
    function checkAnswer(selected) {
      if (selected === missingObject) {
        feedbackEl.textContent = "Rätt!";
      } else {
        feedbackEl.textContent = "Fel, försök igen!";
      }
      // Starta om spelet efter 2 sekunder
      setTimeout(() => {
        objectContainer.style.visibility = "visible";
        startGame();
      }, 2000);
    }
    
    // Fisher-Yates shuffle-algoritm för att blanda en array
    function shuffleArray(arr) {
      let array = arr.slice();
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  });
  
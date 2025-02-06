// Globala variabler för Memory-spelet
let flippedCards = [];
let lockBoard = false;
let cardsArray = [];
// Variabler för drag (om du har dragfunktioner, etc. – i vårt Memory-spel används klick istället)
let passwordAccepted = false;

// Funktion som initierar Memory-spelet med bilder
function initMemoryGame() {
  // Exempelarray med bilder – se till att dessa filer finns i samma mapp
  const images = [
    "cows.jpg",
    "emilJulgran.jpg",
    "emilPK.jpg",
    "halloween.jpg",
    "tree.jpg",
    "viggo.jpg"
  ];
  
  // Duplicera arrayen för att få par
  cardsArray = [...images, ...images];
  
  // Blanda korten med Fisher-Yates algoritm
  shuffleArray(cardsArray);
  
  // Hämta container för spelet och töm innehållet
  const container = document.querySelector(".memory-container");
  container.innerHTML = "";
  flippedCards = [];
  lockBoard = false;
  
  // Skapa korten
  cardsArray.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;
    
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-face", "card-front");
    cardFront.style.backgroundImage = `url('${image}')`;
    
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-face", "card-back");
    cardBack.textContent = "❓";
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    container.appendChild(card);
    
    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (card.classList.contains("flipped")) return;
      flipCard(card);
    });
  });
  
  // Funktion för att vända ett kort
  function flipCard(card) {
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
  
  // Funktion som kontrollerar om två flippade kort matchar
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;
    if (isMatch) {
      flippedCards = [];
    } else {
      lockBoard = true;
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
  
  // Fisher-Yates-algoritm för att blanda en array
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

// ---------------------------------------------------------------------
// Lösenord och start av Memory-spel (körs när DOM är laddad)
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Hantera lösenordsoverlay
  const passwordOverlay = document.getElementById("passwordOverlay");
  const passwordInput = document.getElementById("passwordInput");
  const passwordBtn = document.getElementById("passwordBtn");
  const passwordError = document.getElementById("passwordError");
  
  passwordBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
  
  function checkPassword() {
    const entered = passwordInput.value.trim();
    if (entered.toLowerCase() === "mello") {
      passwordAccepted = true;
      passwordOverlay.style.display = "none";
      // Starta Memory-spelet
      initMemoryGame();
    } else {
      passwordError.textContent = "Fel lösenord. Försök igen!";
    }
  }
});

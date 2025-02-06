document.addEventListener("DOMContentLoaded", () => {
    // Definiera de emojis som ska användas
    const emojis = ["🐉", "🏠", "🚗", "🦆", "☀️", "❤️"];
    // Skapa en array med par (duplicera arrayen)
    let cardsArray = [...emojis, ...emojis];
    // Blanda korten
    shuffleArray(cardsArray);
  
    const container = document.querySelector(".memory-container");
    let flippedCards = [];
    let lockBoard = false;
  
    // Skapa korten
    cardsArray.forEach(emoji => {
      // Skapa kortets element med klasserna "card" och inre element "card-inner"
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.card = emoji;
  
      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");
  
      // Framsidan: visar emoji
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-face", "card-front");
      cardFront.textContent = emoji;
  
      // Baksidan: exempelvis en frågetecken-emoji
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-face", "card-back");
      cardBack.textContent = "❓";
  
      // Montera kortet
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      container.appendChild(card);
  
      // Klick-lyssnare för kortet
      card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card.classList.contains("flipped")) return;
        flipCard(card);
      });
    });
  
    // Funktion för att "flippa" kortet
    function flipCard(card) {
      card.classList.add("flipped");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  
    // Funktion som kontrollerar om de två flippade korten matchar
    function checkForMatch() {
      const [card1, card2] = flippedCards;
      const isMatch = card1.dataset.card === card2.dataset.card;
      if (isMatch) {
        // Håll korten uppvända och rensa flippedCards
        flippedCards = [];
      } else {
        lockBoard = true;
        // Om inte match, vänd tillbaka korten efter en fördröjning
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  
    // Fisher-Yates algoritm för att blanda arrayen
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  });
  
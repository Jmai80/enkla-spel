const words = [
    { sv: "upprörd", en: "upset" },
    { sv: "tredje", en: "third" },
    { sv: "att hacka", en: "chop" },
    { sv: "slott", en: "palace" },
    { sv: "gymnasium", en: "high school" },
    { sv: "fegis", en: "coward" },
    { sv: "att skära", en: "cut" },
    { sv: "skratta", en: "laugh" },
    { sv: "hoppa", en: "jump" },
    { sv: "hoppas", en: "hope" },
    { sv: "fönster", en: "window" },
    { sv: "modig", en: "brave" },
    { sv: "bokhylla", en: "bookshelf" },
    { sv: "glad", en: "happy" },
    { sv: "sjunga", en: "sing" },
    { sv: "skugga", en: "shadow" },
    { sv: "tyst", en: "quiet" },
    { sv: "rita", en: "draw" },
    { sv: "berg", en: "mountain" },
    { sv: "snabb", en: "fast" },
    { sv: "pekfinger", en: "index finger" },
    { sv: "kudde", en: "pillow" },
    { sv: "tålmodig", en: "patient" },
    { sv: "strand", en: "beach" },
    { sv: "arg", en: "angry" },
    { sv: "att springa", en: "run" },
    { sv: "moln", en: "cloud" },
    { sv: "vänlig", en: "friendly" },
    { sv: "skriva", en: "write" },
    { sv: "skog", en: "forest" },
    { sv: "svag", en: "weak" },
    { sv: "simma", en: "swim" },
    { sv: "bygga", en: "build" },
    { sv: "öken", en: "desert" },
    { sv: "snäll", en: "kind" },
    { sv: "läsa", en: "read" },
    { sv: "flyga", en: "fly" },
    { sv: "tålamod", en: "patience" },
    { sv: "förvirrad", en: "confused" },
    { sv: "klättra", en: "climb" },
    { sv: "aska", en: "ashes" },
    { sv: "björk", en: "birch" },
    { sv: "förgäves", en: "in vain" },
    { sv: "tveksam", en: "doubtful" },
    { sv: "utforska", en: "explore" },
    { sv: "mysterium", en: "mystery" },
    { sv: "beslutsam", en: "determined" },
    { sv: "försvinna", en: "disappear" },
    { sv: "övertygad", en: "convinced" },
    { sv: "upptäcka", en: "discover" },
    { sv: "förväntan", en: "expectation" },
    { sv: "övervinna", en: "overcome" },
    { sv: "överflöd", en: "abundance" },
    { sv: "förbjuda", en: "forbid" },
    { sv: "överlevnad", en: "survival" },
    { sv: "förstärka", en: "strengthen" },
    { sv: "överenskommelse", en: "agreement" },
    { sv: "försvara", en: "defend" },
    { sv: "övertygelse", en: "conviction" },
    { sv: "ändra", en: "change" },
    { sv: "överlägsen", en: "superior" },
    { sv: "förstöra", en: "destroy" },
    { sv: "överraskad", en: "surprised" },
    { sv: "förbättra", en: "improve" },
    { sv: "överflödig", en: "redundant" },
    { sv: "förlåta", en: "forgive" },
    { sv: "överdriven", en: "exaggerated" },
    { sv: "förhindra", en: "prevent" },
    { sv: "förstå", en: "understand" },
    { sv: "övertygande", en: "persuasive" },
    { sv: "förklara", en: "explain" },
    { sv: "retas", en: "tease" },
    { sv: "matsked", en: "tablespoon" },
    { sv: "fågel", en: "bird" },
    { sv: "flod", en: "river" },
    { sv: "sten", en: "stone" },
    { sv: "träd", en: "tree" },
    { sv: "blomma", en: "flower" },
    { sv: "gräs", en: "grass" },
    { sv: "måne", en: "moon" },
    { sv: "stjärna", en: "star" },
    { sv: "eld", en: "fire" },
    { sv: "vatten", en: "water" },
    { sv: "dal", en: "valley" },
    { sv: "sjö", en: "lake" },
    { sv: "hav", en: "ocean" },
    { sv: "djur", en: "animal" },
    { sv: "katt", en: "cat" },
    { sv: "hund", en: "dog" },
    { sv: "fisk", en: "fish" },
    { sv: "orm", en: "snake" },
    { sv: "groda", en: "frog" },
    { sv: "insekt", en: "insect" },
    { sv: "fjäril", en: "butterfly" },
    { sv: "bi", en: "bee" },
    { sv: "myra", en: "ant" },
    { sv: "spindel", en: "spider" },
    { sv: "sköldpadda", en: "turtle" },
    { sv: "delfin", en: "dolphin" },
    { sv: "val", en: "whale" },
    { sv: "haj", en: "shark" },
    { sv: "papegoja", en: "parrot" },
    { sv: "örn", en: "eagle" },
    { sv: "uggla", en: "owl" },
    { sv: "kanin", en: "rabbit" },
    { sv: "råtta", en: "rat" },
    { sv: "ekorre", en: "squirrel" },
    { sv: "igelkott", en: "hedgehog" },
    { sv: "lejon", en: "lion" },
    { sv: "björn", en: "bear" },
    { sv: "varg", en: "wolf" },
    { sv: "räv", en: "fox" },
    { sv: "älg", en: "moose" },
    { sv: "hjort", en: "deer" },
    { sv: "giraff", en: "giraffe" },
    { sv: "elefant", en: "elephant" },
    { sv: "noshörning", en: "rhinoceros" },
    { sv: "fladdermus", en: "bat" },
    { sv: "pingvin", en: "penguin" },
    { sv: "schimpans", en: "chimpanzee" },
    { sv: "orangutang", en: "orangutan" },
    { sv: "flodhäst", en: "hippopotamus" },
    { sv: "ödla", en: "lizard" },
    { sv: "struts", en: "ostrich" },
    { sv: "falk", en: "falcon" },
    { sv: "hök", en: "hawk" },
    { sv: "kråka", en: "crow" },
    { sv: "sparv", en: "sparrow" },
    { sv: "kolibri", en: "hummingbird" },
    { sv: "säl", en: "seal" },
    { sv: "sjölejon", en: "sea lion" },
    { sv: "valross", en: "walrus" },
    { sv: "bläckfisk", en: "octopus" },
    { sv: "blåval", en: "blue whale" },
    { sv: "manet", en: "jellyfish" },
    { sv: "sjöstjärna", en: "starfish" },
    { sv: "skogssnigel", en: "slug" },
    { sv: "snäcka", en: "snail" },
    { sv: "hummer", en: "lobster" },
    { sv: "räka", en: "shrimp" },
    { sv: "blåbär", en: "blueberry" },
    { sv: "hallon", en: "raspberry" },
    { sv: "jordgubbe", en: "strawberry" },
    { sv: "ananas", en: "pineapple" },
    { sv: "vindruva", en: "grape" },
    { sv: "vattenmelon", en: "watermelon" },
    { sv: "persika", en: "peach" },
    { sv: "plommon", en: "plum" },
    { sv: "aprikos", en: "apricot" },
    { sv: "körsbär", en: "cherry" },
    { sv: "fikon", en: "fig" },
    { sv: "citron", en: "lemon" },
    { sv: "tomat", en: "tomato" },
    { sv: "gurka", en: "cucumber" },
    { sv: "morot", en: "carrot" },
    { sv: "potatis", en: "potato" },
    { sv: "lök", en: "onion" },
    { sv: "vitlök", en: "garlic" },
    { sv: "spenat", en: "spinach" },
    { sv: "sallad", en: "lettuce" },
    { sv: "blomkål", en: "cauliflower" },
    { sv: "paprika", en: "bell pepper" },
    { sv: "aubergine", en: "eggplant" },
    { sv: "ärtor", en: "peas" },
    { sv: "bönor", en: "beans" },
    { sv: "linser (mat)", en: "lentils" },
    { sv: "kikärtor", en: "chickpeas" },
    { sv: "grönsak", en: "vegetable" },
    { sv: "smör", en: "butter" },
    { sv: "kött", en: "meat" },
    { sv: "fläskkött", en: "pork" },
    { sv: "nötkött", en: "beef" },
    { sv: "lamm", en: "lamb" },
    { sv: "musslor", en: "mussels" },
    { sv: "ostron", en: "oysters" },
    { sv: "kräfta", en: "crayfish" },
    { sv: "kullerbytta", en: "somersault" },
    { sv: "krabba", en: "crab" },
    { sv: "regnbåge", en: "rainbow" },
    { sv: "höst", en: "autumn" },
    { sv: "vår", en: "spring" },
    { sv: "dröm", en: "dream" },
    { sv: "morgon", en: "morning" },
    { sv: "kväll", en: "evening" },
    { sv: "skymning", en: "dusk" },
    { sv: "evighet", en: "eternity" },
    { sv: "ögonblick", en: "moment" },
    { sv: "sanning", en: "truth" },
    { sv: "lögn", en: "lie" },
    { sv: "visdom", en: "wisdom" },
    { sv: "fnittra", en: "giggle" },
    { sv: "äventyr", en: "adventure" },
    { sv: "oändlig", en: "infinite" },
    { sv: "mystisk", en: "mysterious" },
    { sv: "glänta", en: "glade" },
    { sv: "blunda", en: "close your eyes" },
    { sv: "gapa", en: "open your mouth" },
    { sv: "diska", en: "do the dishes" },
    { sv: "gul", en: "yellow" },
    { sv: "lila", en: "purple" },
    { sv: "rosa", en: "pink" },
    { sv: "brun", en: "brown" },
    { sv: "grå", en: "gray" },
    { sv: "vacker", en: "beautiful" },
    { sv: "ful", en: "ugly" },
    { sv: "lugn", en: "calm" },
    { sv: "mjuk", en: "soft" },
    { sv: "hård", en: "hard" },
    { sv: "farlig", en: "dangerous" },
    { sv: "rolig", en: "funny" },
    { sv: "tråkig", en: "boring" },
    { sv: "dyster", en: "gloomy" },
    { sv: "snöig", en: "snowy" },
    { sv: "regnig", en: "rainy" },
    { sv: "kärlek", en: "love" },
    { sv: "frihet", en: "freedom" },
    { sv: "rättvisa", en: "justice" },
    { sv: "förälder", en: "parent" },
    { sv: "syskon", en: "sibling" },
    { sv: "vän", en: "friend" },
    { sv: "fiende", en: "enemy" },
    { sv: "elev", en: "student" },
    { sv: "stad", en: "city" },
    { sv: "by", en: "village" },
    { sv: "land", en: "country" },
    { sv: "värld", en: "world" },
    { sv: "bergskedja", en: "mountain range" },
    { sv: "bro", en: "bridge" },
    { sv: "väg", en: "road" },
    { sv: "solnedgång", en: "sunset" },
    { sv: "soluppgång", en: "sunrise" }
  ];
  
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
  
  // Använder Fisher–Yates-algoritmen för att blanda en array
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
  
    // Blanda alternativen med Fisher–Yates
    shuffleArray(options);
  
    // Rensa tidigare alternativ och skapa nya knappar
    optionsContainer.innerHTML = "";
    options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      // Vid klick skickas knappen, det valda svaret och det korrekta svaret
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
      clickedButton.style.backgroundColor = "red";
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
  
  // Avsluta spelet och visa popup med slutresultat och en omstart-knapp
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
    // Ta bort omstartsknappen från popupen
    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.remove();
    }
    startGame();
  }
  
  startGame();
  
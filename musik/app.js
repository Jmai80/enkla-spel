// variabler för knappar med djur
const dogButton = document.getElementById('dog');
const catButton = document.getElementById('cat');
const crowButton = document.getElementById('crow');
const elephantButton = document.getElementById('elephant');
const chickenButton = document.getElementById('chicken');
const horseButton = document.getElementById('horse');
const lionButton = document.getElementById('lion');
const beeButton = document.getElementById('bee');
const owlButton = document.getElementById('owl');

// variabler för ljudfiler med djur
const dogSound = new Audio('dog.mp3');
const catSound = new Audio('cat.mp3');
const birdSound = new Audio('crow.mp3');
const elephantSound = new Audio('elephant.mp3');
const chickenSound = new Audio('chicken.mp3');
const horseSound = new Audio('horse.mp3');
const lionSound = new Audio('lion.mp3');
const beeSound = new Audio('bee.mp3');
const owlSound = new Audio('owl.mp3');

// variabler för knappar med instrument
const pianoButton = document.getElementById('piano');
const drumsButton = document.getElementById('drums');
const violinButton = document.getElementById('violin');
const guitarButton = document.getElementById('guitar');
const trumpetButton = document.getElementById('trumpet');
const fluteButton = document.getElementById('flute');

// variabler för ljudfiler med instrument
const pianoSound = new Audio('piano.mp3');
const drumsSound = new Audio('drums.mp3');
const violinSound = new Audio('violin.mp3');
const guitarSound = new Audio('guitar.mp3');
const trumpetSound = new Audio('trumpet.mp3');
const fluteSound = new Audio('flute.mp3');


// funktioner för att spela djur-ljud
dogButton.addEventListener('click', () => {
    dogSound.play();
});
catButton.addEventListener('click', () => {
    catSound.play();
});

crowButton.addEventListener('click', () => {    
    birdSound.play();
});
elephantButton.addEventListener('click', () => {
    elephantSound.play();
});
chickenButton.addEventListener('click', () => {
    chickenSound.play();
}); 
horseButton.addEventListener('click', () => {
    horseSound.play();
});
lionButton.addEventListener('click', () => {
    lionSound.play();
}); 
beeButton.addEventListener('click', () => {
    beeSound.play();
}); 
owlButton.addEventListener('click', () => {
    owlSound.play();
});

// funktioner för att spela instrument-ljud
pianoButton.addEventListener('click', () => {
    pianoSound.play();
});
drumsButton.addEventListener('click', () => {
    drumsSound.play();
});
violinButton.addEventListener('click', () => {
    violinSound.play();
});
guitarButton.addEventListener('click', () => {
    guitarSound.play();
});
trumpetButton.addEventListener('click', () => {
    trumpetSound.play();
});
fluteButton.addEventListener('click', () => {
    fluteSound.play();
});
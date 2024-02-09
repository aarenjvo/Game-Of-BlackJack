function hideHero() {
    document.getElementById('heroContainer').style.display = 'none';
}

function showContent() {
    document.getElementById('heroContainer').style.display = 'block';
}

function showGame() {
    document.getElementById('dealerVsPlayer').style.display = 'block';
}

function hideGame() {
    document.getElementById('dealerVsPlayer').style.display = 'none';
}


// BlackJack Game Logic

var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows player to draw while yourSum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = [ 'ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
    let types = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ];
    deck = [];

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < types.length; j++) {
            deck.push(types[j] + "_" + values[i]);
        }
    }
    // console.log(deck);

}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
}

function getValue(card) {
    let data = card.split("_");
    let value = data[0];

    if (isNaN(value)) {
        if(value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}


function hideFront() {
    document.getElementById('frontPage').style.display = 'none';
}

function showContent() {
    document.getElementById('frontPage').style.display = 'block';
}

function showGame() {
    document.getElementById('dealerVsPlayer').style.display = 'block';
    document.getElementById('hit').style.display = 'block';
    document.getElementById('stay').style.display = 'block';
}

function hideGame() {
    document.getElementById('dealerVsPlayer').style.display = 'none';
    // document.getElementById('hitStayWrap').style.display = 'none';
}


// BlackJack Game Logic

var dealerSum = 0;
var playerSum = 0;

var dealerAceValue = 0;
var playerAceValue = 0;

var hiddenCard;
var deck;

var canHit = true; //will allow player to draw if playerSum is <= 21

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
    // getValue();
    // checkAce();
}

function buildDeck() {
    let values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "_" + types[i]);
        }
    }
}

//Function to have deck always randomized
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

//dealerSum adds the value of a card from the deck.
function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);

// deal cards to dealer hand
    dealerAceValue += checkAce(hiddenCard);
    console.log(hiddenCard);
    console.log(dealerSum);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceValue += checkAce(card);
        document.getElementById("dealerHand").append(cardImg);
    }
    console.log(dealerSum);

    // deal cards to player hand
    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceValue += checkAce(card);
        document.getElementById("playerHand").append(cardImg);
    }
    console.log(playerSum);
    document.getElementById('hit').addEventListener("click", hit);
    document.getElementById('stay').addEventListener("click", stay);
}

function hit() {
    if(!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceValue += checkAce(card);
        document.getElementById("playerHand").append(cardImg);

        dealerSum = subtractAce(dealerSum, dealerAceValue);
        playerSum = subtractAce(playerSum, playerAceValue);

        if (subtractAce(playerSum, playerAceValue) > 21) {
            canHit = false;
            document.getElementById('hiddenCard').src = "./assets/images/cards/" + hiddenCard + ".png";

            if (playerSum > 21) {
                alert("You lose!");
            }
            else if (dealerSum > 21) {
                alert("You win!");
            }
            else if (playerSum == dealerSum) {
                alert("You and dealer push!");
            }
            else if (playerSum > dealerSum) {
                alert("You win!");
            }
            else if (playerSum < dealerSum) {
                alert("You lose!");
            }
        
            document.getElementById('dealer-Sum').innerText = dealerSum;
            document.getElementById('player-Sum').innerText = playerSum;
        }
}

function stay() {
    dealerSum = subtractAce(dealerSum, dealerAceValue);
    playerSum = subtractAce(playerSum, playerAceValue);

    canHit = false;
    document.getElementById('hiddenCard').src = "./assets/images/cards/" + hiddenCard + ".png";

    if (playerSum > 21) {
        alert("You lose!");
    }
    else if (dealerSum > 21) {
        alert("You win!");
    }
    else if (playerSum == dealerSum) {
        alert("You and dealer push!");
    }
    else if (playerSum > dealerSum) {
        alert("You win!");
    }
    else if (playerSum < dealerSum) {
        alert("You lose!");
    }

    document.getElementById('dealer-Sum').innerText = dealerSum;
    document.getElementById('player-Sum').innerText = playerSum;
    
}

//Pass in card parameter to getValue, split card into array and get numeric value of that first index.
function getValue(card) {

    let data = card.split("_");
    let value = data[0];
    //Check if value is not a number, so that if not, 'ACE' can return 11 or 'J','Q','K' can return 10.
    if (isNaN(value)) {
        if (value == "ACE") {
            return 11;
        }
        else return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "ACE") {
        return 1;
    }
    return 0;
}

// allow ACE card to adjust to a value of 1
function subtractAce(playerSum, playerAceValue) {
    while (playerSum > 21 && playerAceValue > 0) {
        playerSum -= 10;
        playerAceValue -= 1;
    }
    return playerSum;
}


// Create Bet Counter
var count = document.getElementById('betTotal');
var p = document.createElement('p');
p.textContent = 500;
count.appendChild(p);


let betTotal = 500;

let canBet = true;

let wagerAmount = 100; // Initial bet amount

document.getElementById('subtractToBet').onclick = function decreaseBet() {
    if (wagerAmount > 0) {
    wagerAmount -= 100;
    document.getElementById('wagerAmount').innerHTML = wagerAmount;
    }
}

document.getElementById('addToBet').onclick = function increaseBet() {
    if (canBet) { wagerAmount += 100;
        if (wagerAmount >= betTotal) {
            canBet = false;
        }
    document.getElementById('wagerAmount').innerHTML = wagerAmount;
}
}

// function resetGame() 
//     dealerSum = 0;
//     playerSum = 0;
//     dealerAceValue = 0;
//     playerAceValue = 0;
//     canHit = true;

//     // Clear dealer and player hands
//     document.getElementById("dealerHand").innerHTML = "";
//     document.getElementById("playerHand").innerHTML = "";

//     // Reset hidden card
//     hiddenCard = deck.pop();
//     dealerSum += getValue(hiddenCard);
//     dealerAceValue += checkAce(hiddenCard);

//     // Deal initial cards
//     startGame();

//     // Reset UI
//     document.getElementById('hiddenCard').src = "";
//     document.getElementById('dealer-Sum').innerText = "";
//     document.getElementById('player-Sum').innerText = "";
// }
// document.getElementById('refresh').addEventListener("click", resetGame);

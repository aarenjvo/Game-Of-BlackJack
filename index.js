function hideFront() {
    document.getElementById('frontPage').style.display = 'none';
}

function showContent() {
    document.getElementById('frontPage').style.display = 'block';
}

function showGame() {
    document.getElementById('gameStart').style.display = 'block';
    document.getElementById('hit').style.display = 'block';
    document.getElementById('stay').style.display = 'block';
}

function hideGame() {
    document.getElementById('gameStart').style.display = 'none';
    // document.getElementById('hitStayWrap').style.display = 'none';
}

// BlackJack Game Logic

// function resetGame() {
//     document.getElementById('dealerHand').innerHTML = '';
//     document.getElementById('playerHand').innerHTML = '';

//     dealerSum = 0;
//     playerSum = 0;

//     dealerAceCount = 0;
//     playerAceCount = 0;

//     hiddenCard = null;
//     deck = [];

//     canHit = true;

//     buildDeck();
//     shuffleDeck();

//     startGame();
// }

var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hiddenCard;
var deck;

var canHit = true; //will allow player to draw if playerSum is < 21

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
};


// Create values and types related to image file names and run a for loop to create 52 card deck.
function buildDeck() {
    let values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "_" + types[i]);
        }
    }
};

//Function to shuffle deck and always randomize.
// Math.floor to round to lowest integer since math.random will generate a decimal number.
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let k = deck[i];
        deck[i] = deck[j];
        deck[j] = k;
    }
    console.log(deck);
};

//add value from whatever card is drawn from the deck to the dealerSum total.
function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    // add value of the hidden card to dealer sum.
    dealerAceCount += checkIfAce(hiddenCard);
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkIfAce(card);
        document.getElementById("dealerHand").append(cardImg);
        

    // deal cards to player hand
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkIfAce(card);
        document.getElementById("playerHand").append(cardImg);
    }
    console.log("Your starting total: ", playerSum);
    document.getElementById('hit').addEventListener("click", hit);
    document.getElementById('stay').addEventListener("click", stay);
};

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/images/cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkIfAce(card);
    document.getElementById("playerHand").append(cardImg);

    dealerSum = changeDealerAceValue(dealerSum, dealerAceCount);
    playerSum = changePlayerAceValue(playerSum, playerAceCount);

    if (changePlayerAceValue(playerSum, playerAceCount) > 21) {
        canHit = false;
        document.getElementById('hiddenCard').src = "./assets/images/cards/" + hiddenCard + ".png";

        if (playerSum > 21) {
            alert("You lose!");
        }
        else if (dealerSum > 21) {
            alert("You win!");
        }
        else if (playerSum === dealerSum) {
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
        console.log("Dealer's total: ", dealerSum);
        console.log("Your total: ", playerSum);
        resetGame();
    }
}

function stay() {

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/images/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkIfAce(card);
        document.getElementById("dealerHand").append(cardImg);
    }
    console.log(hiddenCard);
    console.log(dealerSum);

    dealerSum = changeDealerAceValue(dealerSum, dealerAceCount);
    playerSum = changePlayerAceValue(playerSum, playerAceCount);
    canHit = false;
    document.getElementById('hiddenCard').src = "./assets/images/cards/" + hiddenCard + ".png";

    if (playerSum > 21) {
        alert("You lose!");
    }
    else if (dealerSum > 21) {
        alert("You win!");
    }
    else if (playerSum === dealerSum) {
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
    console.log("Dealer's total: ", dealerSum);
    console.log("Your total: ", playerSum);
    resetGame();

}

//Pass in a card parameter, split card into array and get the first index value of the split array.
function getValue(card) {
    let data = card.split("_");
    let value = data[0];
    //Check if value is not a number, so that if not, 'ACE' can return 11 or 'J','Q','K' can return 10.
    if (isNaN(value)) {
        if (value == "ACE") {
            return 11;
        }
        return 10;
    }
    // numbers will be assumed as strings so parse it into an integer
    return parseInt(value);
}

// Check if a card 
function checkIfAce(card) {
    if (card[0] == "ACE") {
        return 1
    } return 0;
}

// allow ACE card to adjust to a value of 1
function changePlayerAceValue(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function changeDealerAceValue(dealerSum, dealerAceCount) {
    while (dealerSum < 17 && dealerAceCount > 0) {
        dealerSum -= 10;
        dealerAceCount -= 1;
    }
    return dealerSum;
}

// Create bet counter

// Add event listeners to the "Submit" button and the bet counter buttons in your JavaScript code.
// Implement functions to handle increasing and decreasing bets when the respective buttons are clicked.
// Implement logic in the "Submit" button's event listener to execute the game logic (deal cards, determine winner, update bank balance) when clicked.
// Update the bank balance based on the game outcome (win or lose).

function determineWinner(playerSum, dealerSum) {

    if (playerSum > 21) {
        return false;
    }
    else if (dealerSum > 21 || playerSum > dealerSum) {
        return true;
    }
    else if (playerSum === dealerSum) {
        return null;
    }
    else if (playerSum > dealerSum) {
        return true;
    }
    else if (playerSum < dealerSum) {
        return false;
    }
};

function updateBankTotal(betOutcome) {
    if (betOutcome === true) {
        betTotal += wagerAmount;
    } else if (betOutcome === false) {
        betTotal -= wagerAmount;
    }
    document.getElementById('playerBank').textContent = betTotal;
}

document.getElementById('submitButton').addEventListener('click', function() {
    if (!numberAppended) {
    let wagerPlaced = document.getElementById('placedBetAmount');
    let wagerAppended = document.createElement('p');
        wagerAppended.textContent = wagerAmount;
        wagerPlaced.appendChild(wagerAppended);

        let winner = determineWinner(playerSum, dealerSum);
        updateBankTotal(winner);

        resetGame();

        numberAppended = true;
    }
})

var count = document.getElementById('playerBank');
var p = document.createElement('p');

let numberAppended = false;

let betTotal = 500;

let canBet = true;

let wagerAmount = 0; // Initial bet amount

document.getElementById('subtractBet').onclick = function decreaseBet() {
    if (wagerAmount > 0) {
        wagerAmount -= 100;
        document.getElementById('wagerAmount').innerHTML = wagerAmount;
    }
}

document.getElementById('addBet').onclick = function increaseBet() {
    if (canBet) {
        wagerAmount += 100;
        if (wagerAmount >= betTotal) {
            canBet = false;
        }
        document.getElementById('wagerAmount').innerHTML = wagerAmount;
    }
}

// document.getElementById('submitButton').addEventListener('click', function() {
    

//     let winner = determineWinner(playerSum, dealerSum);
//     if (winner === true) {
//         betTotal += wagerAmount;
//     } else if (winner === false) {
//         betTotal -= wagerAmount;
//     }
//     document.getElementById('playerBank').textContent = betTotal;
// });

// var count = document.getElementById('playerBank');
// var p = document.createElement('p');
// p.textContent = 500;
// count.appendChild(p);





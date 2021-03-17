// Create a list that holds all of your cards
let cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function game() {
    console.log('New game')
    shuffle(cardsList)
    console.log(cardsList)
    const deckElem = document.querySelector('.deck');
    const movesDisplay = document.querySelector('.moves');
    const modal = document.querySelector('.modal');
    const finalStars = document.querySelector('.finalstars');
    modal.style.display = 'none'
    movesDisplay.innerHTML = 0;
    let openedIcons = []
    let openedCards = []
    let movesCounter = 0;
    let numberofmatched = 0;
    let deckContent = '';
    const starsDisplay = document.querySelector('.stars')
    let starsContent = '';
    for (let i = 0; i < 5; i++) {
        starsContent += `
        <li><i class="fa fa-star"></i></li>`
    }
    starsDisplay.innerHTML = starsContent;
    for (let i = 0; i < cardsList.length; i++) {
        deckContent += `
        <li class="card">
            <i class="fa ${cardsList[i]}"></i>
        </li>`
    }
    deckElem.innerHTML = deckContent;
    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function handleClick() {
            ////
            cards[i].classList.add('open', 'show')
            openedIcons.push(cards[i].firstElementChild)
            openedCards.push(cards[i])
            cards[i].style.pointerEvents = 'none';
            
            if (openedIcons.length === 2) {
                console.log('I have 2 items')
                if (openedIcons[0].classList[1] === openedIcons[1].classList[1]) {
                    console.log('its a match')
                    openedCards[0].classList.add('match')
                    openedCards[1].classList.add('match')
                    openedIcons = []
                    openedCards = []
                    movesCounter++;
                    if (movesCounter === 12 || movesCounter === 18 || movesCounter === 24 || movesCounter === 30) {
                        console.log(starsDisplay.lastElementChild.remove())
                    }
                    movesDisplay.innerHTML = movesCounter;
                    console.log(movesCounter)
                    numberofmatched++;
                    console.log('NumofM', numberofmatched);
                    if (numberofmatched === 8) {
                        console.log('You won!')
                        finalStars.innerHTML = starsDisplay.innerHTML
                        modal.style.display = 'flex';
                    }
                } else if (openedIcons[0].classList[1] !== openedIcons[1].classList[1]) {
                    console.log('Its not a match')
                    deckElem.style.pointerEvents = 'none';
                    openedCards[0].setAttribute('style', 'background: #ff5d00');
                    openedCards[1].setAttribute('style', 'background: #ff5d00');
                    setTimeout(function () {
                        openedCards[0].classList.remove('open', 'show')
                        openedCards[1].classList.remove('open', 'show')
                        openedCards[0].removeAttribute("style");
                        openedCards[1].removeAttribute("style");
                        openedCards = []
                        openedIcons = []
                        deckElem.style.pointerEvents = '';
                        movesCounter++;
                        if (movesCounter === 3 || movesCounter === 6 || movesCounter === 9 || movesCounter === 12) {
                            console.log(starsDisplay.lastElementChild.remove())
                        }
                        movesDisplay.innerHTML = movesCounter;
                        console.log(movesCounter)
                    }, 600)
                }
            }
        })
    }
}
game();
const resetButton = document.getElementsByClassName('fa-repeat');
resetButton[0].addEventListener('click', game)
resetButton[1].addEventListener('click', game)



/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

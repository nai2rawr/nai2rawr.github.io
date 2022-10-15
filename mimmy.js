const kittyCursor = document.querySelector('.kiity-cursor');

const positionElement = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    kittyCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)` ;
}

window.addEventListener('mousemove', positionElement)
const url = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
fetch(url)
    .then(res => {
        console.log('sucess!', res);
    })
    .catch(err => {
        console.log('Something went wrong...', err);
    })
const url2 = "https://code.jquery.com/jquery-3.6.0.min.js"
fetch(url2)
    .then(res => {
        console.log('sucess!', res);
    })
    .catch(err => {
        console.log('Something went wrong...', err);
    })
function getData(event) {
    let url3 = 'https://dictionaryapi.com/api/v3/references/collegiate/json/test?key=61753c0f-f29b-4cb4-89f2-d4481e644704'
    return fetch(url3).then(res => res.json())
        .then(res => {
            return res
        })
}
let WORDS = getData()
const Number_of_Guesses = 6
let guessesRemaining = Number_of_Guesses;
let currentGuess = [];
const correctAnswer = 'mimmy';
let nextLetter = 0;
//let correctAnswer = [Math.floor(math.random()*word.length)]
console.log(correctAnswer)

function initBoard() {
    let board = document.getElementById("mimmy-board");
    for (let i = 0; i < Number_of_Guesses; i++) {
        let row = document.createElement("div")
        row.className = "mimmy-row"
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "mimmy-letterbox"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}
initBoard()
document.addEventListener('keyup', (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = (e.key)
    if (pressedKey === 'Backspace' && nextLetter !== 0) {
        deleteLetter()
        return
    }
    if (pressedKey === 'Enter') {
        checkGuess()
        return
    }
    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})
function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}
function deleteLetter() {
    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}
function checkGuess() {
    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = correctAnswer

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }
    if (WORDS.includes(guessString)) {
        alert("Word not in list!")
        return
    }


    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'red'
        } else {
            
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(() => {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${correctAnswer}"`)
        }
    }
}
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}
function checkGuess() {
    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(correctAnswer)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'red'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(() => {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === correctAnswer) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${correctAnswer}"`)
        }
    }
}
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}
function checkGuess() {
    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(correctAnswer)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    } for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'red'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }
        let delay = 250 * i
        setTimeout(() => {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === correctAnswer) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${correctAnswer}"`)
        }
    }
}
document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }))
})
const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);
        const node = element
        node.style.setProperty('--animate-duration', '0.3s');

        node.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("mimmy-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}
//let delay = 250 
//setTimeout(() => {
    //flip box
  //  animateCSS(box, 'flipInX')
    //shade box
    //box.style.backgroundColor = letterColor
    //shadeKeyBoard(letter, letterColor)
//}, delay)
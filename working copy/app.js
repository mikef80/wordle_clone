// zero is false

/* import {array} from './createArray.js';

console.log(array);

fs = require('fs');

fs.readFile('./colourdleArray.txt', 'utf8', function (err,data) {
    if (err) return console.log(err);
    console.log(data);
  });
 */
// console.log(array[1]);

// THIS MAKES THE GAME LOAD ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {

    let answer;
    let outputAnswer;
    // sets number of rows and columns
    const rows = 4;
    const cols = 9;
    let currentLife = 1;
    let checkpoint = 0;
    let currentColour = 0;
    
    buildGrid();
    setSwatch();
    initLocalStorage();

    const keys = document.querySelectorAll('.keyboard-row button');
    
    const guessedRGB = [[]];
    let currentSquareNo = 1;
    let guessCount = 0;

    function initLocalStorage() {
      // console.log('colour: ' + currentColour);
      const storedCurrentColour = window.localStorage.getItem('currentColour');
      // console.log(storedCurrentColour);
      if (!storedCurrentColour) {
        // console.log('initTrue');
        // console.log(currentColour);
        window.localStorage.setItem('currentColour', currentColour);
      } else {
        // console.log('initFalse');
        currentColour = Number(storedCurrentColour);
      }



    }

    function numConv(n) {
      return Number(n);
    }
    
    function setSwatch() {
        let totalColors = 256;
        
        let r = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');
        let g = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');
        let b = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');

        /* console.log(r);
        console.log(g);
        console.log(b); */

        outputAnswer = (`rgb(${r},${g},${b})`)


        answer = (r + g + b);
        // console.log(answer);
        let answer2 = Array.from(String(answer), numConv); 

        // console.log(answer2);
        
        const colour = `${r}, ${g}, ${b}`;
        const swatch = document.querySelector('.colour.target');
        swatch.style.backgroundColor = `rgb(${colour})`;
        currentColour = answer;
        // console.log(currentColour);
        // console.log(swatch.offsetWidth);
    }

    // getCurrentGuessArray
    function getCurrentGuessArr() {
      const numbersofGuesses = guessedRGB.length;
      return guessedRGB[numbersofGuesses - 1];
    }

    // updateGuesses
    function updateGuesses(digit) {
      const currentGuessArr = getCurrentGuessArr();

      if(currentGuessArr && currentGuessArr.length < 9) {
          currentGuessArr.push(digit);

          const availableSpaceEl = document.getElementById(String(currentSquareNo));
          currentSquareNo += 1;

          availableSpaceEl.textContent = digit;
      }
    }

    // getTileColour
    function getTileColour(digit, index) {
      // console.log(answer);
      const isCorrectDigit = answer.includes(digit);

      if(!isCorrectDigit) {
        return "rgb(58, 58, 60)";
      }

      const digitInThatPosition = answer.charAt(index);
      const isCorrectPosition = digit === digitInThatPosition;

      if(isCorrectPosition) {
        return "rgb(83, 141, 78)";
      }

      return "rgb(181, 159, 59)";
    }

    // update guess swatch
    function updateGuessSwatch(input) {
      const swatch = document.querySelector('.guess-colour')
      let ColorVal = `rgb(${input[0]}${input[1]}${input[2]},${input[3]}${input[4]}${input[5]},${input[6]}${input[7]}${input[8]})`
      swatch.style.backgroundColor = ColorVal;
      console.log(ColorVal);
    }

    // handleSubmitGuess
    function handleSubmitGuess() {
      const currentGuessArr = getCurrentGuessArr();
      updateGuessSwatch(currentGuessArr);

      if (currentGuessArr.length !== 9) {
        window.alert('Guess must be 9 digits long!');
        return
      }

      const currentGuess = currentGuessArr.join('');
    
      
      const firstDigitId = guessCount * 9 + 1;
      const interval = 200;

      currentGuessArr.forEach((digit, index) => {
        setTimeout(() => {
          const tileColour = getTileColour(digit, index);
          const digitId = firstDigitId + index;
          const digitEl = document.getElementById(digitId);
          digitEl.classList.add('animate__flipInX');
          // digitEl.style = `background-color:${tileColour}; border-color:${tileColour}`;
          digitEl.style = `background-color:${tileColour};`;
        }, interval * index);
      })

      guessCount += 1;
      checkpoint += 9;
      
      if (currentGuess === answer) {
        window.alert('Congratulations!');
        const totalWins = window.localStorage.getItem('totalWins') || 0;
        window.localStorage.setItem('totalWins', Number(totalWins) + 1);
        const currentStreak = window.localStorage.getItem('currentStreak') || 0;
        window.localStorage.setItem('currentStreak', Number(currentStreak) + 1);
        updateTotalGames()
        return;
      }

      if (guessedRGB.length === rows) {
        window.alert(`Sorry, you have no more guesses! The answer is ${outputAnswer}`);
        document.getElementById('test').textContent = outputAnswer;
        window.localStorage.setItem('currentStreak', Number(0));
        updateTotalGames()
        return
      }

      guessedRGB.push([]);

    }


    // update total games
    function updateTotalGames() {
      const totalGames = window.localStorage.getItem('totalGames') || 0;
      window.localStorage.setItem('totalGames', Number(totalGames) + 1);
    }


    // handleDeleteDigit
    function handleDeleteDigit() {
      const currentGuessArr = getCurrentGuessArr();
      const removedDigit = currentGuessArr.pop();

      guessedRGB[guessedRGB.length - 1] = currentGuessArr;

      let lastDigitEl = document.getElementById(Number(currentSquareNo - 1));

      if(lastDigitEl.id != checkpoint) {
        lastDigitEl.textContent = '';
        currentSquareNo = currentSquareNo - 1;
      }
    }


    // BUILD GAME GRID
    function buildGrid() {

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {

                let square = document.createElement('div');
                let board = document.querySelector('.board');
                board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

                square.classList.add('square','container','animate__animated');
                square.id = (i * cols) + (j + 1);
                board.appendChild(square);

            }
        }
    }


    // MOUSE INPUT NUMBERS INTO GRID
    keys.forEach(key => {
        key.onclick = ({target}) => {
            const number = target.getAttribute('data-key');
                        
            if (number === 'enter') {
                handleSubmitGuess();
                // updateGuessSwatch();
                return;
            }
            
            if (number === 'delete') {
                handleDeleteDigit();
                return;
            }

            // console.log(number);
            updateGuesses(number);
            
        }
    })


    // TOGGLE INFO
    function toggleInfo() {
      let intro = document.querySelector('.intro');
      intro.classList.toggle('show');
    }

    function toggleHelp() {
      console.log('help');
      let help = document.querySelector('.helpdiv');
      console.log(help);
      help.classList.toggle('show');
      console.log(help.classList);
    }

    function toggleStats() {
      let stats = document.querySelector('.stats');
      stats.classList.toggle('show');
    }
    
    // SHOW STUFF
    let showInfo = document.querySelector('.fa-circle-info');
    showInfo.addEventListener('click', toggleInfo);

    let showHelp = document.querySelector('.fa-circle-question');
    showHelp.addEventListener('click', toggleHelp);
    
    let showStats = document.querySelector('.fa-chart-column');
    showStats.addEventListener('click', toggleStats);

    // HIDE STUFF
    let closeInfo = document.querySelector('.intro-close');
    closeInfo.addEventListener('click', toggleInfo);

    let closeHelp = document.querySelector('.help-close');
    closeHelp.addEventListener('click', toggleHelp);
    
    let closeStats = document.querySelector('.stats-close');
    closeStats.addEventListener('click',toggleStats);


    // KEYBOARD INPUT NUMBERS INTO GRID

    window.addEventListener("keyup", key => {
      const number = Number(key.key);

      // console.log(Number.isInteger(number));

      if (!Number.isInteger(number)) {
        console.log('You must enter numbers, not alphabetical characters!');
        return;
      }
                        
      if (number === 'Enter') {
          handleSubmitGuess();
          return;
      }
      
      if (number === 'Delete' || number === 'Backspace') {
          handleDeleteDigit();
          return;
      }

      // console.log(number);
      updateGuesses(number);
    })
})
// zero is false

// THIS MAKES THE GAME LOAD ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {

    // LOCATION BITS!

   /*  var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success(pos) {
      var crd = pos.coords;

      console.log(`Lat: ${crd.latitude}`);
      console.log(`Long: ${crd.longitude}`);
    }

    function error() {
      console.warn('Error');
    }

    navigator.geolocation.getCurrentPosition(success, error, options); */

    // END LOCATION BITS

    let answer;
    let outputAnswer;
    // sets number of rows and columns
    const rows = 6;
    const cols = 9;
    
    buildGrid();
    setSwatch();

    const keys = document.querySelectorAll('.keyboard-row button');
    const guessedRGB = [[]];
    let currentSquareNo = 1;
    let guessCount = 0;
    
    
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
        const swatch = document.querySelector('.colour');
        
        swatch.style.backgroundColor = `rgb(${colour})`;
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
      console.log(answer);
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

    // handleSubmitGuess
    function handleSubmitGuess() {
      const currentGuessArr = getCurrentGuessArr();

      if (currentGuessArr.length !== 9) {
        window.alert('Guess must be 9 digits long!');
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

      if (currentGuess === answer) {
        window.alert('Congratulations!');
        return;
      }

      if (guessedRGB.length === rows) {
        window.alert(`Sorry, you have no more guesses! The answer is ${outputAnswer}`);
        document.getElementById('test').textContent = outputAnswer;
        return
      }

      guessedRGB.push([]);

    }


    // handleDeleteDigit
    function handleDeleteDigit() {
      const currentGuessArr = getCurrentGuessArr();
      const removedDigit = currentGuessArr.pop();

      guessedRGB[guessedRGB.length - 1] = currentGuessArr;

      const lastDigitEl = document.getElementById(String(currentSquareNo - 1));

      lastDigitEl.textContent = '';
      currentSquareNo = currentSquareNo - 1;
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

    // INPUT NUMBERS INTO GRID
    keys.forEach(key => {
        key.onclick = ({target}) => {
            const number = target.getAttribute('data-key');
                        
            if (number === 'enter') {
                handleSubmitGuess();
                return;
            }
            
            if (number === 'delete') {
                handleDeleteDigit();
                return;
            }

            console.log(number);
            updateGuesses(number);
            
        }
    })
})
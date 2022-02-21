// zero is false

// THIS MAKES THE GAME LOAD ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    let answer;
    
    buildGrid();
    setSwatch();

    const keys = document.querySelectorAll('.keyboard-row button');
    const guessedRGB = [[]];
    let currentSquareNo = 1;
    
    
    function setSwatch() {
        let totalColors = 256;
        
        let r = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');
        let g = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');
        let b = (Math.floor(Math.random() * totalColors)).toString().padStart(3, '0');

        answer = Number(r + g + b);
        console.log(answer);
        
        const colour = `${r}, ${g}, ${b}`;
        const swatch = document.querySelector('.colour');
        
        swatch.style.backgroundColor = `rgb(${colour})`;
    }



    // console.log(keys);

    // BUILD GAME GRID
    function buildGrid() {
        
        // sets number of rows and columns
        const rows = 1;
        const cols = 3;
        // const cols = 1;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // console.log(`${i}, ${j}`);

                let square = document.createElement('div');
                // square.textContent = "x";
                // square.textContent = (j + 1) % 3;
                let board = document.querySelector('.board');
                board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

                square.classList.add('square','container');
                square.id = "sq" + ((i * cols) + (j + 1));
                board.appendChild(square);

            }
        }
    }

    // INPUT NUMBERS INTO GRID
    keys.forEach(key => {
        key.onclick = ({target}) => {
            const letter = target.getAttribute('data-key');
                        
            if (letter === 'enter') {
                handleSubmitGuess();
                return;
            }
            
            if (letter === 'delete') {
                handleDeleteNumber();
                return;
            }

            console.log(letter);
            updateGuessNumbers(number);
            
        }
    })
})


/* console.log(letter);
// console.log(`${currentSquareNo}`);
// let currentSq = document.querySelector("#" + currentSquareNo);
let currentSq = document.querySelector("#sq" + currentSquareNo);
console.log(currentSq.id);
// let currentSq = document.getElementById('1'); */



/* if (currentSq.innerHTML.length === 3) {
    console.log('too long');
    currentSquareNo++;
    currentSq = document.querySelector("#sq" + (currentSquareNo));
    currentSq.innerHTML += letter;
} else if (letter === 'delete') {
    
} else {
    currentSq.innerHTML += letter;
} */
// zero is false

// THIS MAKES THE GAME LOAD ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    setSwatch();

    const guessedRGB = [[]];
    let currentSquareNo = 1;
    
    
    function setSwatch() {
        let totalColors = 256;
        
        let r = Math.floor(Math.random() * totalColors);
        let g = Math.floor(Math.random() * totalColors);
        let b = Math.floor(Math.random() * totalColors);

        console.log(r, g, b);
        
        const colour = `${r}, ${g}, ${b}`;
        const swatch = document.querySelector('.colour');
        
        swatch.style.backgroundColor = `rgb(${colour})`;
    }



    const keys = document.querySelectorAll('.keyboard-row button');
    // console.log(keys);

    // BUILD GAME GRID
    function buildGrid() {
        
        // sets number of rows and columns
        const rows = 5;
        const cols = 3;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // console.log(`${i}, ${j}`);

                let square = document.createElement('div');
                // square.textContent = "x";
                // square.textContent = (j + 1) % 3;
                let board = document.querySelector('.board');
                board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

                square.classList.add('square','container');
                square.id = (i * cols) + (j + 1);
                board.appendChild(square);

            }
        }



    }

    function getCurrentNoArray() {
        const numberOfGuesses = guessedRGB.length;
        return guessedRGB[numberOfGuesses - 1];
    }



    function updateGuessedNumbers(number) {
        const currentNoArray = getCurrentNoArray();
        const currentSpace = document.getElementById(String(currentSquareNo))
        
        
        if(currentNoArray && currentNoArray.length < 3) {
            
            currentNoArray.push(number);
            // console.log(currentNoArray);
            currentSpace.textContent += number;
            // console.log(currentSpace);
            
            
            
        } 
        console.log(currentNoArray);
        

    }

    function handleSubmittedNo() {
        const currentSpace = document.getElementById(String(currentSquareNo))

        // console.log(currentSquareNo % 3);

        if (!(currentSquareNo % 3)) {
            console.log('true');
            console.log(currentSpace);
        } else {
            console.log('false');
            console.log(currentSpace);
            
        }
        currentSquareNo++;
    }




    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const input = target.getAttribute('data-key');

            if (target.classList.contains('removed')) {
                return;
            }

            if (input === 'enter') {
                handleSubmittedNo();
                return
            }

            console.log(input);
            updateGuessedNumbers(input);
        }
        
    }



















})
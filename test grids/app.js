/* let cols = 3;
let rows = 4; */

// TEST ONE


document.addEventListener('DOMContentLoaded', () => {
    buildGrid(3,3);
    // buildGrid(3,3);

    function buildGrid(rows,cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let boardOne = document.querySelector('.board-1');
                boardOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square','container','animate__animated');
                square.id = (i * (cols * 3)) + (j + ((0 * cols) + 1));
                square.textContent = `${square.id}`;
                boardOne.appendChild(square);
    
            }
        }
    
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let boardTwo = document.querySelector('.board-2');
                boardTwo.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square','container','animate__animated');
                square.id = (i * (cols * 3)) + (j + ((1 * cols) + 1));
                square.textContent = `${square.id}`;
                boardTwo.appendChild(square);
    
            }
        }
    
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let boardThree = document.querySelector('.board-3');
                boardThree.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square','container','animate__animated');
                square.id = (i * (cols * 3)) + (j + ((2 * cols) + 1));
                square.textContent = `${square.id}`;
                boardThree.appendChild(square);
    
            }
        }
    }
})


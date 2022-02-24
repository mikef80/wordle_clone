/* let cols = 3;
let rows = 4; */

// TEST ONE


document.addEventListener('DOMContentLoaded', () => {
    // buildGrid(1,3);
    buildGrid(3,3);

    function buildGrid(rows,cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let gridOne = document.querySelector('.test1');
                gridOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square');
                // square.id = (i * cols) + (j + 1);
                // square.id = (i * (cols * 3)) + (j + 1);
                square.id = (i * (cols * 3)) + (j + ((0 * cols) + 1));
                square.textContent = `${square.id}`;
                // square.textContent = `${square.id} (${i}, ${j})`;
                // square.textContent = `i:${i}, j:${j}`;
                gridOne.appendChild(square);
    
            }
        }
    
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let gridOne = document.querySelector('.test2');
                gridOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square');
                // square.id = (i * cols) + (j + 1);
                // square.id = (i * (cols * 3)) + (j + 4);
                square.id = (i * (cols * 3)) + (j + ((1 * cols) + 1));
                square.textContent = `${square.id}`;
                // square.textContent = `${square.id} (${i}, ${j})`;
                // square.textContent = `i:${i}, j:${j}`;
                gridOne.appendChild(square);
    
            }
        }
    
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
    
                let square = document.createElement('div');
                let gridOne = document.querySelector('.test3');
                gridOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
                square.classList.add('square');
                // square.id = (i * cols) + (j + 1);
                // square.id = (i * (cols * 3)) + (j + 7);
                square.id = (i * (cols * 3)) + (j + ((2 * cols) + 1));
                square.textContent = `${square.id}`;
                // square.textContent = `${square.id} (${i}, ${j})`;
                // square.textContent = `i:${i}, j:${j}`;
                gridOne.appendChild(square);
    
            }
        }
    }
})


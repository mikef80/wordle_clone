let cols = 3;
let rows = 3;
let n = 0;

// TEST ONE

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

        let square = document.createElement('div');
        let gridOne = document.querySelector('.test1');
        gridOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        square.classList.add('square');
        // square.id = (i * cols) + (j + 1);
        // square.id = (i) + (j + 1);
        square.id = n;
        n++;
        square.textContent = `${square.id} (${i}, ${j})`;
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
        // square.id = (i) + (j + 4);
        square.id = n;
        n++;
        square.textContent = `${square.id} (${i}, ${j})`;
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
        // square.id = (i) + (j + 7);
        square.id = n;
        n++;
        square.textContent = `${square.id} (${i}, ${j})`;
        // square.textContent = `i:${i}, j:${j}`;
        gridOne.appendChild(square);

    }
}
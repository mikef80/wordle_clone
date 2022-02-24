document.addEventListener('DOMContentLoaded', () => {

    const colours = document.querySelector('.colours');
    const grid = document.querySelector('.grid');

    let array = [];
    

    // TARGET DATE
    const target = new Date('12/31/2022');
    // TODAY'S DATE
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    // CALCULCATE TIME DIFFERENCE IN DAYS
    let timeDiff = target.getTime() - today.getTime();
    const mill = 1000 * 3600 * 24;
    let dayDiff = Math.ceil(timeDiff / mill);    
    let ddSqrt = Math.sqrt(dayDiff);
    let noOfDaysToCalc = Math.pow(Math.ceil(ddSqrt), 2);

    let gridRowCols = Math.ceil(Math.sqrt(dayDiff));
    let height = window.innerHeight;
    let width = window.innerWidth;

    let sqDim = height / gridRowCols;
    grid.style.gridTemplateColumns = `repeat(${gridRowCols}, 1fr)`;
        
    for (let i = 0; i < noOfDaysToCalc; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
    
        let output = `rgb(${r}, ${g}, ${b})`;
        // let arrOP = `[${r}, ${g}, ${b}]`;
        let arrOP = [r, g, b];
        // console.log(arrOP);
        array.push(arrOP);

        let node = document.createElement('div');
        node.classList.add('swatch');
        node.id = i;
        node.style.height = `${sqDim}px`;
        node.style.width = `${sqDim}px`;
        
        node.style.backgroundColor = `${output}`;

        colours.appendChild(node);
    }

    // console.log(array);
    const array2 = JSON.stringify(array);
    console.log(array2);
})


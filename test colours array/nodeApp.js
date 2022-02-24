let array = [];
let output;

const test = () => {
    
    
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
    
        
    for (let i = 0; i < noOfDaysToCalc; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
    
        
        let arrOP = `(${r}, ${g}, ${b})`;
        // console.log(arrOP);
        array.push(arrOP);
    }

    output = array.join(',')
}

test();

// OUTPUT TO FILE

const fs = require('fs');

const content = 'hello, world';

fs.writeFile('./test.txt', output, err => {
    if(err) {
        console.log(err);
        return;
    }
})
// THIS MAKES THE GAME LOAD ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {

    let masterColorArray = ["096188188","048107107","164208208","069237237","056209209","239145145","228151151","005253253","055070070","085231231","169018018","236250250","113213213","117127127","077111111","149023023","209210210","053088088","029147147","150143143","128234234","176225225","180005005","251068068","138023023","218135135","080007007","000048048","166113113","097088088","180047047","036013013","090021021","170138138","193200200","057121121","080060060","029042042","092174174","244008008","069121121","010212212","185164164","244128128","051162162","123065065","046055055","204181181","079108108","157196196","113045045","213226226","138217217","242228228","085155155","136150150","083053053","031026026","177128128","209001001","253105105","251013013","135065065","053091091","003074074","217133133","120085085","017213213","172229229","213228228","225054054","037026026","013190190","149234234","085223223","200240240","131136136","004027027","085248248","235017017","069082082","112158158","206086086","161249249","109240240","115056056","070183183","218023023","152046046","202216216","121106106","074074074","162139139","228093093","155137137","131068068","091052052","237018018","041049049","065195195","069243243","105220220","011209209","224165165","166217217","165040040","028253253","202041041","225214214","198030030","055133133","043140140","036179179","216190190","216015015","169173173","019065065","204171171","003255255","138076076","124251251","052178178","140109109","165097097","053191191","179185185","030134134","085053053","082098098","096028028","240045045","012003003","077179179","107250250","178080080","214077077","042077077","194018018","255180180","181148148","200216216","022254254","007082082","058243243","022156156","182060060","027110110","168137137","244064064","145025025","103229229","126115115","109194194","130090090","086082082","092218218","239221221","112103103","009100100","126235235","101060060","239099099","098000000","186112112","208207207","129111111","249231231","138054054","206192192","253002002","072160160","071170170","057250250","114216216","091252252","247006006","041226226","020106106","090184184","133235235","207022022","022036036","121086086","245063063","232099099","137125125","118072072","063236236","072253253","097102102","131022022","058131131","148207207","110238238","181157157","170016016","134019019","029179179","219092092","113037037","052002002","125200200","094179179","152135135","161102102","072036036","097245245","131230230","112024024","167217217","149077077","107159159","223250250","136242242","065246246","052129129","156072072","007227227","227195195","144018018","222038038","056084084","123193193","119161161","080166166","188011011","084004004","048096096","159052052","209162162","073020020","244125125","254222222","104098098","218227227","254152152","161129129","151175175","024231231","028031031","101082082","134111111","149124124","107135135","247185185","121159159","234240240","242198198","100170170","207112112","039027027","248201201","238022022","143118118","158163163","111216216","002078078","203120120","006179179","193123123","249069069","085140140","190163163","164005005","102186186","100226226","002057057","101117117","189231231","080015015","224227227","149043043","120220220","220000000","016026026","057250250","158182182","169111111","100191191","226124124","020122122","219142142","076133133","227228228","018140140","236224224","084162162","227093093","059070070","049243243","058219219","034055055","232203203","163219219","023137137","202193193","235251251","035104104","040167167","061032032","054105105","110134134","131033033","149235235","103063063","138119119","084132132","243018018","114089089","190014014","050227227","148120120","073077077","100172172","255118118","231187187","080063063","080005005","126045045","174107107","245134134","019200200","078141141","131207207","071060060","005220220","011249249","070024024","077095095","185014014","223226226","036028028","081032032","237083083","210241241","194027027","245229229","165251251","148132132","032131131","250121121","197253253","074174174","030127127","168085085","101016016","216210210","157092092","065218218","157235235","044211211","132072072","095232232","116172172","008185185","074170170","136241241","086176176","081222222","090152152","218171171","190096096","171230230","156059059","117064064"];

    let answer;
    let outputAnswer;
    // sets number of rows and columns
    const rows = 5;
    const cols = 9;
    let currentLife = 1;
    let checkpoint = 0;
    let currentColour = 0;
    
    buildGrid(rows,3);
    setSwatch();
    updateStats();
    // initLocalStorage();

    const keys = document.querySelectorAll('.keyboard-row button');
    
    const guessedRGB = [[]];
    let currentSquareNo = 1;
    let guessCount = 0;
    // let swatchColour = '';
    

    /* function initLocalStorage() {
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



    } */
    
    function setSwatch() {
        let today = new Date();
        let yearBegin = new Date(2022, 0, 15);
        let msPassed = today - yearBegin;
        let millisecsInDay = 1000 * 60 * 60 * 24;
        let daysPassed = Math.floor(msPassed / millisecsInDay);

        answer = masterColorArray[daysPassed];

        let swatchColour = `rgb(${answer[0]}${answer[1]}${answer[2]},${answer[3]}${answer[4]}${answer[5]},${answer[6]}${answer[7]}${answer[8]})`;
        outputAnswer = swatchColour;

        console.log(answer);
        const swatch = document.querySelector('.colour.target');
        swatch.style.backgroundColor = swatchColour;
        currentColour = answer;
        
        
      
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

      const digitInThatPosition = Number(answer.charAt(index));
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
        // ADD MAX STREAK
        window.alert('Congratulations!');
        const totalWins = window.localStorage.getItem('totalWins') || 0;
        window.localStorage.setItem('totalWins', Number(totalWins) + 1);
        const currentStreak = window.localStorage.getItem('currentStreak') || 0;
        window.localStorage.setItem('currentStreak', Number(currentStreak) + 1);
        
        
        updateTotalGames();
        updateLastPlayedDate();
        updateStats();
        return;
      }

      if (guessedRGB.length === rows) {
        window.alert(`Sorry, you have no more guesses! The answer is ${outputAnswer}`);
        document.getElementById('test').textContent = outputAnswer;
        window.localStorage.setItem('currentStreak', Number(0));

        
        const totalLosses = window.localStorage.getItem('totalLosses') || 0;
        window.localStorage.setItem('totalLosses', Number(totalLosses) + 1);

        updateTotalGames()
        updateLastPlayedDate();
        updateStats();
        return
      }

      guessedRGB.push([]);

    }


    // update total games
    function updateTotalGames() {
      const totalGames = window.localStorage.getItem('totalGames') || 0;
      window.localStorage.setItem('totalGames', Number(totalGames) + 1);
    }

    function updateLastPlayedDate() {
      const lastPlayedDate = window.localStorage.getItem('lastPlayedDate') || 0;
      window.localStorage.setItem('lastPlayedDate', new Date().toLocaleDateString());
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
    function buildGrid(rows,cols) {
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
  
              let square = document.createElement('div');
              let boardOne = document.querySelector('.board-1');
              boardOne.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
              square.classList.add('square','container','animate__animated');
              square.id = (i * (cols * 3)) + (j + ((0 * cols) + 1));
              // square.textContent = `${square.id}`;
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
              // square.textContent = `${square.id}`;
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
              // square.textContent = `${square.id}`;
              boardThree.appendChild(square);
  
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
      let stats = document.querySelector('.score-modal');
      console.log('show scores modal');
      stats.classList.toggle('show');
    }

    // UPDATE STATS SECTION

    function updateStats() {
      const played = document.querySelector('.played-number');
      const winPercentage = document.querySelector('.win-percent');
      const currentStreak = document.querySelector('.current-streak');
      const maxStreak = document.querySelector('.max-streak');

      winPercentage.textContent = Math.floor(Number(window.localStorage.getItem('totalWins')) / Number(window.localStorage.getItem('totalGames')) * 100);
      
      let currentStreakLS = window.localStorage.getItem('currentStreak') || 0;
      let maxStreakLS = window.localStorage.getItem('maxStreak') || 0;
      
      console.log(currentStreakLS);
      console.log(maxStreakLS);


      let maxStreakVar = (currentStreakLS > maxStreakLS) ? currentStreakLS : maxStreakLS;
      maxStreak.textContent = maxStreakVar;
      window.localStorage.setItem('maxStreak', maxStreakVar);
      console.log('max' + maxStreakVar);

      played.textContent = window.localStorage.getItem('totalGames') || 0;
      // winPercentage.textContent = window.localStorage.getItem('winPercentage') || 0;
      currentStreak.textContent = window.localStorage.getItem('currentStreak') || 0;
      // maxStreak.textContent = window.localStorage.getItem('maxStreak') || 0;
    }
    
    // SHOW STUFF
    let showInfo = document.querySelector('#info');
    showInfo.addEventListener('click', toggleInfo);

    let showHelp = document.querySelector('#help');
    showHelp.addEventListener('click', toggleHelp);
    
    let showStats = document.querySelector('#stats');
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
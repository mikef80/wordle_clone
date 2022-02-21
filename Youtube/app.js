document.addEventListener('DOMContentLoaded', () => {
    createSquares();
    getNewWord();

    const guessedWords = [[]];
    let availableSpace = 1;

    let word;
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');
    console.log(keys);

    // FUNCTION TO LINK INTO WORDS API
    function getNewWord() {
        fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`, 
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "64f80d2564msh73449ee9d81cf3bp1c54fajsn462b9424a894"
            }
        }
        )
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            word = res.word;
            word = 'hello'; //FOR TESTING PURPOSES ONLY
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    function getCurrentWordArr() {
        const numberofGuessedWords = guessedWords.length;
        return guessedWords[numberofGuessedWords - 1];
    }
    
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);
            
            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace += 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColour(letter, index) {
        const isCorrectLetter = word.includes(letter);
        // trying to change keyboard colour in here
                    
        const letterKB = document.querySelector(`[data-key=${letter}]`)
                    
        // end of attempt

        if (!isCorrectLetter) {
            letterKB.style.backgroundColor = 'rgb(20, 20, 20)'; // MORE STARTING HERE TOO
            letterKB.style.color = 'rgb(100, 100, 100)';
            const ltr = keys.indexOf('letter');
            keys[ltr].classList.add('removed'); // UP TO HERE
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"
        }


        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !== 5) {
            window.alert('Word must be 5 letters');
        }

        const currentWord = currentWordArr.join('');

        //  CHECK WORD IS A REAL WORD
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, 
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "64f80d2564msh73449ee9d81cf3bp1c54fajsn462b9424a894"
            }
        }).then((res) => {
            if(!res.ok) {
                throw Error()
            }

            const firstLetterId = guessedWordCount * 5 + 1;
            const interval = 200;
            
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColour = getTileColour(letter, index);
    
                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add('animate__flipInX');
                    letterEl.style = `background-color:${tileColour}; border-color:${tileColour}`;
    
                }, interval * index);
            })
    
            guessedWordCount += 1;
    
            if (currentWord === word) {
                window.alert('Congratulations!');
            }
    
            if(guessedWords.length === 6) {
                window.alert(`Sorry, you have no more guesses! The word is ${word}`);
            }
    
            guessedWords.push([]);

        }).catch(() => {
            window.alert('Word is not recognised!');
        })

    }
    
    function createSquares() {
        const gameBoard = document.getElementById('board');
        
        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add('animate__animated');
            square.setAttribute('id', index + 1);
            gameBoard.appendChild(square);
        }
    }
    

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }



    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute('data-key');

            if (target.classList.contains('removed')) {
                return;
            }

            if (letter === 'enter') {
                handleSubmitWord();
                return;
            }

            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }

            console.log(letter);
            updateGuessedWords(letter);
        }
    }


})
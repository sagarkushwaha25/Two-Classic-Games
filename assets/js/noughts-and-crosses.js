/* jshint esversion: 8 */

/*Certain portions of this code, although altered to fit what I wanted for this project, where taken from another project by developess on github, https://github.com/developess/Noughts-and-Crosses
The reason for this was that I was struggling to find a solely javascript version of noughts and crosses as others used Python or Jquery.*/


const message = document.querySelector('.message');
const boxes = document.querySelectorAll('.box');
const restart = document.querySelector('.restart');

let icon = 'X';

/* This is the section for differentiating who's turn it is*/ 

const toggle = () => {
    if ( icon === 'X') {
        icon ='O';
        message.innerHTML = "<h2>Nought's turn</h2>";
    }
    else {
        icon = 'X';
        message.innerHTML = "<h2>Cross's turn</h2>";
    }
};

/*This will produce the respective icon in the box when a player clicks on it*/ 

boxes.forEach( (el) => {el.addEventListener('click',
    () => {
        if ( !el.innerHTML ) {
            el.innerHTML = `<h3>${icon}</h3>`;
            toggle();
            checkForWinner();
        }
    });
});

/*This will reset the board when the "restart the game" button is clicked*/ 

const restartBoard = () => {
    boxes.forEach(box => {
        box.innerHTML = '';
        box.disabled = false;
        box.classList.remove("disabled");
    });
    restartHighlight();
    icon='X';
    message.innerHTML = `<h2>Crosses starts</h2>`;
    winCode = null;
};

restart.addEventListener('click', restartBoard);

/*This will compare the current gamestate to the winning arrays
If one player gets three in a row, the game will compare that to the winningArrays and declare a winner */ 
const checkForWinner = () => { 
    let xArray =[];
    let oArray =[];
    boxes.forEach(
        (box) => {
            if (box.textContent) {
                if (box.textContent == 'X') {
                    xArray.push(parseInt(box.id));
                }
                if (box.textContent == 'O') {
                    oArray.push(parseInt(box.id));
                }
            }
        }
    );

    if (xArray.length >= 3 && compareToWinningArrays(xArray)) {
        crossesScore();
        declareWinner("Crosses");
    } else if
        (oArray.length >= 3 && compareToWinningArrays(oArray)) {
        noughtScore();
        declareWinner("Noughts");
    } else if
        (xArray.length + oArray.length === 9) {
        declareWinner("Nobody");
    }
};

let winCode = null;

/*After every turn, this checks for a winning combination*/ 

const compareToWinningArrays = (playerArray) => {
    let final = false;
    winningArrays.forEach(
        (combo) => {
            let outcome = true;
            for(let i = 0; i < 3; i++) {
                if (playerArray.indexOf(combo[i]) == -1)
                    outcome = false;
            }
            if (outcome) {
                winCode = combo;
                final = true;
            }
        }
    );
    if (final) return true;
};

/*This is a list of all the different winning combinations*/ 

const winningArrays =[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]];

/*This will declare a winner in the messages box at the top of the screen*/

function declareWinner(win) {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.add("disabled");
    });
    message.innerHTML = `<h2>${win} wins!</h2>`;
    highlight();
}



/*This highlights the winning combination*/ 

const highlight = () => {
    if (winCode) {
        for(let i = 0; i < 3; i++) {
            let id = `${winCode[i]}`;
            const el = document.getElementById(id);
            el.style.background = "lightgreen";
        }
    }
};

/*This clears the highlights on the board when the game is reset*/ 

const restartHighlight = () => {
    boxes.forEach(
        (box) => {
            box.style.background = "white";
        }
    );

};

/*These are the functions for increasing the score for when one of the players wins*/ 


function crossesScore() {
    let oldcrossesScore = parseInt(document.getElementById("c-count").innerText);
    document.getElementById("c-count").innerText = ++oldcrossesScore;

} 

function noughtScore() {
    let oldnoughtsScore = parseInt(document.getElementById("n-count").innerText);
    document.getElementById("n-count").innerText = ++oldnoughtsScore; 
}
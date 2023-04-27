const board = document.querySelector(".board");
const scorecard = document.querySelector(".score");
const highscorecard = document.querySelector(".highscore");

let gameover = false;
let foodx, foody;
let snakex = 5, snakey = 5;
let snakebody = [];
let speedx = 0, speedy = 0;
let setIntervalid;
let score = 0; 
let highscore = localStorage.getItem("highscore") || 0;
highscorecard.innerText = `High Score - ${highscore}`;

const foodpos = () => {
    foodx = Math.floor(Math.random() * 25) + 1;
    foody = Math.floor(Math.random() * 25) + 1;
}

const handlegameover = () => {
    clearInterval(setIntervalid);
    alert("Game Over...Press OK to replay...")
    location.reload();
}
const changeDir = (e) => {
    if(e.key === "ArrowUp" && speedy != 1){
        speedx = 0;
        speedy =-1;
    }else if(e.key === "ArrowDown" && speedy != -1){
        speedx = 0;
        speedy = 1;
    }else if(e.key === "ArrowLeft" && speedx != 1){
        speedx = -1;
        speedy = 0;
    }else if(e.key === "ArrowRight" && speedx != -1){
          speedx = 1;
        speedy = 0;
    }
}


const initGame = () => {
    if(gameover) return handlegameover();
    let htmlMarkup = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`;
    
    if(snakex === foodx && snakey === foody){
        foodpos();
        snakebody.push([foodx,foody]);
        score++;

        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("highscore",highscore);
        scorecard.innerText = `Score - ${score}`;
        highscorecard.innerText = `High Score - ${highscore}`;
    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i-1];
        
    } 

    snakebody[0] = [snakex,snakey];
    snakex += speedx;
    snakey += speedy;
    
    if(snakex <= 0 || snakex > 25 || snakey <= 0 || snakey > 25){
        gameover = true;
    }

    for (let i = 0; i < snakebody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameover = true;
        }
    }

    
    board.innerHTML = htmlMarkup;
}
foodpos();
setIntervalid = setInterval(initGame,125);

document.addEventListener("keydown",changeDir);
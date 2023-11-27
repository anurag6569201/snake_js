let playground=document.querySelector(".play");
let scoreupdate=document.querySelector(".score");
let highscoreupdate=document.querySelector(".highscore");
let controls=document.querySelectorAll(".controls img")
let gameover=false;
let foodX,foodY;
let snakeX=12,snakeY=4;
let velocityX=0,velocityY=0;
let score=0;
let highscore=0;
let snakebody =[];
let clearinitid;

let highscostrg=localStorage.getItem("highscoreupdate")||0;
highscoreupdate.innerHTML=highscostrg;
const start=()=>{
    if(gameover) return handlegameover();
    let snakefooddiv=`<div class="snakefood" style="grid-area:${foodY}/${foodX}"></div>`;
    snakeX+=velocityX;
    snakeY+=velocityY;
    if(snakeX===foodX && snakeY===foodY){
        randfood();
        scoreupdate.innerHTML=score+=5;
        highscore = score>highscore? score:highscore;
        localStorage.setItem("highscoreupdate",highscore);
        
        console.log(highscore);
        snakebody.push([foodX,foodY]);
    }
    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
    }
    snakebody[0]=[snakeX,snakeY];

    for(let i=0;i<snakebody.length;i++){
        snakefooddiv+=`<div class="snakebody" style="grid-area:${snakebody[i][1]}/${snakebody[i][0]}"></div>`;
        if(i!==0 && snakebody[0][1]===snakebody[i][1] && snakebody[0][0]===snakebody[i][0]){
            gameover=true;
        }
    }
    playground.innerHTML=snakefooddiv;

    if(snakeX<=0 || snakeX>29 || snakeY<=0 || snakeY>29){
        gameover=true;
    }
}

const randfood=()=>{
    foodX=Math.floor(Math.random()*30+1);
    foodY=Math.floor(Math.random()*30+1);
    console.log(`${foodX} and ${foodY}`);
}
const handlegameover=()=>{
    clearInterval(clearinitid);
    alert("gameover");
    location.reload();
}
const changeposition=(button)=>{
    if(button.key==="ArrowLeft" && velocityX !=1){
        velocityX=-1;
        velocityY=0;
    }else if(button.key==="ArrowRight" && velocityX !=-1){
        velocityX=1;
        velocityY=0;
    }else if(button.key==="ArrowDown" && velocityY !=-1){
        velocityX=0;
        velocityY=1;
    }else if(button.key==="ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;
    }
}
controls.forEach(key=>{
    key.addEventListener('click',()=>{
        changeposition({key:key.dataset.key});
    })
})
randfood();
clearinitid=setInterval(start,200);

document.addEventListener('keydown',changeposition);
start();
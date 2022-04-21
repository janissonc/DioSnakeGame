let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let info = {
    nivel:1,
    pontos:0,
    perdas:0,
    paradas:0,
    recorde:0
}
let jogo;
snake[0] = {
    x: 8*box,
    y: 8*box
}
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box)
}

function criarSnake(){
    for(i = 0; i< snake.length;i++ ){
        context.fillStyle = "green";
        context.fillRect(snake[i].x,snake[i].y,box,box)
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y,box,box)
}

document.addEventListener('keydown',update)

function update(event){
    console.log(event.keyCode)
    if(event.keyCode === 37 && direction !== 'right') direction = 'left';
    if(event.keyCode === 38 && direction !== 'up') direction = 'down';
    if(event.keyCode === 39 && direction !== 'left') direction = 'right';
    if(event.keyCode === 40 && direction !== 'down') direction = 'up';
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction === 'right'){
        gameOver('perdeu');
    } 
    if(snake[0].x < 0 && direction === 'left') gameOver('perdeu');
    if(snake[0].y > 15 * box && direction === 'up') gameOver('perdeu');
    if(snake[0].y < 0 && direction === 'down') gameOver('perdeu');


    for(i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y ){
            gameOver('perdeu');
        }
    }

    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;


    if(snakeX !== food.x || snakeY !== food.y){
        snake.pop();
    }else{
        info.pontos++;
        if(info.recorde < info.pontos){ 
            info.recorde = info.pontos;
            $("#recorde").text(info.recorde);
        }

        $("#pontos").text(info.pontos);
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
        drawFood();
    }

    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}


iniciarJogo();

let jogoIniciado = false;
let btnIniciar = $('#btnInit');
let btnStop = $('#btnStop');

btnStop.click(()=>{
    snake = [];
    snake[0] = {
        x: 8*box,
        y: 8*box
    }
    gameOver('parou')
});

btnIniciar.click(()=>{
    console.log('clicou')
    if(jogoIniciado){
        snake = [];
        snake[0] = {
            x: 8*box,
            y: 8*box
        }
        info.pontos = 0;
        $("#pontos").text(info.pontos)
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo,100)
    }else{
        jogoIniciado = true;
        btnIniciar.text('Reiniciar')
        jogo = setInterval(iniciarJogo,100)
    }
    
})

function gameOver(validate){
    if(validate === 'perdeu'){
        info.perdas++;
        $("#perdas").text(info.perdas);
        info.pontos = 0;
        $("#pontos").text(info.pontos)
        snake = [];
        snake[0] = {
            x: 8*box,
            y: 8*box
        }
        clearInterval(jogo);
        iniciarJogo();
    }else{
        info.paradas++;
        $("#paradas").text(info.paradas);
        info.pontos = 0;
        $("#pontos").text(info.pontos)
        snake = [];
        snake[0] = {
            x: 8*box,
            y: 8*box
        }
        clearInterval(jogo);
        iniciarJogo();
    }
}





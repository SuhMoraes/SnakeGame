let canvas = document.getElementById("snake")
let context = canvas.getContext("2d");
/*Tamanho da box */
let box = 32;

 /* criando a cobrinha - seu tamanho*/
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
/* Criando as direções dos movimentos*/
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

/* Pontuação do jogo*/
let score = 0;

function criarBG(){
  context.fillStyle ="#74c69d";
  context.fillRect(0, 0, 16 * box, 16 * box); //Desenha o local onde acontece o jogo
}
function criarCobrinha(){
  for(i=0; i < snake.length; i++) {
    context.fillStyle = "#081c15";
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = "#ff0000";
  context.fillRect(food.x, food.y, box, box)
}

 document.addEventListener('keydown', update);

 function update(event){
      if(event.keyCode == 37 && direction != 'right') direction = 'left';
      if(event.keyCode == 38 && direction != 'down') direction = 'up';
      if(event.keyCode == 39 && direction != 'left') direction = 'right';
      if(event.keyCode == 40 && direction != 'up') direction = 'down';
 }


/* Iniciando o jogo */
function iniciarJogo(){
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++) {
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Game Over :( Pontuação: ' + score);
      }
  }

  /* Função de pontuação*/
  function drawScore() {
    context.fillStyle = "black";
    context.font = "12px Verdana";
    context.fillText("Score " + score, canvas.width-60, 20);
  }


  criarBG();
  criarCobrinha();
  drawFood();
  drawScore();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == 'right') snakeX += box;
  if(direction == 'left') snakeX -= box;
  if(direction == 'up') snakeY -= box;
  if(direction == 'down') snakeY += box;
  
  if(snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box   
   score++;
  }  

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
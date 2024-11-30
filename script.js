

let inpDir = { x: 0, y: 0 };
let foodsound = new Audio("./music/food.mp3");
let gameoversound = new Audio("./music/gameover.mp3");
let movesound = new Audio("./music/move.mp3");
let music = new Audio("./music/music.mp3");
const speed = 5;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  // game loop very important we can control fps

  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if you bump into yourself

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >18 ||
    snake[0].x <= 0 ||
    snake[0].y > 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  // part 1 updating snake body part array

  if (isCollide(snakeArr)) {
    gameoversound.play();

    music.pause();

    inpDir = { x: 0, y: 0 };
    alert("  game over press any key to restart again ");
    snakeArr = [{ x: 13, y: 15 }];
    music.play();
    score = 0;
  }

  // render the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  //   if you have eaten the food increment the score and regernrate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;

    if (score > highscoreval) {
        highscoreval=score
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
        highscorebox.innerHTML = " highscore " + highscoreval;
    }
    scoreBox.innerHTML = `score:${score}`;
    foodsound.play();

    snakeArr.unshift({
      x: snakeArr[0].x + inpDir.x,
      y: snakeArr[0].y + inpDir.y,
    });

    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inpDir.x;
  snakeArr[0].y += inpDir.y;
  // part 2 Display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

music.play();
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highscorebox.innerHTML = " highscore " + highscore;
}
// animation render logic  bcz it keep painting
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inpDir = { x: 0, y: 1 };
  // start game

  movesound.play();

  switch (e.key) {
    case "ArrowUp":
      inpDir.x = 0;
      inpDir.y = -1;
      console.log("ArrowUp");

      break;
    case "ArrowDown":
      inpDir.x = 0;
      inpDir.y = 1;
      console.log("ArrowDown");

      break;
    case "ArrowLeft":
      inpDir.x = -1;
      inpDir.y = 0;
      console.log("ArrowLeft");

      break;
    case "ArrowRight":
      inpDir.x = 1;
      inpDir.y = 0;
      console.log("ArrowRight");

      break;

    default:
      break;
  }
});

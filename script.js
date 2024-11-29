let direction = { x: 0, y: 0 };
let foodsound = new Audio("./music/food.mp3");
let gameoversound = new Audio("./music/gameover.mp3");
let movesound = new Audio("./music/move.mp3");
let music = new Audio("./music/music.mp3");
const speed = 2;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 13, y: 15 };
function main(ctime) {
  window.requestAnimationFrame(main);
  console.log(ctime);
  // game loop very important we can control fps

  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
}

function gameEngine() {
  // part 1 updating snake body part array

  // render the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
       snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head");
    }
 
    board.appendChild(snakeElement);
  });

  // Display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// animation render logic  bcz it keep painting
window.requestAnimationFrame(main);

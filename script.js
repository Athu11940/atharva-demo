const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20; // Size of each grid square
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

// Snake and food
let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Initial direction (not moving)
let score = 0;

// Game loop
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100); // Adjust speed here
}

// Update game state
function update() {
  // Move snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap snake around the screen
  if (head.x < 0) head.x = tileCount - 1;
  if (head.x >= tileCount) head.x = 0;
  if (head.y < 0) head.y = tileCount - 1;
  if (head.y >= tileCount) head.y = 0;

  // Check for collision with itself
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  // Add new head to snake
  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    // Remove tail if no food eaten
    snake.pop();
  }
}

// Draw game elements
function draw() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Draw score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Place food randomly
function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);

  // Ensure food doesn't spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Reset game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();
}

// Handle keyboard input
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Start the game
placeFood();
gameLoop();
import { Ball } from "./ball.js";
import { Bat } from "./bat.js";
import { setupCanvas, drawBall, drawBat, clearCanvas } from "./canvas.js";
import { listenToKeyEvents } from "./keyboardEvents.js";
import { detectEdgeCollision, detectBatCollision, detectBatEdgeCollision } from "./collision.js";
import { functions, Stream, Observer } from "../../sparky/module.js";
import { randomNumInrange, resolveCollision } from "./utils.js";
import { winner, btn } from "./btn.js";

const canvasNode = document.querySelector(".pong");
const canvasNodeWidth = 1000;
const ctx = setupCanvas(canvasNode);
functions.pong = function() {
  return Stream.of({ bat1, bat2 });
};

// onload
window.onload = function() {
  Observer(bat1).score = 0;
  Observer(bat2).score = 0;
  ball.velocity.x = 0;
  ball.velocity.y = 0;
};

// start game function

btn.addEventListener("click", startGame);

export function startGame() {
  Observer(bat1).score = 0;
  Observer(bat2).score = 0;
  winner.textContent = "";
  ball.velocity.x = 3;
  ball.velocity.y = (Math.random() - 0.5) * 5;
}

// create the models

const ball = new Ball(
  canvasNode.width / 2,
  randomNumInrange(50, canvasNode.height - 50),
  10,
  "red"
);
const bat1 = new Bat(50, canvasNode.height / 2 - 25, 50, 50, "gray", 0);
const bat2 = new Bat(
  canvasNode.width - bat1.width - 50,
  canvasNode.height / 2 - 25,
  50,
  50,
  "gray",
  0
);

// set up the controllers which mean what the users are doing
// click startGameBtn

// player one
listenToKeyEvents(
  "w",
  () => {
    bat1.velocity.y = -4;
  },

  () => {
    bat1.velocity.y = 0;
  }
);

listenToKeyEvents(
  "s",
  () => (bat1.velocity.y = 4),
  () => (bat1.velocity.y = 0)
);
// player two
listenToKeyEvents(
  "up",
  () => {
    bat2.velocity.y = -4;
  },
  () => {
    bat2.velocity.y = 0;
  }
);
listenToKeyEvents(
  "down",
  () => (bat2.velocity.y = 4),
  () => (bat2.velocity.y = 0)
);

// the update section

function updateBallVelocityFromEdges(ball, width, height) {
  let count1 = 0;
  let count2 = 0;
  let currentScore1 = bat1.score;
  let currentScore2 = bat2.score;
  const collision = detectEdgeCollision(ball, width, height);
  if (!collision) return;
  // one of the player get a point reset the position of the ball, update the score
  if (collision === "xRight") {
    count1 = count1 + 1;
    Observer(bat1).score = count1 + currentScore1;
    ball.x = canvasNode.width / 2;
    ball.y = randomNumInrange(50, canvasNode.height - 50);
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    setTimeout(() => {
      ball.velocity.x = 3;
      ball.velocity.y = (Math.random() - 0.5) * 5;
    }, 2000);
  }
  if (collision === "xLeft") {
    count2 = count2 + 1;
    Observer(bat2).score = count2 + currentScore2;
    ball.x = canvasNode.width / 2;
    ball.y = randomNumInrange(50, canvasNode.height - 50);
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    setTimeout(() => {
      ball.velocity.x = 3;
      ball.velocity.y = (Math.random() - 0.5) * 5;
    }, 2000);
  }

  if (collision === "y") {
    ball.velocity.y = -ball.velocity.y;
  }
}
function updateBatVelocityFromEdges(bat, height) {
  const collision = detectBatEdgeCollision(bat, height);
  if (!collision) return;
  if (collision === "yBottom") {
    bat.y = height - bat.height - bat.velocity.y; // add the velocity will prevent the bat pass the canvas border
  }
  if (collision === "yTop") {
    bat.y = 0 - bat.velocity.y;
  }
}
function theWinner() {
  if (bat1.score === 5) {
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    winner.textContent = `The Winner Is:
    Player One!!`;
  }
  if (bat2.score === 5) {
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    winner.textContent = `The Winner Is:
    Player two!!`;
  }
}

function updateBallVelocityFromBats(ball, bat1, bat2) {
  let collision = detectBatCollision(ball, bat1);

  if (collision === "x") {
    ball.velocity.x = -ball.velocity.x;
    ball.velocity.y =
      ball.velocity.y + ball.friction * (bat1.velocity.y + ball.velocity.y);

    return;
  }

  if (collision === "y") {
    // ball.velocity.y = -ball.velocity.y;
    if (bat1.velocity === 0) {
      ball.velocity.y = -ball.friction * (ball.velocity.y / 2);
    }
    if (bat1.velocity !== 0) {
      ball.velocity.x = ball.velocity.x;
      ball.velocity.y = ball.friction * (ball.velocity.y + bat1.velocity.y);
    }

    return;
  }

  collision = detectBatCollision(ball, bat2);

  if (collision === "x") {
    ball.velocity.x = -ball.velocity.x;
    ball.velocity.y =
      ball.velocity.y + ball.friction * (bat2.velocity.y + ball.velocity.y);
    return;
  }

  if (collision === "y") {
    // ball.velocity.y = -ball.velocity.y;
    if (bat2.velocity === 0) {
      ball.velocity.y =
        -ball.friction * ball.velocity.y - (1 / 2) * ball.velocity.y;
    }
    if (bat2.velocity !== 0) {
      // ball.velocity.x = ball.velocity.x;
      ball.velocity.y = ball.friction * (ball.velocity.y + bat2.velocity.y);
    }

    return;
  }
}

function update() {
  //  function edge detection collision
  updateBallVelocityFromEdges(ball, canvasNode.width, canvasNode.height);

  // function edge bat detection
  updateBatVelocityFromEdges(bat1, canvasNode.height);
  updateBatVelocityFromEdges(bat2, canvasNode.height);

  // function balls & bats detection
  updateBallVelocityFromBats(ball, bat1, bat2);

  // update models
  ball.move();
  bat1.move();
  bat2.move();
  theWinner();

  // draw the views
  clearCanvas(ctx, canvasNode.width, canvasNode.height);
  drawBall(ctx, ball);
  drawBat(ctx, bat1);
  drawBat(ctx, bat2);
}

// animation loop

function animate() {
  window.requestAnimationFrame(animate);

  update();
}
animate();

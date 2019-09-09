import { Ball } from "./ball.js";
import { Bat } from "./bat.js";
import { setupCanvas, drawBall, drawBat, clearCanvas } from "./canvas.js";
import { listenToKey } from "./keyboard.js";
import { detectEdgeCollision, detectBatCollision, detectBatEdgeCollision } from "./collision.js";
import { functions, Stream, Observer } from "../../sparky/module.js";
import { randomNumInrange, resolveCollision } from "./utils.js";

const canvasNode = document.querySelector(".pong");
const canvasNodeWidth = 1000;
const padding = 42;
const startVelocityX = 6;
const startVelocityY = 12;
const batVelocity = 5;
const unlisteners = [];
const ctx = setupCanvas(canvasNode);

let frameId = -1;

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

function call(fn) {
  fn();
}

function startGame() {
  unlisteners.forEach(call);
  unlisteners.length = 0;

  Observer(bat1).score = 0;
  Observer(bat2).score = 0;

  playGame((Math.random() - 0.5) > 0 ? startVelocityX : -startVelocityX, (Math.random() - 0.5) * startVelocityY);
}

function playGame(vx, vy) {
  unlisteners.forEach(call);
  unlisteners.length = 0;

  ball.x = canvasNode.width / 2;
  ball.y = canvasNode.height / 2;
  ball.color = '#ee2200';

  frameId = window.requestAnimationFrame(update);

  setTimeout(function() {
    ball.color = '#FE681F';

    setTimeout(function() {
      ball.color = '#B8C53F';

      setTimeout(function() {
        ball.velocity.x = vx;
        ball.velocity.y = vy;
      }, 600);
    }, 600);
  }, 600);
}


// create the models

const ball = new Ball(canvasNode.width / 2, randomNumInrange(50, canvasNode.height - 50), 18, "#6e7477");
const bat1 = new Bat(padding, canvasNode.height / 2 - 45, 30, 90, "#b0aead", 0);
const bat2 = new Bat(canvasNode.width - bat1.width - padding, canvasNode.height / 2 - 45, 30, 90, "#b0aead", 0);

// set up the controllers which mean what the users are doing
// click startGameBtn

// player two
listenToKey(
  "up",
  () => bat2.velocity.y = -batVelocity,
  () => bat2.velocity.y = 0
);

listenToKey(
  "down",
  () => bat2.velocity.y = batVelocity,
  () => bat2.velocity.y = 0
);

unlisteners.push(listenToKey("up", startGame));
unlisteners.push(listenToKey("down", startGame));


// the update section

function reset(ball, velocityX) {
    window.cancelAnimationFrame(frameId);

    ball.velocity.x = 0;
    ball.velocity.y = 0;
    ball.x = canvasNode.width / 2;
    ball.y = canvasNode.height / 2;
    ball.color = "#6e7477";

    const velocityY = (Math.random() - 0.5) * startVelocityY;

    unlisteners.push(listenToKey("up", () => playGame(velocityX, velocityY)));
    unlisteners.push(listenToKey("down", () => playGame(velocityX, velocityY)));
}

function updateScore(ball, bat1, bat2, width) {
    if (ball.x - ball.r > width) {
        // PLayer 1 scores
        Observer(bat1).score++;
        reset(ball, startVelocityX);
    }
    else if (ball.x + ball.r < 0) {
        // Player 2 scores
        Observer(bat2).score++;
        reset(ball, -startVelocityX);
    }
}

function updateBallVelocityFromEdges(ball, width, height) {
  const collision = detectEdgeCollision(ball, width, height);

  if (collision === "y") {
    ball.velocity.y = -ball.velocity.y;
  }
}

function updateBat1Velocity(ball, bat1) {
    if (Math.abs(ball.y - (bat1.y + bat1.height / 2)) < 20) {
        bat1.velocity.y = bat1.velocity.y * 0.875;
        return;
    }

    bat1.velocity.y = ball.y > bat1.y + bat1.height / 2 ? batVelocity : -batVelocity ;
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

function render() {
  clearCanvas(ctx, canvasNode.width, canvasNode.height);
  drawBall(ctx, ball);
  drawBat(ctx, bat1);
  drawBat(ctx, bat2);
}

function update() {
  frameId = window.requestAnimationFrame(update);

  //  function edge detection collision
  updateBallVelocityFromEdges(ball, canvasNode.width, canvasNode.height);

  updateBat1Velocity(ball, bat1);

  // function edge bat detection
  updateBatVelocityFromEdges(bat1, canvasNode.height);
  updateBatVelocityFromEdges(bat2, canvasNode.height);

  // function balls & bats detection
  updateBallVelocityFromBats(ball, bat1, bat2);

  // update models
  ball.move();
  bat1.move();
  bat2.move();

  // Detect if player has scored a point
  updateScore(ball, bat1, bat2, canvasNode.width);

  // draw the views
  render();
}

// Initial view
reset(ball, (Math.random() - 0.5) > 0 ? startVelocityX : -startVelocityX);
render();

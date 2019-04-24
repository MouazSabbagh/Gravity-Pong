import { Ball } from "./ball.js";
import { Bat } from "./bat.js";
import { setupCanvas, drawBall, drawBat, clearCanvas } from "./canvas.js";
import { listenToKeyEvents } from "./keyboardEvents.js";
import { detectEdgeCollision, detectBatCollision } from "./collision.js";

// set up the views
const canvasNode = document.querySelector(".pong");
const ctx = setupCanvas(canvasNode);

// create the models

const ball = new Ball(100, 100, 10, "red");
const bat1 = new Bat(50, 50, 20, 20, "gray");
const bat2 = new Bat(canvasNode.width - 70, 50, 20, 20, "gray");

// set up the controllers which mean what the users are doing

// player one
listenToKeyEvents(
  "w",
  () => {
    bat1.velocity.y = -0.2;
  },

  () => {
    bat1.velocity.y = 0;
  }
);

listenToKeyEvents(
  "s",
  () => (bat1.velocity.y = 0.2),
  () => (bat1.velocity.y = 0)
);
// player two
listenToKeyEvents(
  "arrowUp",
  () => (bat2.velocity.y = -0.2),
  () => (bat2.velocity.y = 0)
);
listenToKeyEvents(
  "arrowDown",
  () => (bat2.velocity.y = 0.2),
  () => (bat2.velocity.y = 0)
);

// the update section
function updateBallVelocityFromEdges(ball, width, height) {
  const collision = detectEdgeCollision(ball, width, height);
  if (!collision) return;
  if (collision === "x") {
    // one of thplayer get a point reset the position of the ball, update the score
    console.log("ball hitng");
    return;
    s;
  }
  if (collision === "y") {
    ball.velocity.y = -ball.velocity.y;
    return;
  }
}
function updateBallVelocityFromBats(ball, bat1, bat2) {
  let collision = detectBatCollision(ball, bat1);

  if (collision === "x") {
    ball.velocity.x = -ball.velocity.x;
    return;
  }

  if (collision === "y") {
    ball.velocity.y = -ball.velocity.y;
    return;
  }

  collision = detectBatCollision(ball, bat2);

  if (collision === "x") {
    ball.velocity.x = -ball.velocity.x;
    return;
  }

  if (collision === "y") {
    ball.velocity.y = -ball.velocity.y;
    return;
  }
}

function update() {
  //  function edge detection collision
  updateBallVelocityFromEdges(ball, canvasNode.width, canvasNode.height);

  // function balls & bats detection
  updateBallVelocityFromBats(ball, bat1, bat2);

  // update models
  ball.move();
  bat1.move();
  bat2.move();

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

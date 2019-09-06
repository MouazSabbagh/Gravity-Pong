export function setupCanvas(canvasNode) {
  const ctx = canvasNode.getContext("2d");
  canvasNode.width = window.innerWidth / 2;
  canvasNode.height = window.innerHeight / 2;
  return ctx;
}

// this function is responsile for drawing the ball
//** */ the gaol of it will be flexable for many canvas
export function drawBall(ctx, ball) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

// this function is responsile for drawing the bat
export function drawBat(ctx, bat) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = bat.color;
  ctx.fillRect(bat.x, bat.y, bat.width, bat.height);
  ctx.closePath();
  ctx.restore();
}

// clearing the canvas during the animation

export function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

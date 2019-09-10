export function detectEdgeCollision(ball, width, height) {
  // if there is no collision it will return undefiend

  //if there is collision of the top or bottom edge we will return "y"
  if (ball.y + ball.r + ball.velocity.y >= height || ball.y - ball.r + ball.velocity.y <= 0) {
    return "y";
  }

  //if there is collision of the right or left edge we will return "x"
  if (ball.x + ball.r + ball.velocity.x > width) {
    return "xRight";
  }

  if (ball.x - ball.r + ball.velocity.x <= 0) {
    return "xLeft";
  }
}

export function detectBatEdgeCollision(bat, height) {
  if (bat.y + bat.height + bat.velocity.y > height) {
    return "yBottom";
  }

  if (bat.y + bat.velocity.y < 0) {
    return "yTop";
  }
}

export function detectBatCollision(ball, bat) {
  // If there is no collision return undefiend
  if (ball.x + ball.r + ball.velocity.x < bat.x) return;
  if (ball.x - ball.r + ball.velocity.x > bat.x + bat.width) return;
  if (ball.y + ball.r + ball.velocity.y < bat.y) return;
  if (ball.y - ball.r + ball.velocity.y > bat.y + bat.height) return;

  // If there is a collision on the right or left edge we will return "x"
  if (
    ball.y + ball.r + ball.velocity.y > bat.y &&
    ball.y - ball.r + ball.velocity.y < bat.y + bat.height
  ) {
    return "x";
  }

  // Otherwise the collision must be on the top or bottom edge, return "y"
  return "y";
}

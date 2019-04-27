export function detectEdgeCollision(ball, width, height) {
  // if there is no collision it will return undefiend

  //if there is collision of the top or bottom edge we will return "y"
  if (ball.y + ball.r + ball.velocity.y >= height || ball.y - ball.r <= 0) {
    return "y";
  }
  //if there is collision of the right or left edge we will return "x"
  if (ball.x + ball.r + ball.velocity.x > width) {
    return "xRight";
  }

  if (ball.x - ball.r <= 0) {
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
  // if there is no collision it will return undefiend
  if (ball.x + ball.r < bat.x) return;
  if (ball.x - ball.r > bat.x + bat.width) return;
  if (ball.y + ball.r < bat.y) return;
  if (ball.y - ball.r > bat.y + bat.height) return;
  //if there is collision of the right or left edge we will return "x"
  if (
    ball.y + ball.r + ball.velocity.y > bat.y &&
    ball.y - ball.r + ball.velocity.y < bat.y + bat.height
  ) {
    return "x";
  } else {
    return "y";
  }

  //if there is collision of the top of the bat or bottom edge we will return "y"
}

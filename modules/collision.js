export function detectEdgeCollision(ball, width, height) {
  // if there is no collision it will return undefiend

  if (ball.y + ball.r + ball.velocity.y >= height || ball.y - ball.r <= 0) {
    return "y";
  }
  //if there is collision of the top or bottom edge we will return "y"
  //if there is collision of the right or left edge we will return "x"
  if (ball.x + ball.r + ball.velocity.x > width || ball.x - ball.r <= 0) {
    return "x";
  }
}

export function detectBatCollision(ball, bat) {
  // if there is no collision it will return undefiend
  //if there is collision of the right or left edge we will return "x"
  //if there is collision of the top of the bat or bottom edge we will return "y"
}

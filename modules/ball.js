export class Ball {
  constructor(x, y, r, color) {
    this.color = color || "orange";
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = {
      x: (Math.random() - 0.5) * 20, // range between -0.5 and 0.5
      y: 3
    };
  }

  move() {
    if (
      this.x + this.r + this.velocity.x > canvas.width ||
      this.x - this.r <= 0
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      this.y + this.r + this.velocity.y >= canvas.height ||
      this.y - this.r <= 0
    ) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

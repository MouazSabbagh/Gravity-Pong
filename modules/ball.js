export class Ball {
  constructor(x, y, r, color) {
    this.color = color || "orange";
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = {
      x: (Math.random() - 0.5) * 20, // range between -0.5 and 0.5
      y: (Math.random() - 0.5) * 20
    };
    this.mass = 400;
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

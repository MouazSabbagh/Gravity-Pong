export class Bat {
  constructor(x, y, width, height, color, score) {
    this.color = color || "orange";

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.score = score || 0;
    this.mass = 30;
  }

  move() {
    this.y = this.y + this.velocity.y;
  }
}

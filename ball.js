export function Ball(left, top, width, height) {
  this.left = left || 0;
  this.top = top || 0;
  this.width = width || 0;
  this.height = height || 0;
  // in px/ms
  this.velocityLeft = 0.2;
  this.velocityTop = 0.2;
  this.acceleration = 0.2;
}
Ball.prototype.move = function(duration) {
  this.top = this.top + this.velocityTop * duration * this.acceleration;
  this.left = this.left + this.velocityLeft * duration;
};

Ball.prototype.type = "ball";

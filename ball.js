export function Ball(left, top, width, height) {
  this.left = left || 0;
  this.top = top || 0;
  this.width = width || 0;
  this.height = height || 0;

  // Speed in px/ms
  this.velocityLeft = 0.3 * Math.random();
  this.velocityTop = 0.3 * Math.random();

  // Acceleration in px/ms/ms
  this.accelerationLeft = 0;
  this.accelerationTop = 0.001;
}

Ball.prototype.move = function(duration) {

  // Update speed from acceleration
  this.velocityLeft = this.velocityLeft + this.accelerationLeft * duration;
  this.velocityTop  = this.velocityTop  + this.accelerationTop  * duration;

  // Update position from speed
  this.left = this.left + this.velocityLeft * duration;
  this.top  = this.top  + this.velocityTop  * duration;
};

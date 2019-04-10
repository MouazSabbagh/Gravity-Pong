export function Bat(left, top, width, height) {
  this.left = left || 0;
  this.top = top || 0;
  this.width = width || 0;
  this.height = height || 0;
  this.velocityLeft = 0;
  this.velocityTop = 0;
}
Bat.prototype.move = function(duration) {
  this.top = this.top + this.velocityTop * duration;
};

Bat.prototype.type = "bat";

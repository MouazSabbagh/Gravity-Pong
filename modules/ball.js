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
    this.friction = 0.2;
    this.mass = 400;
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}


import toPolar from '../../fn/module.js';
import difference from './vector.js';

const assign = Object.assign;
const create = Object.create;

function Ball(radius, color) {
    Actor.call(this);
    this.radius   = radius > 0 ? radius : 0 ;
    this.color    = color || 'black';
    this.friction = 0.2;
    this.mass     = 400;
}

Ball.prototype = assign(create(Actor.prototype), {
    // Return true if point is inside the ball
    contains: function(point) {
        const position = this.position;
        const polar    = toPolar(difference(position, point));
        return polar[0] <= this.radius;
    }
});


import { toPolar } from '../../fn/module.js';
import { difference } from './vector.js';
import Actor from './actor.js';

const assign = Object.assign;
const create = Object.create;

export function Ball(radius, color) {
    // Mix in
    Actor.call(this);

    // Properties
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

import { toPolar } from '../../fn/module.js';
import { difference } from './vector.js';

const assign = Object.assign;
const create = Object.create;

function Boundary(angle) {
    Actor.call(this);
    this.angle = angle || 0;
}

Boundary.prototype = assign(create(Actor.prototype), {
    // Return true if point is 'inside' boundary
    contains: function(point) {
        // Gradient a of y = ax + b
        const a = Math.tan(boundary.angle);

        // Constant b of y = ax + b
        const b = boundary.position.y - boundary.position.x * a;

        // Does pint lie above the line of our boundary? Crude, buggy, only
        // works in one direction
        return point.y > a * point.x + b ;
    }
});

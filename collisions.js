import { toPolar } from './fn/module.js';

function getAB(p0, p1) {
    // Gradient a of y = ax + b
    const a = (p1[1] - p0[1]) / (p1[0] - p0[0]);

    // Constant b of y = ax + b
    const b = p0[1] - a * p0[0];

    return {
        a: a,
        b: b
    };
}

export function detectBoundaryCollision(object, boundary, t0, t1) {
    const duration = t1 - t0;

    // Position at previous frame
    const p0 = {
        0: object.left,
        1: object.top
    };

    // Position object will have at current frame if it does not collide
    // with something
    const p1 = {
        0: object.left + object.velocityLeft * duration + object.accelerationLeft,
        1: object.top  + object.velocityTop  * duration + object.accelerationTop
    };

    const ab1 = getAB(p0, p1);
    const ab2 = getAB({
        0: boundary.left,
        1: boundary.top
    }, {
        0: boundary.left,
        1: boundary.top + boundary.height
    });

    // Get x from intersection of both lines. If gradient is not finite,
    // line is vertical so we may simply use the x value of boundary
    const x = Number.isFinite(ab2.a) ?
        (ab1.a - ab2.a) / (ab2.b - ab1.b) :
        boundary.left ;

    // If x does not lie in the range of x's for this frame, no collision,
    // return undefined
    if (x < p0[0] || x > p1[0]) {
        return;
    }

    // Apply y = ax + c to find y
    const y = ab1.a * x + ab1.b;

    // Return information about the collision
    return {
        t0: t0,
        t1: t1,
        tCollision: t0 + (t1 - t0) * (x - p0[0]) / (p1[0] - p0[0]),
        p0: p0,
        p1: p1,
        pCollision: { 0: x, 1: y }
    };
}

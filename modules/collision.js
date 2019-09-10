import { toPolar } from '../../fn/module.js';

function getAB(p0, p1) {
    // Gradient a of y = ax + b
    const a = (p1.y - p0.y) / (p1.x - p0.x);

    // Constant b of y = ax + b
    const b = p0.y - a * p0.x;

    return { a: a, b: b };
}

function getBoundaryAB(boundary) {
    // Gradient a of y = ax + b
    const a = Math.tan(boundary.angle);

    // Constant b of y = ax + b
    const b = boundary.position.y - boundary.position.x * a;

    return { a: a, b: b };
}

export function detectBoundaryCollision(actor, boundary, t0, t1) {
    // Position at t0
    const p0 = {
        x: actor.position.x + actor.velocity.x * (t0 - actor.time),
        y: actor.position.y + actor.velocity.y * (t0 - actor.time)
    };

    // Position at t1
    const p1 = {
        x: actor.position.x + actor.velocity.x * (t1 - actor.time),
        y: actor.position.y + actor.velocity.y * (t1 - actor.time)
    };

    const ab1 = getAB(p0, p1);
    const ab2 = getBoundaryAB(boundary);

    // Get x from intersection of both lines. If gradient is not finite,
    // line is vertical so we may simply use the x value of boundary
    const x = Number.isFinite(ab2.a) ?
        (ab1.a - ab2.a) / (ab2.b - ab1.b) :
        boundary.position.x ;

    // If x does not lie in the range of xs for this frame, no collision,
    // return undefined
    if (x < p0.x || x >= p1.x) {
        return;
    }

    // Apply y = ax + c to find y
    const y = ab1.a * x + ab1.b;

    // If y does not lie in the range of ys for this frame, no collision,
    // return undefined
    if (y < p0.y || x >= p1.y) {
        return;
    }

    // Return collision data object
    return {
        object1:  actor,
        object2:  boundary,
        time:     t0 + (t1 - t0) * (x - p0.x) / (p1.x - p0.x),
        position: { x: x, y: y }
    };
}









export function detectEdgeCollision(ball, width, height) {
  // if there is no collision it will return undefiend

  //if there is collision of the top or bottom edge we will return "y"
  if (ball.position.y + ball.radius + ball.velocity.y >= height || ball.position.y - ball.radius + ball.velocity.y <= 0) {
    return "y";
  }

  //if there is collision of the right or left edge we will return "x"
  if (ball.position.x + ball.radius + ball.velocity.x > width) {
    return "xRight";
  }

  if (ball.position.x - ball.radius + ball.velocity.x <= 0) {
    return "xLeft";
  }
}

export function detectBatEdgeCollision(bat, height) {
  if (bat.y + bat.height + bat.velocity.y > height) {
    return "yBottom";
  }

  if (bat.y + bat.velocity.y < 0) {
    return "yTop";
  }
}

export function detectBatCollision(ball, bat) {
  // If there is no collision return undefiend
  if (ball.position.x + ball.radius + ball.velocity.x < bat.x) return;
  if (ball.position.x - ball.radius + ball.velocity.x > bat.x + bat.width) return;
  if (ball.position.y + ball.radius + ball.velocity.y < bat.y) return;
  if (ball.position.y - ball.radius + ball.velocity.y > bat.y + bat.height) return;

  // If there is a collision on the right or left edge we will return "x"
  if (
    ball.position.y + ball.radius + ball.velocity.y > bat.y &&
    ball.position.y - ball.radius + ball.velocity.y < bat.y + bat.height
  ) {
    return "x";
  }

  // Otherwise the collision must be on the top or bottom edge, return "y"
  return "y";
}

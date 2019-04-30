function makeColor() {
  let hex = "#";
  const colorHex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  for (let i = 0; i < 6; i++) {
    let random = colorHex[Math.floor(Math.random() * 16)];

    hex += random;
  }

  return hex;
}

export function randomNumInrange(min, max) {
  let arr = [];
  //   return Math.floor(Math.random() * (max - min + 1) + 1);
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function dist(diff) {
  return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
}
function distance(x1, y1, x2, y2) {
  const xdis = x2 - x1;
  const ydis = y2 - y1;
  return Math.sqrt(Math.pow(xdis, 2) + Math.pow(ydis, 2));
}

function sub(v1, v2) {
  const vector = {
    x: undefined,
    y: undefined
  };

  vector.x = v1.x - v2.x;
  vector.y = v1.y - v2.y;
  return vector;
}

function add(v1, v2) {
  const vector = {
    x: undefined,
    y: undefined
  };

  vector.x = v1.x + v1.y;
  vector.y = v2.x + v2.y;
  return vector;
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

export function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    // otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

//function return the x,y of the center of REQ

function toCenter(x, y, width, height) {
  const obj = {};

  obj.xCenter = x + width / 2;
  obj.yCenter = y + height / 2;
  return obj;
}
console.log(toCenter(5, 5, 10, 10));

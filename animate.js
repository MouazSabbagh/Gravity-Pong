// MODEL code
import { Observer } from "./sparky/module.js";
import { Ball } from "./ball.js";
import { Bat } from "./bat.js";
import { Container } from "./container.js";
export const container = new Container();

const bat = new Bat(30, 50, 30, 120); // today
const bat1 = new Bat(740, 500, 30, 120);

container.objects.push(bat, bat1);

console.log(container);

window.addEventListener("keydown", keyDownFn);
const currentKeys = {};
function keyDownFn(e) {
  if (currentKeys[e.keyCode]) return;
  console.log(e.keyCode);
  currentKeys[e.keyCode] = true;

  if (e.keyCode !== 38 && e.keyCode !== 40) return;

  console.log("CHANGE VEL");
  if (e.keyCode === 38) {
    bat.velocityTop = -0.2;
    bat1.velocityTop = -0.2;
  }
  if (e.keyCode === 40) {
    bat.velocityTop = 0.2;
    bat1.velocityTop = -0.2;
  }
}

window.addEventListener("keyup", keyUpFn);
function keyUpFn(e) {
  currentKeys[e.keyCode] = false;
  if (e.keyCode !== 38 && e.keyCode !== 40) return;

  bat.velocityTop = 0;
  bat1.velocityTop = 0;
}

const ball = new Ball(760, 50, 40, 40);
container.objects.push(ball);

// VIEW code

// bat thing

let t1 = window.performance.now(); // time when page loadded
// console.log(t1);

function updateFrame(t0) {
  if (ball.left + ball.width > 800 || ball.left < 0) {
    ball.velocityLeft = -ball.velocityLeft;
  }
  if (ball.top + ball.height > 800 || ball.top < 0) {
    ball.velocityTop = -ball.velocityTop;
  }
  container.objects.forEach(obj => Observer(obj).move(t0 - t1));

  // Observer(ball).move(t0 - t1);

  // Observer(bat).move(t0 - t1); // today

  if (bat.top + bat.height >= 800) {
    Observer(bat).top = 800 - bat.height;
  }
  if (bat.top <= 0) {
    Observer(bat).top = 0;
  }
  touch(ball, bat);

  t1 = t0;
}

requestAnimationFrame(function frame(t) {
  updateFrame(t);
  requestAnimationFrame(frame);
});

function touch(ball, bat) {
  const r = ball.width / 2;
  // console.log(ball.left, bat.left + bat.width);
  if (
    (ball.left <= bat.left + bat.width &&
      ball.top + 2 * r >= bat.top &&
      ball.top <= bat.top + bat.height) ||
    (ball.left <= bat.left + bat.width &&
      ball.top >= bat.top &&
      ball.top <= bat.top + bat.height)
  ) {
    console.log("thouched");
    ball.velocityLeft = -ball.velocityLeft;
  }

  // ball.velocityleft = -ball.velocityleft;
}

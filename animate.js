// MODEL code

import { Ball } from "./ball.js";
import { Bat } from "./bat.js";

const container = document.querySelector(".container");

const bat = new Bat(50, 50, 30, 120); // today

window.addEventListener("keydown", keyDownFn);
const currentKeys = {};
function keyDownFn(e) {
  if (currentKeys[e.keyCode]) return;
  currentKeys[e.keyCode] = true;
  console.log(e.keyCode);

  if (e.keyCode !== 38 && e.keyCode !== 40) return;

  if (e.keyCode === 38) {
    bat.velocityTop = -0.2;
  }
  if (e.keyCode === 40) {
    bat.velocityTop = 0.2;
  }
}

window.addEventListener("keyup", keyUpFn);
function keyUpFn(e) {
  currentKeys[e.keyCode] = false;
  if (e.keyCode !== 38 && e.keyCode !== 40) return;

  bat.velocityTop = 0;
}

const bat1View = document.querySelector(".bat");

const ball = new Ball(760, 50, 40, 40);

// VIEW code

const ball1View = document.querySelector("#ball-1");
ball1View.style.left = ball.left + "px";
ball1View.style.width = ball.width + "px";
ball1View.style.height = ball.height + "px";
ball1View.style.top = ball.top + "px";
bat1View.style.top = ball.top + "px"; // today

let t1 = window.performance.now(); // time when page loadded
// console.log(t1);

function updateFrame(t0) {
  if (ball.left + ball.width > 800 || ball.left < 0) {
    ball.velocityLeft = -ball.velocityLeft;
  }
  if (ball.top + ball.height > 800 || ball.top < 0) {
    ball.velocityTop = -ball.velocityTop;
  }

  ball.move(t0 - t1);

  ball1View.style.left = ball.left + "px";
  ball1View.style.top = ball.top + "px";

  bat.move(t0 - t1); // today
  bat1View.style.top = bat.top + "px";

  if (bat.top + bat.height >= 800) {
    bat.top = 800 - bat.height;
  }
  if (bat.top <= 0) {
    bat.top = 0;
  }
  touch(ball, bat);

  t1 = t0;
}

requestAnimationFrame(function frame(t) {
  updateFrame(t);
  requestAnimationFrame(frame);
});

function touch(ball, bat) {
  // console.log(ball.left, bat.left + bat.width);
  if (ball.left + 10 <= bat.left + bat.width) {
    console.log(bat.left + bat.width);
    ball.velocityLeft = -ball.velocityLeft;
  }

  // ball.velocityleft = -ball.velocityleft;
}

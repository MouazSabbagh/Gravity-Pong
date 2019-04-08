// // // const shapes = document.querySelectorAll(".logo-svg polygon");
// // // const stroke = document.querySelector("g");
// // // const body = document.querySelector("body");
// // // const svg = document.querySelector(".logo-svg");
// // // const container = document.querySelector(".container");

// // // // tl = new TimelineLite();
// // // // tl.add("start");
// // // // tl.staggerFrom(
// // // //   shapes,
// // // //   1,
// // // //   {
// // // //     opacity: 0,
// // // //     cycle: {
// // // //       x: [200, -200, -700, 700],
// // // //       y: [20, -20, -200, 200],
// // // //       rotation: function(i) {
// // // //         return i * 200;
// // // //       }
// // // //     },

// // // //     ease: Elastic.easeOut
// // // //   },
// // // //   0.001
// // // // );

// // // // tl.staggerTo(
// // // //   shapes,
// // // //   3,
// // // //   {
// // // //     cycle: {
// // // //       x: [200, -200, -700, 700],
// // // //       y: [200, -200, -200, 200],
// // // //       rotation: function(i) {
// // // //         return i * 40;
// // // //       }
// // // //     },
// // // //     opacity: 0,
// // // //     fill: "#f2bf30",
// // // //     ease: Circ.easeInOut
// // // //   },
// // // //   0.001,
// // // //   "start+=3"
// // // // );

// // // TweenMax.set(container, { perspective: 1000 });
// // // TweenMax.set(svg, {
// // //   transformStyle: "preserve-3d"
// // // });

// // // TweenMax.from(svg, 7, {
// // //   // opacity: 0.3,

// // //   // scale: 0.5,
// // //   // opacity: 0,
// // //   skewX: 40,
// // //   rotationX: -200,
// // //   rotationY: -200,
// // //   rotationZ: -200,
// // //   rotation: 360,
// // //   transformOrigin: "50% 50% 50%  ",
// // //   // rotationY: 360,

// // //   // transformPerspective: 600,
// // //   ease: Circ.easeInOut
// // // });

// // // // tl = new TimelineLite();
// // // // tl.add("start");
// // // // tl.staggerFrom(
// // // //   shapes,
// // // //   5,
// // // //   {
// // // //     cycle: {
// // // //       // rotation: [100, 200, 300, 100],
// // // //       opacity: [0.2, 0, 0.6, 0.5]
// // // //       // scale: [0.2, 0.5, 0.6, 0.5]
// // // //       // transformOrigin: "50% 50% 50% "
// // // //     },

// // // //     ease: Elastic.easeOut
// // // //   },
// // // //   0.001
// // // // );

// // function Student(name, age) {
// //   this.name = name;
// //   this.age = age;
// // }

// // console.log(Student.constructor);

// // const firstS = new Student("moaz", 38);
// // console.log(firstS);

// // function add(c, d) {
// //   console.log(this.a + this.b + c + d);
// // }
// // console.log(add(3, 4));

// // function factorial(x) {
// //   if (x < 0) return `${x} have to positive number`;
// //   if (x === 0) return 1;
// //   return x * factorial(x - 1);
// // }

// // console.log(factorial(1));

// // function revString(str) {
// //   if (str === "") return "";
// //   return revString(str.substr(1)) + str[0];
// // }

// // console.log(revString("cat"));

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

  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const bat1View = document.querySelector(".bat");
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  bat1View.classList.add("playing");

  if (e.keyCode === 38) {
    bat.velocityTop = -0.2;
  }
  if (e.keyCode === 40) {
    bat.velocityTop = 0.2;
    if (bat.top + bat.height >= 800) {
      bat.velocityTop = 0;
    }
  }
}

window.addEventListener("keyup", keyUpFn);
function keyUpFn(e) {
  currentKeys[e.keyCode] = false;
  if (e.keyCode !== 38 && e.keyCode !== 40) return;

  bat.velocityTop = 0;
}

const bat1View = document.querySelector(".bat");
// bat1View.addEventListener("transitionend", removeTransition);
// function removeTransition(e) {
//   if (e.propertyName === "transform") {
//     this.classList.remove("playing");
//   }
// }

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
    // container.style.backgroundColor = makeColor();
  }
  if (ball.top + ball.height > 800 || ball.top < 0) {
    ball.velocityTop = -ball.velocityTop;
    // container.style.backgroundColor = makeColor();
  }

  ball.move(t0 - t1);
  ball1View.style.left = ball.left + "px";
  ball1View.style.top = ball.top + "px";

  bat.move(t0 - t1); // today
  bat1View.style.top = bat.top + "px";

  t1 = t0;
}

requestAnimationFrame(function frame(t) {
  updateFrame(t);
  requestAnimationFrame(frame);
});

function makeColor() {
  let hex = "#";
  const colorHex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  for (let i = 0; i < 6; i++) {
    let random = colorHex[Math.floor(Math.random() * 16)];

    hex += random;
  }

  return hex;
}

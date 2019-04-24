import { toKeyCode } from "../dom/module.js";

window.addEventListener("keydown", keyDownFn);
const currentKeys = {};
function keyDownFn(e) {
  if (currentKeys[e.keyCode]) return;

  currentKeys[e.keyCode] = true;
  const fn = keydowns[e.keyCode];
  if (fn) {
    fn();
  }
}

// Bat keyUp movment
window.addEventListener("keyup", keyUpFn);
function keyUpFn(e) {
  currentKeys[e.keyCode] = false;
  const fn = keyups[e.keyCode];
  if (fn) {
    fn();
  }
}

// lestin to the key names, takes the name of the key, and two function ,first when the key is press, the other when the key is lifted.
const keydowns = {};
const keyups = {};

export function listenToKeyEvents(key, downFn, upFn) {
  const keyCode = toKeyCode(key);
  keydowns[keyCode] = downFn;
  keyups[keyCode] = upFn;
}

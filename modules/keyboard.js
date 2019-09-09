import { toKeyCode } from "../../dom/module.js";

// lestin to the key names, takes the name of the key, and two function,
// first when the key is press, the other when the key is lifted.

const currentKeys = {};
const keydowns = {};
const keyups = {};

function call(fn) {
  fn();
}

function remove(array, item) {
  const i = array.indexOf(item);
  if (i === -1) { return; }
  array.splice(i, 1);
}

function keyDownFn(e) {
  if (currentKeys[e.keyCode]) {
    // Stop default behaviours on bound keys
    e.preventDefault();
    return;
  }

  const fns = keydowns[e.keyCode];

  if (!fns) { return; }
  fns.forEach(call);

  // Flag key as pressed
  currentKeys[e.keyCode] = true;

  // Stop default behaviours on bound keys
  e.preventDefault();
}

function keyUpFn(e) {
  currentKeys[e.keyCode] = false;
  const fns = keyups[e.keyCode];

  if (!fns) { return; }
  fns.forEach(call);
}

export function listenToKey(key, downFn, upFn) {
  const keyCode = toKeyCode(key);

  if (downFn) {
    keydowns[keyCode] = keydowns[keyCode] || [];
    keydowns[keyCode].push(downFn);
  }

  if (upFn) {
    keyups[keyCode] = keyups[keyCode] || [];
    keyups[keyCode].push(upFn);
  }

  return function unlisten() {
    if (downFn) {
      keydowns[keyCode] && remove(keydowns[keyCode], downFn);
    }

    if (upFn) {
      keyups[keyCode] && remove(keyups[keyCode], upFn);
    }
  };
}

window.addEventListener("keydown", keyDownFn);
window.addEventListener("keyup", keyUpFn);

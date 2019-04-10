import { container } from "./animate.js";
import { functions, Stream, Observer } from "./sparky/module.js";
import { playHitBat } from "./sound.js";

functions["pong"] = function(node, scopes, params) {
  //   console.log("PONG", node);
  return Stream.of(container);
  //   console.log(Stream.of(container));
};

window.c = Observer(container);
window.p = playHitBat;

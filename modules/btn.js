export const btn = document.querySelector(".start");
console.log(btn);
btn.addEventListener("click", startGame);
export function startGame(e) {
  window.location = "http://127.0.0.1:49489/index.html";
}

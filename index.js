
import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";

document.addEventListener("DOMContentLoaded", () => {
  renderComments();
  initListeners();
});


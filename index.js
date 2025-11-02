
import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";
import { loadComments } from "./comments.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
   
    await loadComments();
    renderComments();
    initListeners();
  } catch (error) {
    
    console.error("Не удалось загрузить комментарии:", error);
    alert("Не удалось загрузить комментарии. Попробуйте обновить страницу");
  }
});

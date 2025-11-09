
import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";
import { loadComments } from "./comments.js";

document.addEventListener("DOMContentLoaded", async () => {

  const commentsList = document.querySelector(".comments");
  if (commentsList) {
  commentsList.innerHTML = '<div class="loading">Загрузка комментариев...</div>';
  }

  try {
    await loadComments();
    renderComments();
    initListeners();
  } catch (error) {
    console.error("Не удалось загрузить комментарии:", error);
    if (commentsList) {
      commentsList.innerHTML =
        '<div class="error">Не удалось загрузить комментарии. Попробуйте обновить страницу.</div>';
    }
  }
});

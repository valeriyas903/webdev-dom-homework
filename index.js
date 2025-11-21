import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";
import { loadComments } from "./comments.js";
import { isAuthenticated } from "./auth.js";
import { initAddComment } from "./modules/initAddComment.js";

document.addEventListener("DOMContentLoaded", async () => {
  const commentsList = document.querySelector(".comments");
  if (commentsList) commentsList.innerHTML = '<div class="loading">Загрузка комментариев...</div>';

  try {
    await loadComments();
    renderComments();

   
    initListeners();

  
    initAddComment();
  } catch (err) {
    console.error(err);
    if (commentsList) {
      if (err.message === "server") commentsList.innerHTML = '<div class="error">Сервер сломался, попробуйте позже</div>';
      else if (err.message === "network") commentsList.innerHTML = '<div class="error">Кажется, у вас пропал интернет</div>';
      else commentsList.innerHTML = `<div class="error">${err.message}</div>`;
    }
  }
});
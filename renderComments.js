import { comments } from "./comments.js";

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) {
    console.error("Не найден элемент для отображения комментариев");
    return;
  }

  if (!comments || comments.length === 0) {
    commentsList.innerHTML = '<div class="comments-empty">Пока нет комментариев</div>';
    return;
  }

   commentsList.innerHTML = comments
    .map(
         (c, index) => `
    <li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${c.name}</div>
        <div>${c.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${c.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${c.likes}</span>
          <button class="like-button${c.isLiked ? " -active-like" : ""}${c.isLikeLoading ? " -loading-like" : ""}" 
            data-index="${index}" 
            type="button"
            ${c.isLikeLoading ? "disabled" : ""}
          ></button>
        </div>
      </div>
    </li>`
  )
    .join("");
}

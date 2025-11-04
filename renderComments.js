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

  try {
    commentsList.innerHTML = comments
      .map(
        (comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name || 'Аноним'}</div>
            <div>${comment.date || ''}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text || ''}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes || 0}</span>
              <button class="like-button${comment.isLiked ? " -active-like" : ""}" 
                data-index="${index}"
                type="button"
              ></button>
            </div>
          </div>
        </li>`
      )
      .join("");
  } catch (error) {
    console.error("Ошибка при рендеринге:", error);
    commentsList.innerHTML = '<div class="error">Ошибка отображения</div>';
  }
}
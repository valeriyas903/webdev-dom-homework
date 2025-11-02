import { comments } from "../comments.js";
import { renderComments } from "../renderComments.js";

export function initLikeToggle() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) return;

  commentsList.addEventListener("click", (event) => {
    const likeBtn = event.target.closest(".like-button");
    if (!likeBtn || !commentsList.contains(likeBtn)) return;

    event.stopPropagation();
    
    const idx = Number(likeBtn.dataset.index);
    if (Number.isNaN(idx) || !comments[idx]) return;

    if (comments[idx].isLiked) {
      comments[idx].likes = Math.max(0, comments[idx].likes - 1);
      comments[idx].isLiked = false;
    } else {
      comments[idx].likes = (comments[idx].likes || 0) + 1;
      comments[idx].isLiked = true;
    }

    renderComments();
  });
}

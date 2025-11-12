import { comments } from "../comments.js";
import { renderComments } from "../renderComments.js";

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function initLikeToggle() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) return;

  commentsList.addEventListener("click", async (event) => {
    const likeBtn = event.target.closest(".like-button");
    if (!likeBtn || !commentsList.contains(likeBtn)) return;

    event.stopPropagation();
    
    const idx = Number(likeBtn.dataset.index);
    if (Number.isNaN(idx) || !comments[idx]) return;

    if (comments[idx].isLikeLoading) return;

    
    comments[idx].isLikeLoading = true;
    renderComments();

    try {
      
      await delay(1000);

      
      if (comments[idx].isLiked) {
        comments[idx].likes = Math.max(0, comments[idx].likes - 1);
        comments[idx].isLiked = false;
      } else {
        comments[idx].likes = (comments[idx].likes || 0) + 1;
        comments[idx].isLiked = true;
      }
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error);
    } finally {

      comments[idx].isLikeLoading = false;
      renderComments();
    }
  });
}
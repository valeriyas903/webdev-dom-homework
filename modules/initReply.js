import { comments } from "../comments.js";

export function initReply() {
  const commentsList = document.querySelector(".comments");
  if (!commentsList) return;

  commentsList.addEventListener("click", (event) => {
    if (event.target.closest(".like-button")) return;

    const li = event.target.closest(".comment");
    if (!li || !commentsList.contains(li)) return;

    const idx = Number(li.dataset.index);
    if (Number.isNaN(idx) || !comments[idx]) return;

    const author = comments[idx].name;
    const text = comments[idx].text;
    const commentInput = document.getElementById("comment-input");
    if (commentInput) {
      commentInput.value = `> ${text}\n${author}, `;
      commentInput.focus();
    }
  });
}
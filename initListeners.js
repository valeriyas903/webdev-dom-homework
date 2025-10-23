import { comments, pushComment } from "./comments.js";
import { escapeHTML } from "./escape.js";
import { renderComments } from "./renderComments.js";

export function initListeners() {
  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
   const commentsList = document.querySelector(".comments");

   if (addBtn) {
    addBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      if (!name || !comment) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      const safeName = escapeHTML(name);
      const safeComment = escapeHTML(comment);

      const now = new Date();
      const formattedDate =
        now.toLocaleDateString("ru-RU").replace(/\//g, ".") +
        " " +
        now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

      pushComment({
        name: safeName,
        date: formattedDate,
        text: safeComment,
        likes: 0,
        isLiked: false,
      });

      renderComments();

      nameInput.value = "";
      commentInput.value = "";
    });
  }

  if (commentsList) {
    commentsList.addEventListener("click", (event) => {
      const likeBtn = event.target.closest(".like-button");
      if (likeBtn && commentsList.contains(likeBtn)) {
        event.stopPropagation();
        const idx = Number(likeBtn.dataset.index);
        if (Number.isNaN(idx)) return;

        if (comments[idx].isLiked) {
          comments[idx].likes = Math.max(0, comments[idx].likes - 1);
          comments[idx].isLiked = false;
        } else {
          comments[idx].likes = (comments[idx].likes || 0) + 1;
          comments[idx].isLiked = true;
        }

        renderComments();
        return;
      }

       const li = event.target.closest(".comment");
      if (li && commentsList.contains(li)) {
        const idx = Number(li.dataset.index);
        if (Number.isNaN(idx)) return;

        const author = comments[idx].name;
        const text = comments[idx].text;
        const commentInputEl = document.getElementById("comment-input");
        if (commentInputEl) {
          commentInputEl.value = `> ${text}\n${author}, `;
          commentInputEl.focus();
        }
      }
    });
  }
}

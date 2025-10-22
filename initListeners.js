
import { comments, pushComment } from "./comments.js";
import { escapeHTML } from "./escape.js";
import { renderComments } from "./render.js";

export function initHandlers() {
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
  
      addLikeListeners();
      addReplyListeners();

      nameInput.value = "";
      commentInput.value = "";
    });
  }

  
  function addLikeListeners() {
    document.querySelectorAll(".like-button").forEach((btn) => {
      btn.removeEventListener("click", likeHandler); 
      btn.addEventListener("click", likeHandler);
    });

    function likeHandler(event) {
      event.stopPropagation(); 
      const idx = Number(event.currentTarget.dataset.index);
      if (Number.isNaN(idx)) return;

      if (comments[idx].isLiked) {
        comments[idx].likes--;
        comments[idx].isLiked = false;
      } else {
        comments[idx].likes++;
        comments[idx].isLiked = true;
      }
      renderComments();
      addLikeListeners();
      addReplyListeners();
    }
  }

  
  function addReplyListeners() {
    document.querySelectorAll(".comment").forEach((commentEl) => {
      commentEl.removeEventListener("click", replyHandler);
      commentEl.addEventListener("click", replyHandler);
    });

    function replyHandler(event) {
      if ((event.target && event.target.classList.contains("like-button")) || event.target.closest(".like-button")) {
        return;
      }
      const li = event.currentTarget;
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
  }


  addLikeListeners();
  addReplyListeners();
}

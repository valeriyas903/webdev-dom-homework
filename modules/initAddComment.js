import { pushComment } from "../comments.js";
import { escapeHTML } from "../escape.js";
import { renderComments } from "../renderComments.js";

export function initAddComment() {
  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");

  if (!addBtn) return;

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
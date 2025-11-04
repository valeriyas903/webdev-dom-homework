import { pushComment } from "../comments.js";
import { escapeHTML } from "../escape.js";
import { renderComments } from "../renderComments.js";
import { loadComments } from "../comments.js"; 

export function initAddComment() {
  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");

  if (!addBtn) return;

  addBtn.addEventListener("click", async () => {
   
    addBtn.disabled = true;
    try {
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      if (!name || !comment) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      
      const safeName = escapeHTML(name);
      const safeComment = escapeHTML(comment);

      
      await pushComment({ name: safeName, text: safeComment });

  
      nameInput.value = "";
      commentInput.value = "";

    } catch (err) {
      alert(err?.message || "Не удалось добавить комментарий");
    } finally {
      addBtn.disabled = false;
    }
    
  });
}
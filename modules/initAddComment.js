import { pushComment } from "../comments.js";
import { escapeHTML } from "../escape.js";
import { renderComments } from "../renderComments.js";


export function initAddComment() {
  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const addForm = document.querySelector(".add-form");

  if (!addBtn || !addForm) return;

  addBtn.addEventListener("click", async () => {
   let addingEl = null;
    
    try {
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      if (!name || !comment) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      
      const safeName = escapeHTML(name);
      const safeComment = escapeHTML(comment);

      addingEl = document.createElement("div");
      addingEl.className = "adding-comment";
      addingEl.textContent = "Комментарий добавляется";
      
      if (addForm.parentNode) {
        addForm.style.display = "none";
        addForm.parentNode.insertBefore(addingEl, addForm);
      } else {
        
        addForm.after(addingEl);
      }


      addBtn.disabled = true;

      await pushComment({ name: safeName, text: safeComment });

  
      nameInput.value = "";
      commentInput.value = "";
      renderComments();
    } catch (err) {
      alert(err?.message || "Ошибка при добавлении комментария");
    } finally {
      addBtn.disabled = false;
      if (addingEl && addingEl.parentNode) {
        addingEl.remove();
      }
      addForm.style.display = "";
    }
  });
}
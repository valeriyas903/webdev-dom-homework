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
   
  
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

     if (name.length < 3 || comment.length < 3) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return; 
    }
      
      const safeName = escapeHTML(name);
      const safeComment = escapeHTML(comment);

      let addingEl = null;

     try {
      addingEl = document.createElement("div");
      addingEl.className = "adding-comment";
      addingEl.textContent = "Комментарий добавляется";

      
      addForm.style.display = "none";
      addForm.parentNode.insertBefore(addingEl, addForm);
     if (addForm.parentNode) {
        addForm.parentNode.insertBefore(addingEl, addForm);
      }
      addBtn.disabled = true;

     
      await pushComment({ name: safeName, text: safeComment });

      
      renderComments();
      nameInput.value = "";
      commentInput.value = "";
    } catch (err) {
      
      if (err.message === "validation") {
        
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (err.message === "server") {
        alert("Сервер сломался, попробуй позже");
      } else if (err.message === "network") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        } else {
        
        alert(err?.message || "Не удалось добавить комментарий");
      }
      
    } finally {
      addBtn.disabled = false;
      if (addingEl && addingEl.parentNode) addingEl.remove();
      addForm.style.display = ""; 
    }
  });
}
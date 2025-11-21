import { pushComment } from "../comments.js";
import { escapeHTML } from "../escape.js";
import { renderComments } from "../renderComments.js";
import { isAuthenticated, getUsername } from "../auth.js";

export function initAddComment() {
  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const addForm = document.querySelector(".add-form");
  const container = document.querySelector(".container");

  if (!addForm || !addBtn) return;

  
  if (addBtn.dataset.initialized === "1") return;
  addBtn.dataset.initialized = "1";

  
  if (!isAuthenticated()) {
    addForm.style.display = "none";
    if (!document.querySelector(".login-hint")) {
      const hint = document.createElement("div");
      hint.className = "login-hint";
      hint.innerHTML = `Чтобы добавить комментарий, <a href="#" id="to-login">авторизуйтесь</a>`;
      container.appendChild(hint);
      document.getElementById("to-login").addEventListener("click", (e) => {
        e.preventDefault();
        import("../loginComponent.js").then(m => m.renderLoginPage());
      });
    }
    return;
  }

  
  addForm.style.display = "";
  if (nameInput) {
    nameInput.value = getUsername() || "";
    nameInput.setAttribute("readonly", "readonly");
  }

  addBtn.addEventListener("click", async () => {
    
    if (addBtn.disabled) return;
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
      addBtn.disabled = true;

      
      addingEl = document.createElement("div");
      addingEl.className = "adding-comment";
      addingEl.textContent = "Комментарий добавляется";
      addForm.style.display = "none";
      if (addForm.parentNode) addForm.parentNode.insertBefore(addingEl, addForm);

      await pushComment({ name: safeName, text: safeComment });

      
      await renderComments();
      commentInput.value = "";
    } catch (err) {
      if (err.message === "auth") {
        alert("Требуется авторизация");
      } else if (err.message === "server") {
        alert("Сервер сломался, попробуйте позже");
      } else if (err.message === "network") {
        alert("Кажется, у вас пропал интернет, попробуйте позже");
      } else if (err.message === "posting") {
      
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
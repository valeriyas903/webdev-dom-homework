import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";
import { loadComments } from "./comments.js";
import { isAuthenticated, getUsername, logout } from "./auth.js";
import { initAddComment } from "./modules/initAddComment.js";
import { renderLoginPage } from "./modules/loginComponent.js";
import { rememberDefaultLayout, restoreDefaultLayout } from "./layout.js";

export function renderUserInfo() {
  const userInfoEl = document.getElementById("user-info");
  if (!userInfoEl) {
    console.error("Элемент user-info не найден в DOM");
    return;
  }

  if (isAuthenticated()) {
    const username = getUsername();
    userInfoEl.innerHTML = `
      <span class="user-name">Привет, ${username}!</span>
      <button type="button" class="button" id="logout-btn">Выйти</button>
    `;
  } else {
    userInfoEl.innerHTML = `
      <button type="button" class="button" id="login-btn">Войти</button>
      <button type="button" class="button" id="register-btn">Регистрация</button>
    `;
  }

  initAuthHandlers();
}

function initAuthHandlers() {
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      renderLoginPage();
    });
  }

  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      import("./modules/registerComponent.js").then((module) => {
        if (module && typeof module.renderRegisterPage === "function") {
          module.renderRegisterPage();
        }
      });
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      logout();
      renderUserInfo();
      restoreDefaultLayout();
      await loadAndRender();
    });
  }
}

export async function loadAndRender() {
  const commentsList = document.querySelector(".comments");

  try {
    await loadComments();
    renderComments();
    initListeners();
    initAddComment();
  } catch (err) {
    console.error("Ошибка при загрузке:", err);
    if (commentsList) {
      if (err.message === "server") {
        commentsList.innerHTML =
          '<div class="error">Сервер сломался, попробуйте позже</div>';
      } else if (err.message === "network") {
        commentsList.innerHTML =
          '<div class="error">Кажется, у вас пропал интернет</div>';
      } else {
        commentsList.innerHTML = `<div class="error">${err.message}</div>`;
      }
    }
  }
}

window.renderUserInfo = renderUserInfo;
window.loadAndRender = loadAndRender;

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM загружен, инициализируем приложение");

  renderUserInfo();
  rememberDefaultLayout();

  const commentsList = document.querySelector(".comments");
  if (commentsList) {
    commentsList.innerHTML =
      '<div class="loading">Загрузка комментариев...</div>';
  }

  await loadAndRender();
});
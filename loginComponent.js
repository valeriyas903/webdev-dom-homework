
import { login } from "./auth.js";
import { loadComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";

export function renderLoginPage() {
  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = `
    <div class="login-page">
      <h2>Вход</h2>
      <input id="login-input" placeholder="Логин" />
      <input id="pass-input" placeholder="Пароль" type="password" />
      <div>
        <button id="login-btn" type="button">Войти</button>
        <button id="login-cancel" type="button">Отмена</button>
      </div>
      <div style="margin-top:8px">
        <a href="#" id="to-register">Зарегистрироваться</a>
      </div>
      <div id="login-error" style="color:red;margin-top:10px;"></div>
    </div>
  `;

  const btn = document.getElementById("login-btn");
  const cancel = document.getElementById("login-cancel");
  const errEl = document.getElementById("login-error");
  const toRegister = document.getElementById("to-register");

  
  if (toRegister) {
    toRegister.addEventListener("click", (e) => {
      e.preventDefault();
      import("./registerComponent.js").then((m) => {
        if (m && typeof m.renderRegisterPage === "function") m.renderRegisterPage();
      }).catch((err) => {
        console.error("Не удалось загрузить страницу регистрации:", err);
        alert("Не удалось открыть регистрацию");
      });
    });
  }

  btn.addEventListener("click", async () => {
    errEl.textContent = "";
    const username = document.getElementById("login-input").value.trim();
    const password = document.getElementById("pass-input").value;

    if (username.length < 1 || password.length < 1) {
      errEl.textContent = "Введите логин и пароль";
      return;
    }

    btn.disabled = true;
    try {
      await login(username, password);

      
      await loadComments();
      renderComments();
      initListeners();

      
      location.href = location.pathname;
    } catch (e) {
      if (e.message === "server") {
        errEl.textContent = "Сервер сломался, попробуйте позже";
      } else if (e.message === "network") {
        errEl.textContent = "Кажется, у вас сломался интернет, попробуйте позже";
      } else {
        errEl.textContent = e.message || "Ошибка";
      }
    } finally {
      btn.disabled = false;
    }
  });

  cancel.addEventListener("click", () => {
    location.href = location.pathname;
  });
}

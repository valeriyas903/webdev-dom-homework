import { register } from "./auth.js";
import { loadComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { initListeners } from "./initListeners.js";

export function renderRegisterPage() {
  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = `
    <div class="register-page">
      <h2>Регистрация</h2>
      <input id="reg-login" placeholder="Логин" />
      <input id="reg-name" placeholder="Имя" />
      <input id="reg-pass" placeholder="Пароль (мин 6)" type="password" />
      <div>
        <button id="reg-btn" type="button">Зарегистрироваться</button>
        <button id="reg-cancel" type="button">Отмена</button>
      </div>
      <div id="reg-error" style="color:red;margin-top:10px;"></div>
    </div>
  `;

  const btn = document.getElementById("reg-btn");
  const cancel = document.getElementById("reg-cancel");
  const errEl = document.getElementById("reg-error");

  btn.addEventListener("click", async () => {
    errEl.textContent = "";
    const loginVal = document.getElementById("reg-login").value.trim();
    const nameVal = document.getElementById("reg-name").value.trim();
    const passVal = document.getElementById("reg-pass").value;

    if (!loginVal || !passVal || passVal.length < 6) {
      errEl.textContent = "Введите логин и пароль (пароль минимум 6 символов)";
      return;
    }

    btn.disabled = true;
    try {
      await register(loginVal, passVal, nameVal);
      
      await loadComments();
      renderComments();
      initListeners();
      
      location.href = location.pathname;
    } catch (e) {
      if (e.message === "server") {
        errEl.textContent = "Сервер сломался, попробуйте позже";
      } else {
        errEl.textContent = e.message || "Ошибка регистрации";
      }
    } finally {
      btn.disabled = false;
    }
  });

  cancel.addEventListener("click", () => {
    location.href = location.pathname;
  });
}
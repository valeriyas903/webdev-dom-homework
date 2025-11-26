import {
  rememberDefaultLayout,
  restoreDefaultLayout,
} from "../layout.js";

const LOGIN_TEMPLATE = `
  <div class="login-page">
    <h2 class="login-title">Вход</h2>
    <div class="login-card">
      <form id="login-form" novalidate>
        <div class="login-field">
          <input type="text" id="login-input" placeholder="Логин" required class="login-input" />
        </div>
        <div class="login-field">
          <input type="password" id="pass-input" placeholder="Пароль" required class="login-input" />
        </div>
        <div class="login-actions">
          <button type="submit" id="login-btn" class="login-button primary">Войти</button>
          <button type="button" id="login-cancel" class="login-button secondary">Отмена</button>
        </div>
        <div class="login-footer">
          <a href="#" id="to-register" class="login-link">Зарегистрироваться</a>
        </div>
        <div id="login-error" class="login-error"></div>
      </form>
    </div>
    <div class="login-hint">
      Тестовый пользователь: <strong>demo-admin</strong> / <strong>demopass</strong>
    </div>
  </div>
`;

export function renderLoginPage() {
  const container = rememberDefaultLayout();
  if (!container) {
    return;
  }
 
  container.innerHTML = LOGIN_TEMPLATE;
  const form = container.querySelector("#login-form");
  const btn = container.querySelector("#login-btn");
  const cancel = container.querySelector("#login-cancel");
  const errEl = container.querySelector("#login-error");
  const toRegister = container.querySelector("#to-register");
  

  const closeAuthView = async () => {
    const restored = restoreDefaultLayout();
    if (!restored) {
      return;
    }
    if (typeof window.loadAndRender === "function") {
      await window.loadAndRender();
    }
  };


  toRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    import("./registerComponent.js").then((m) => m.renderRegisterPage?.());
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    
    if (errEl) {
      errEl.textContent = "";
    }

    const login = form.querySelector("#login-input")?.value.trim();
    const password = form.querySelector("#pass-input")?.value;

    if (!login || !password) {
      if (errEl) {
        errEl.textContent = "Введите логин и пароль";
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Вход...";
    }

    
    try {
      const authModule = await import("../auth.js");
      await authModule.login(login, password);
      
      window.renderUserInfo?.();
      await closeAuthView();
    } catch (error) {
      if (errEl) {
        errEl.textContent =
          error.message === "server"
            ? "Сервер сломался, попробуйте позже"
            : error.message === "network"
            ? "Кажется, нет подключения к интернету"
            : error.message || "Ошибка входа";
    } 
   } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Войти";
      }
    }
  });
  cancel?.addEventListener("click", async () => {
    await closeAuthView();
  });
}


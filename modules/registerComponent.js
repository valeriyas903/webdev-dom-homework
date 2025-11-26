import {
  rememberDefaultLayout,
  restoreDefaultLayout,
} from "../layout.js";

export function renderRegisterPage() {
    const container = rememberDefaultLayout();
    if (!container) {
      return;
    }

    container.innerHTML = `
    <div class="register-page">
      <h2 class="register-title">Регистрация</h2>
      <div class="register-card">
        <form id="register-form" novalidate>
          <div class="register-field">
            <input type="text" id="reg-login" placeholder="Логин" required class="register-input" />
          </div>
          <div class="register-field">
            <input type="text" id="reg-name" placeholder="Имя" required class="register-input" />
          </div>
          <div class="register-field">
            <input type="password" id="reg-pass" placeholder="Пароль (мин. 6 символов)" required class="register-input" />
          </div>
          <div class="register-actions">
            <button type="submit" id="reg-btn-submit" class="register-button primary">Создать аккаунт</button>
            <button type="button" id="reg-cancel" class="register-button secondary">Отмена</button>
          </div>
          <div class="register-footer">
            <a href="#" id="to-login" class="register-link">Уже есть аккаунт? Войти</a>
          </div>
          <div id="reg-error" class="register-error"></div>
        </form>
      </div>
    </div>
  `;

  const form = container.querySelector("#register-form");
  const btn = container.querySelector("#reg-btn-submit");
  const cancel = container.querySelector("#reg-cancel");
  const errEl = container.querySelector("#reg-error");
  const toLogin = container.querySelector("#to-login");


  const closeAuthView = async () => {
    const restored = restoreDefaultLayout();
    if (!restored) {
      return;
    }
    if (typeof window.loadAndRender === "function") {
      await window.loadAndRender();
    }
  };

  toLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    import("./loginComponent.js").then((m) => m.renderLoginPage?.());
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();


    if (errEl) {
        errEl.textContent = "";
      }
  
      const login = form.querySelector("#reg-login")?.value.trim();
      const name = form.querySelector("#reg-name")?.value.trim();
      const password = form.querySelector("#reg-pass")?.value;



    if (!login || !name || !password || password.length < 6) {
      if (errEl) {
        errEl.textContent = "Заполните все поля (пароль минимум 6 символов)";
      }
      return;
    }

    if (btn) {
        btn.disabled = true;
        btn.textContent = "Создание...";
      }
      try {
        const authModule = await import("../auth.js");
        await authModule.register(login, password, name);
        window.renderUserInfo?.();
        await closeAuthView();
      } catch (error) {
        if (errEl) {
          errEl.textContent = error.message || "Ошибка регистрации";
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Создать аккаунт";
        }
      }
    });

    cancel?.addEventListener("click", async () => {
      await closeAuthView();
    });
    }
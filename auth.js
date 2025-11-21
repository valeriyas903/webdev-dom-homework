const LOGIN_URL = "https://wedev-api.sky.pro/api/user/login";
const REGISTER_URL = "https://wedev-api.sky.pro/api/user";

export function getToken() {
  return localStorage.getItem("token") || null;
}

export function getUsername() {
  return localStorage.getItem("username") || null;
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

async function parseJsonSafe(res) {
  return res.json().catch(() => null);
}

export async function login(username, password) {
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ login: username, password }),
    });

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      if (res.status === 400) throw new Error(data?.error || "Неверные данные");
      if (res.status >= 500) throw new Error("server");
      throw new Error(data?.error || `Ошибка: ${res.status}`);
    }

    const user = data?.user;
    if (!user?.token) throw new Error("no-token");

    localStorage.setItem("token", user.token);
    localStorage.setItem("username", user.name || username);
    return user;
  } catch (err) {
    if (err instanceof TypeError) throw new Error("network");
    throw err;
  }
}

export async function register(loginName, password, name) {
  if (!loginName || !password || password.length < 6) {
    throw new Error("Введите логин и пароль (пароль не короче 6 символов)");
  }

  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      body: JSON.stringify({ login: loginName, password, name }),
    });

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      if (res.status === 400) throw new Error(data?.error || "Неверные данные при регистрации");
      if (res.status >= 500) throw new Error("server");
      throw new Error(data?.error || `Ошибка: ${res.status}`);
    }

    const user = data?.user;
    if (!user) {
      throw new Error("no-user");
    }

    
    if (user.token) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("username", user.name || name || loginName);
    } else {
    
    }

    return user;
  } catch (err) {
    if (err instanceof TypeError) throw new Error("network");
    throw err;
  }
}
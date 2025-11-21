"use strict";

const personalKey = "valeriyas";
const baseUrl = "https://wedev-api.sky.pro/api/v1";

function safeJson(response) {
  return response.json().catch(() => null);
}

export async function getComments() {
  try {
    const res = await fetch(`${baseUrl}/${personalKey}/comments`);
    const data = await safeJson(res) || { comments: [] };

    if (!res.ok) {
     
      if (res.status >= 500) {
        throw new Error("server");
      }
      throw new Error(data?.error || `Ошибка загрузки: ${res.status}`);
    }

    return (data.comments || []).map((c) => ({
      id: c.id,
      name: c.author?.name || "Аноним",
      date: c.date ? new Date(c.date).toLocaleString("ru-RU") : "",
      text: c.text || "",
      likes: typeof c.likes === "number" ? c.likes : 0,
      isLiked: !!c.isLiked,
    }));
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("network");
    }
    throw err;
  }
}

export async function addComment(text, name, retries = 2) {

  if (!text || text.length < 3 || !name || name.length < 3) {
    throw new Error("validation");
  }

  try {
    const res = await fetch(`${baseUrl}/${personalKey}/comments`, {
      method: "POST",
      body: JSON.stringify({ text, name }),
    });

    const data = await safeJson(res);

    if (!res.ok) {
      
      if (res.status >= 500) {
        if (retries > 0) {
          return addComment(text, name, retries - 1);
        }
        throw new Error("server");
      }

      
      if (res.status === 400) {
        throw new Error(data?.error || "badrequest");
      }

      throw new Error(data?.error || `Ошибка: ${res.status}`);
    }

    return data; 
  } catch (err) {
    
    if (err instanceof TypeError) {
      throw new Error("network");
    }
    throw err;
  }
}
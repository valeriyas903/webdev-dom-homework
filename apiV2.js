
const personalKey = "valeriyas"; 
const baseUrlV2 = "https://wedev-api.sky.pro/api/v2";

function safeJson(response) {
  return response.json().catch(() => null);
}


export async function getCommentsV2() {
  const res = await fetch(`${baseUrlV2}/${personalKey}/comments`);
  const data = await safeJson(res) || { comments: [] };
  if (!res.ok) {
    if (res.status >= 500) throw new Error("server");
    if (res.status === 0) throw new Error("network");
    throw new Error(data?.error || `Ошибка загрузки: ${res.status}`);
  }
  return (data.comments || []).map(c => ({
    id: c.id,
    name: c.author?.name || "Аноним",
    date: c.date ? new Date(c.date).toLocaleString("ru-RU") : "",
    text: c.text || "",
    likes: typeof c.likes === "number" ? c.likes : 0,
    isLiked: !!c.isLiked,
  }));
}



export async function addCommentV2(text, token) {
  if (!token) throw new Error("auth");

  
  const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  const res = await fetch(`${baseUrlV2}/${personalKey}/comments`, {
    method: "POST",
    headers: {
      "Authorization": authHeader,
    },
    body: JSON.stringify({ text }),
  });
}
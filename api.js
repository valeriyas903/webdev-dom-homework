"use strict";

const personalKey = "valeriyas"; 
const baseUrl = "https://wedev-api.sky.pro/api/v1";

export async function getComments() {
    method: "GET";
    
  try {
    const response = await fetch(`${baseUrl}/${personalKey}/comments`);
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев");
    }
    const data = await response.json();
    return data.comments.map((comment) => ({
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString('ru-RU'),
      text: comment.text,
      likes: comment.likes,
      isLiked: comment.isLiked,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addComment(text, name) {
  if (!text || text.length < 3) {
    throw new Error("Текст комментария должен содержать хотя бы 3 символа");
  }
  if (!name || name.length < 3) {
    throw new Error("Имя должно содержать хотя бы 3 символа");
  }

  try {
    const response = await fetch(`${baseUrl}/${personalKey}/comments`, {
      method: "POST",
    
      body: JSON.stringify({ text, name }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Ошибка добавления комментария");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
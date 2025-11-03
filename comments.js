import { getComments, addComment } from "./api.js";

import { renderComments } from "./renderComments.js";

export let comments = [];


export async function loadComments() {
  try {
    const serverComments = await getComments();
    
    comments = Array.isArray(serverComments) ? serverComments : [];
     renderComments(); 
  } catch (error) {
    console.error("loadComments:", error);
    comments = [];
    throw error;
  }
}


export async function pushComment(obj) {
  
  try {

    await addComment(obj.text, obj.name);
    await loadComments();
   
  } catch (error) {
   
    throw error;
  }
}
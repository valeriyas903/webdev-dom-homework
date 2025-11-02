import { getComments, addComment } from "./api.js";


export let comments = [];


export async function loadComments() {
  try {
    const serverComments = await getComments();
    
    comments = Array.isArray(serverComments) ? serverComments : [];
  } catch (error) {
    console.error("loadComments:", error);
    comments = [];
    throw error;
  }
}


export async function pushComment(obj) {
  try {

    await addComment(obj.text, obj.name);
   
  } catch (error) {
    console.error("pushComment:", error);
    throw error;
  }
}
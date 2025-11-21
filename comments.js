import { getCommentsV2, addCommentV2 } from "./apiV2.js";
import { getToken } from "./auth.js";

export let comments = [];


let isPosting = false;

export async function loadComments() {
  try {
    const serverComments = await getCommentsV2();
    const seen = new Set();
    comments = (serverComments || []).filter(c => {
      if (!c || seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
    return comments;
  } catch (err) {
    throw err;
  }
}

export async function pushComment(obj) {
  if (isPosting) {
    throw new Error("posting");
  }

  const token = getToken();
  if (!token) throw new Error("auth");

  isPosting = true;
  try {
    await addCommentV2(obj.text, token);
   
    await loadComments();
    return comments;
  } catch (err) {
    throw err;
  } finally {
    isPosting = false;
  }
}

import { initAddComment } from "./modules/initAddComment.js";
import { initReply } from "./modules/initReply.js";
import { initLikeToggle } from "./modules/initLikeToggle.js";

export function initListeners() {
  initAddComment();
  initReply();
  initLikeToggle();
}
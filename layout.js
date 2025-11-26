const VIEW_ROOT_SELECTOR = "#view-root";
const TEMPLATE_KEY = "defaultMarkup";

function getViewRoot() {
    const root = document.querySelector(VIEW_ROOT_SELECTOR);
    if (!root) {
      console.error("Не удалось найти корневой контейнер для контента");
      return null;
    }
    return root;
  }


export function rememberDefaultLayout() {
    const root = getViewRoot();
    if (root && !root.dataset[TEMPLATE_KEY]) {
        root.dataset[TEMPLATE_KEY] = root.innerHTML;
      }
      return root;
  }


export function restoreDefaultLayout() {
    const root = getViewRoot();
  if (!root) {
    return null;
  }

  const markup = root.dataset[TEMPLATE_KEY];
  if (typeof markup === "string") {
    root.innerHTML = markup;
  }
  return root;
}

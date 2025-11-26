/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apiV2.js":
/*!******************!*\
  !*** ./apiV2.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCommentV2: () => (/* binding */ addCommentV2),\n/* harmony export */   getCommentsV2: () => (/* binding */ getCommentsV2)\n/* harmony export */ });\n\r\nconst personalKey = \"valeriyas\"; \r\nconst baseUrlV2 = \"https://wedev-api.sky.pro/api/v2\";\r\n\r\nfunction safeJson(response) {\r\n  return response.json().catch(() => null);\r\n}\r\n\r\n\r\nasync function getCommentsV2() {\r\n  const res = await fetch(`${baseUrlV2}/${personalKey}/comments`);\r\n  const data = await safeJson(res) || { comments: [] };\r\n  if (!res.ok) {\r\n    if (res.status >= 500) throw new Error(\"server\");\r\n    if (res.status === 0) throw new Error(\"network\");\r\n    throw new Error(data?.error || `Ошибка загрузки: ${res.status}`);\r\n  }\r\n  return (data.comments || []).map(c => ({\r\n    id: c.id,\r\n    name: c.author?.name || \"Аноним\",\r\n    date: c.date ? new Date(c.date).toLocaleString(\"ru-RU\") : \"\",\r\n    text: c.text || \"\",\r\n    likes: typeof c.likes === \"number\" ? c.likes : 0,\r\n    isLiked: !!c.isLiked,\r\n  }));\r\n}\r\n\r\n\r\n\r\nasync function addCommentV2(text, token) {\r\n  if (!token) throw new Error(\"auth\");\r\n\r\n  \r\n  const authHeader = token.startsWith(\"Bearer \") ? token : `Bearer ${token}`;\r\n\r\n  const res = await fetch(`${baseUrlV2}/${personalKey}/comments`, {\r\n    method: \"POST\",\r\n    headers: {\r\n      \"Authorization\": authHeader,\r\n    },\r\n    body: JSON.stringify({ text }),\r\n  });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./apiV2.js?\n}");

/***/ }),

/***/ "./auth.js":
/*!*****************!*\
  !*** ./auth.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getToken: () => (/* binding */ getToken),\n/* harmony export */   getUsername: () => (/* binding */ getUsername),\n/* harmony export */   isAuthenticated: () => (/* binding */ isAuthenticated),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   logout: () => (/* binding */ logout),\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\nconst LOGIN_URL = \"https://wedev-api.sky.pro/api/user/login\";\r\nconst REGISTER_URL = \"https://wedev-api.sky.pro/api/user\";\r\n\r\nfunction getToken() {\r\n  return localStorage.getItem(\"token\") || null;\r\n}\r\n\r\nfunction getUsername() {\r\n  return localStorage.getItem(\"username\") || null;\r\n}\r\n\r\nfunction isAuthenticated() {\r\n  return !!getToken();\r\n}\r\n\r\nfunction logout() {\r\n  localStorage.removeItem(\"token\");\r\n  localStorage.removeItem(\"username\");\r\n}\r\n\r\nasync function parseJsonSafe(res) {\r\n  return res.json().catch(() => null);\r\n}\r\n\r\nasync function login(username, password) {\r\n  try {\r\n    const res = await fetch(LOGIN_URL, {\r\n      method: \"POST\",\r\n      body: JSON.stringify({ login: username, password }),\r\n    });\r\n\r\n    const data = await parseJsonSafe(res);\r\n\r\n    if (!res.ok) {\r\n      if (res.status === 400) throw new Error(data?.error || \"Неверные данные\");\r\n      if (res.status >= 500) throw new Error(\"server\");\r\n      throw new Error(data?.error || `Ошибка: ${res.status}`);\r\n    }\r\n\r\n    const user = data?.user;\r\n    if (!user?.token) throw new Error(\"no-token\");\r\n\r\n    localStorage.setItem(\"token\", user.token);\r\n    localStorage.setItem(\"username\", user.name || username);\r\n    return user;\r\n  } catch (err) {\r\n    if (err instanceof TypeError) throw new Error(\"network\");\r\n    throw err;\r\n  }\r\n}\r\n\r\nasync function register(loginName, password, name) {\r\n  if (!loginName || !password || password.length < 6) {\r\n    throw new Error(\"Введите логин и пароль (пароль не короче 6 символов)\");\r\n  }\r\n\r\n  try {\r\n    const res = await fetch(REGISTER_URL, {\r\n      method: \"POST\",\r\n      body: JSON.stringify({ login: loginName, password, name }),\r\n    });\r\n\r\n    const data = await parseJsonSafe(res);\r\n\r\n    if (!res.ok) {\r\n      if (res.status === 400) throw new Error(data?.error || \"Неверные данные при регистрации\");\r\n      if (res.status >= 500) throw new Error(\"server\");\r\n      throw new Error(data?.error || `Ошибка: ${res.status}`);\r\n    }\r\n\r\n    const user = data?.user;\r\n    if (!user) {\r\n      throw new Error(\"no-user\");\r\n    }\r\n\r\n    \r\n    if (user.token) {\r\n      localStorage.setItem(\"token\", user.token);\r\n      localStorage.setItem(\"username\", user.name || name || loginName);\r\n    } else {\r\n    \r\n    }\r\n\r\n    return user;\r\n  } catch (err) {\r\n    if (err instanceof TypeError) throw new Error(\"network\");\r\n    throw err;\r\n  }\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./auth.js?\n}");

/***/ }),

/***/ "./comments.js":
/*!*********************!*\
  !*** ./comments.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   loadComments: () => (/* binding */ loadComments),\n/* harmony export */   pushComment: () => (/* binding */ pushComment)\n/* harmony export */ });\n/* harmony import */ var _apiV2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiV2.js */ \"./apiV2.js\");\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.js */ \"./auth.js\");\n\r\n\r\n\r\nlet comments = [];\r\n\r\n\r\nlet isPosting = false;\r\n\r\nasync function loadComments() {\r\n  try {\r\n    const serverComments = await (0,_apiV2_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsV2)();\r\n    const seen = new Set();\r\n    comments = (serverComments || []).filter(c => {\r\n      if (!c || seen.has(c.id)) return false;\r\n      seen.add(c.id);\r\n      return true;\r\n    });\r\n    return comments;\r\n  } catch (err) {\r\n    throw err;\r\n  }\r\n}\r\n\r\nasync function pushComment(obj) {\r\n  if (isPosting) {\r\n    throw new Error(\"posting\");\r\n  }\r\n\r\n  const token = (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.getToken)();\r\n  if (!token) throw new Error(\"auth\");\r\n\r\n  isPosting = true;\r\n  try {\r\n    await (0,_apiV2_js__WEBPACK_IMPORTED_MODULE_0__.addCommentV2)(obj.text, token);\r\n   \r\n    await loadComments();\r\n    return comments;\r\n  } catch (err) {\r\n    throw err;\r\n  } finally {\r\n    isPosting = false;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./comments.js?\n}");

/***/ }),

/***/ "./escape.js":
/*!*******************!*\
  !*** ./escape.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   escapeHTML: () => (/* binding */ escapeHTML)\n/* harmony export */ });\nfunction escapeHTML(str) {\r\n  return String(str)\r\n    .replaceAll(\"&\", \"&amp;\")\r\n    .replaceAll(\"<\", \"&lt;\")\r\n    .replaceAll(\">\", \"&gt;\")\r\n    .replaceAll('\"', \"&quot;\")\r\n    .replaceAll(\"'\", \"&#39;\");\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./escape.js?\n}");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n/* harmony import */ var _initListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initListeners.js */ \"./initListeners.js\");\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comments.js */ \"./comments.js\");\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.js */ \"./auth.js\");\n/* harmony import */ var _modules_initAddComment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/initAddComment.js */ \"./modules/initAddComment.js\");\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\r\n  const commentsList = document.querySelector(\".comments\");\r\n  if (commentsList) commentsList.innerHTML = '<div class=\"loading\">Загрузка комментариев...</div>';\r\n\r\n  try {\r\n    await (0,_comments_js__WEBPACK_IMPORTED_MODULE_2__.loadComments)();\r\n    (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)();\r\n\r\n   \r\n    (0,_initListeners_js__WEBPACK_IMPORTED_MODULE_1__.initListeners)();\r\n\r\n  \r\n    (0,_modules_initAddComment_js__WEBPACK_IMPORTED_MODULE_4__.initAddComment)();\r\n  } catch (err) {\r\n    console.error(err);\r\n    if (commentsList) {\r\n      if (err.message === \"server\") commentsList.innerHTML = '<div class=\"error\">Сервер сломался, попробуйте позже</div>';\r\n      else if (err.message === \"network\") commentsList.innerHTML = '<div class=\"error\">Кажется, у вас пропал интернет</div>';\r\n      else commentsList.innerHTML = `<div class=\"error\">${err.message}</div>`;\r\n    }\r\n  }\r\n});\n\n//# sourceURL=webpack://webdev-dom-homework/./index.js?\n}");

/***/ }),

/***/ "./initListeners.js":
/*!**************************!*\
  !*** ./initListeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initListeners: () => (/* binding */ initListeners)\n/* harmony export */ });\n/* harmony import */ var _modules_initAddComment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/initAddComment.js */ \"./modules/initAddComment.js\");\n/* harmony import */ var _modules_initReply_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/initReply.js */ \"./modules/initReply.js\");\n/* harmony import */ var _modules_initLikeToggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/initLikeToggle.js */ \"./modules/initLikeToggle.js\");\n\r\n\r\n\r\n\r\nfunction initListeners() {\r\n  (0,_modules_initAddComment_js__WEBPACK_IMPORTED_MODULE_0__.initAddComment)();\r\n  (0,_modules_initReply_js__WEBPACK_IMPORTED_MODULE_1__.initReply)();\r\n  (0,_modules_initLikeToggle_js__WEBPACK_IMPORTED_MODULE_2__.initLikeToggle)();\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./initListeners.js?\n}");

/***/ }),

/***/ "./modules/initAddComment.js":
/*!***********************************!*\
  !*** ./modules/initAddComment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initAddComment: () => (/* binding */ initAddComment)\n/* harmony export */ });\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../comments.js */ \"./comments.js\");\n/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../escape.js */ \"./escape.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderComments.js */ \"./renderComments.js\");\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.js */ \"./auth.js\");\n\r\n\r\n\r\n\r\n\r\nfunction initAddComment() {\r\n  const addBtn = document.getElementById(\"add-btn\");\r\n  const nameInput = document.getElementById(\"name-input\");\r\n  const commentInput = document.getElementById(\"comment-input\");\r\n  const addForm = document.querySelector(\".add-form\");\r\n  const container = document.querySelector(\".container\");\r\n\r\n  if (!addForm || !addBtn) return;\r\n\r\n  \r\n  if (addBtn.dataset.initialized === \"1\") return;\r\n  addBtn.dataset.initialized = \"1\";\r\n\r\n  \r\n  if (!(0,_auth_js__WEBPACK_IMPORTED_MODULE_3__.isAuthenticated)()) {\r\n    addForm.style.display = \"none\";\r\n    if (!document.querySelector(\".login-hint\")) {\r\n      const hint = document.createElement(\"div\");\r\n      hint.className = \"login-hint\";\r\n      hint.innerHTML = `Чтобы добавить комментарий, <a href=\"#\" id=\"to-login\">авторизуйтесь</a>`;\r\n      container.appendChild(hint);\r\n      document.getElementById(\"to-login\").addEventListener(\"click\", (e) => {\r\n        e.preventDefault();\r\n        __webpack_require__.e(/*! import() */ \"loginComponent_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../loginComponent.js */ \"./loginComponent.js\")).then(m => m.renderLoginPage());\r\n      });\r\n    }\r\n    return;\r\n  }\r\n\r\n  \r\n  addForm.style.display = \"\";\r\n  if (nameInput) {\r\n    nameInput.value = (0,_auth_js__WEBPACK_IMPORTED_MODULE_3__.getUsername)() || \"\";\r\n    nameInput.setAttribute(\"readonly\", \"readonly\");\r\n  }\r\n\r\n  addBtn.addEventListener(\"click\", async () => {\r\n    \r\n    if (addBtn.disabled) return;\r\n    const name = nameInput.value.trim();\r\n    const comment = commentInput.value.trim();\r\n\r\n    if (name.length < 3 || comment.length < 3) {\r\n      alert(\"Имя и комментарий должны быть не короче 3 символов\");\r\n      return;\r\n    }\r\n\r\n    const safeName = (0,_escape_js__WEBPACK_IMPORTED_MODULE_1__.escapeHTML)(name);\r\n    const safeComment = (0,_escape_js__WEBPACK_IMPORTED_MODULE_1__.escapeHTML)(comment);\r\n\r\n    let addingEl = null;\r\n    try {\r\n      addBtn.disabled = true;\r\n\r\n      \r\n      addingEl = document.createElement(\"div\");\r\n      addingEl.className = \"adding-comment\";\r\n      addingEl.textContent = \"Комментарий добавляется\";\r\n      addForm.style.display = \"none\";\r\n      if (addForm.parentNode) addForm.parentNode.insertBefore(addingEl, addForm);\r\n\r\n      await (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.pushComment)({ name: safeName, text: safeComment });\r\n\r\n      \r\n      await (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)();\r\n      commentInput.value = \"\";\r\n    } catch (err) {\r\n      if (err.message === \"auth\") {\r\n        alert(\"Требуется авторизация\");\r\n      } else if (err.message === \"server\") {\r\n        alert(\"Сервер сломался, попробуйте позже\");\r\n      } else if (err.message === \"network\") {\r\n        alert(\"Кажется, у вас пропал интернет, попробуйте позже\");\r\n      } else if (err.message === \"posting\") {\r\n      \r\n      } else {\r\n        alert(err?.message || \"Не удалось добавить комментарий\");\r\n      }\r\n    \r\n    } finally {\r\n      addBtn.disabled = false;\r\n      if (addingEl && addingEl.parentNode) addingEl.remove();\r\n      addForm.style.display = \"\";\r\n    }\r\n  });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/initAddComment.js?\n}");

/***/ }),

/***/ "./modules/initLikeToggle.js":
/*!***********************************!*\
  !*** ./modules/initLikeToggle.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initLikeToggle: () => (/* binding */ initLikeToggle)\n/* harmony export */ });\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../comments.js */ \"./comments.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderComments.js */ \"./renderComments.js\");\n\r\n\r\n\r\nfunction delay(interval = 300) {\r\n  return new Promise((resolve) => {\r\n    setTimeout(() => {\r\n      resolve();\r\n    }, interval);\r\n  });\r\n}\r\n\r\nfunction initLikeToggle() {\r\n  const commentsList = document.querySelector(\".comments\");\r\n  if (!commentsList) return;\r\n\r\n  commentsList.addEventListener(\"click\", async (event) => {\r\n    const likeBtn = event.target.closest(\".like-button\");\r\n    if (!likeBtn || !commentsList.contains(likeBtn)) return;\r\n\r\n    event.stopPropagation();\r\n    \r\n    const idx = Number(likeBtn.dataset.index);\r\n    if (Number.isNaN(idx) || !_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx]) return;\r\n\r\n    if (_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLikeLoading) return;\r\n\r\n    \r\n    _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLikeLoading = true;\r\n    (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\r\n\r\n    try {\r\n      \r\n      await delay(1000);\r\n\r\n      \r\n      if (_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLiked) {\r\n        _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].likes = Math.max(0, _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].likes - 1);\r\n        _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLiked = false;\r\n      } else {\r\n        _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].likes = (_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].likes || 0) + 1;\r\n        _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLiked = true;\r\n      }\r\n    } catch (error) {\r\n      console.error('Ошибка при обновлении лайка:', error);\r\n    } finally {\r\n\r\n      _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].isLikeLoading = false;\r\n      (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\r\n    }\r\n  });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/initLikeToggle.js?\n}");

/***/ }),

/***/ "./modules/initReply.js":
/*!******************************!*\
  !*** ./modules/initReply.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initReply: () => (/* binding */ initReply)\n/* harmony export */ });\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../comments.js */ \"./comments.js\");\n\r\n\r\nfunction initReply() {\r\n  const commentsList = document.querySelector(\".comments\");\r\n  if (!commentsList) return;\r\n\r\n  commentsList.addEventListener(\"click\", (event) => {\r\n    if (event.target.closest(\".like-button\")) return;\r\n\r\n    const li = event.target.closest(\".comment\");\r\n    if (!li || !commentsList.contains(li)) return;\r\n\r\n    const idx = Number(li.dataset.index);\r\n    if (Number.isNaN(idx) || !_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx]) return;\r\n\r\n    const author = _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].name;\r\n    const text = _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments[idx].text;\r\n    const commentInput = document.getElementById(\"comment-input\");\r\n    if (commentInput) {\r\n      commentInput.value = `> ${text}\\n${author}, `;\r\n      commentInput.focus();\r\n    }\r\n  });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/initReply.js?\n}");

/***/ }),

/***/ "./renderComments.js":
/*!***************************!*\
  !*** ./renderComments.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ \"./comments.js\");\n\r\n\r\nfunction renderComments() {\r\n  const commentsList = document.querySelector(\".comments\");\r\n  if (!commentsList) {\r\n    console.error(\"Не найден элемент для отображения комментариев\");\r\n    return;\r\n  }\r\n\r\n  if (!_comments_js__WEBPACK_IMPORTED_MODULE_0__.comments || _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments.length === 0) {\r\n    commentsList.innerHTML = '<div class=\"comments-empty\">Пока нет комментариев</div>';\r\n    return;\r\n  }\r\n\r\n   commentsList.innerHTML = _comments_js__WEBPACK_IMPORTED_MODULE_0__.comments\r\n    .map(\r\n         (c, index) => `\r\n    <li class=\"comment\" data-index=\"${index}\">\r\n      <div class=\"comment-header\">\r\n        <div>${c.name}</div>\r\n        <div>${c.date}</div>\r\n      </div>\r\n      <div class=\"comment-body\">\r\n        <div class=\"comment-text\">${c.text}</div>\r\n      </div>\r\n      <div class=\"comment-footer\">\r\n        <div class=\"likes\">\r\n          <span class=\"likes-counter\">${c.likes}</span>\r\n          <button class=\"like-button${c.isLiked ? \" -active-like\" : \"\"}${c.isLikeLoading ? \" -loading-like\" : \"\"}\" \r\n            data-index=\"${index}\" \r\n            type=\"button\"\r\n            ${c.isLikeLoading ? \"disabled\" : \"\"}\r\n          ></button>\r\n        </div>\r\n      </div>\r\n    </li>`\r\n  )\r\n    .join(\"\");\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComments.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".main.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webdev-dom-homework:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebdev_dom_homework"] = self["webpackChunkwebdev_dom_homework"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
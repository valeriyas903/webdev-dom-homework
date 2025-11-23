"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebdev_dom_homework"] = self["webpackChunkwebdev_dom_homework"] || []).push([["registerComponent_js"],{

/***/ "./registerComponent.js":
/*!******************************!*\
  !*** ./registerComponent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegisterPage: () => (/* binding */ renderRegisterPage)\n/* harmony export */ });\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ \"./auth.js\");\n/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments.js */ \"./comments.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n/* harmony import */ var _initListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initListeners.js */ \"./initListeners.js\");\n\r\n\r\n\r\n\r\n\r\nfunction renderRegisterPage() {\r\n  const container = document.querySelector(\".container\");\r\n  if (!container) return;\r\n\r\n  container.innerHTML = `\r\n    <div class=\"register-page\">\r\n      <h2>Регистрация</h2>\r\n      <input id=\"reg-login\" placeholder=\"Логин\" />\r\n      <input id=\"reg-name\" placeholder=\"Имя\" />\r\n      <input id=\"reg-pass\" placeholder=\"Пароль (мин 6)\" type=\"password\" />\r\n      <div>\r\n        <button id=\"reg-btn\" type=\"button\">Зарегистрироваться</button>\r\n        <button id=\"reg-cancel\" type=\"button\">Отмена</button>\r\n      </div>\r\n      <div id=\"reg-error\" style=\"color:red;margin-top:10px;\"></div>\r\n    </div>\r\n  `;\r\n\r\n  const btn = document.getElementById(\"reg-btn\");\r\n  const cancel = document.getElementById(\"reg-cancel\");\r\n  const errEl = document.getElementById(\"reg-error\");\r\n\r\n  btn.addEventListener(\"click\", async () => {\r\n    errEl.textContent = \"\";\r\n    const loginVal = document.getElementById(\"reg-login\").value.trim();\r\n    const nameVal = document.getElementById(\"reg-name\").value.trim();\r\n    const passVal = document.getElementById(\"reg-pass\").value;\r\n\r\n    if (!loginVal || !passVal || passVal.length < 6) {\r\n      errEl.textContent = \"Введите логин и пароль (пароль минимум 6 символов)\";\r\n      return;\r\n    }\r\n\r\n    btn.disabled = true;\r\n    try {\r\n      await (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.register)(loginVal, passVal, nameVal);\r\n      \r\n      await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.loadComments)();\r\n      (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)();\r\n      (0,_initListeners_js__WEBPACK_IMPORTED_MODULE_3__.initListeners)();\r\n      \r\n      location.href = location.pathname;\r\n    } catch (e) {\r\n      if (e.message === \"server\") {\r\n        errEl.textContent = \"Сервер сломался, попробуйте позже\";\r\n      } else {\r\n        errEl.textContent = e.message || \"Ошибка регистрации\";\r\n      }\r\n    } finally {\r\n      btn.disabled = false;\r\n    }\r\n  });\r\n\r\n  cancel.addEventListener(\"click\", () => {\r\n    location.href = location.pathname;\r\n  });\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./registerComponent.js?\n}");

/***/ })

}]);
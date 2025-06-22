"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/public")); // static lấy ảnh từ sever
  app.set("view engine", "ejs"); //go duoc login trong html
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
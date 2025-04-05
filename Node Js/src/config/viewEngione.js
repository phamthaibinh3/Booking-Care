import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));            // static lấy ảnh từ sever
    app.set("view engine", "ejs");                     //go duoc login trong html
    app.set("views", "./src/views")
}

module.exports = configViewEngine;
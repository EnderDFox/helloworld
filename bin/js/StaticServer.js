"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
console.log(__dirname, "{__dirname}");
console.log(path.resolve(__dirname, '../../'));
// app.use(express.static(__dirname + '/..'));
app.get('/', function (req, res, next) {
    res.redirect(303, '/bin/index.html');
});
var rootPath = "../../"; //"C:/fox/projects/helloword/webgl";
// var rootPath:string = "C:/fox/books/code/WebGL/WebGL Programming Guide Code";
app.use(express.static(path.resolve(__dirname, rootPath)));
app.use(function (req, res, next) {
    console.log("404", req.url);
});
app.use(function (err, req, res, next) {
    console.error("err:", err.stack);
});
app.set('port', 3000);
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate StaticServer.');
});

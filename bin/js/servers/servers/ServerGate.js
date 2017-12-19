"use strict";
/// <reference path="../test2s/C1.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Ce_1 = require("./Ce");
console.log("[info]", "Init");
// import fs from "fs";//不要用import否则tsc到这里会断掉
var fs = require("fs");
var files = fs.readdirSync("./");
for (var i = 0; i < files.length; i++) {
    var item = files[i];
    console.log("[info]", "file:", item);
}
// import {t2e} from "../test2s/index";
var ServerGate = /** @class */ (function () {
    function ServerGate() {
        this.fs = require("fs");
        console.log("[info]", "ServerGate constructor 2017.11.22 10:19");
        // new t2.C1().f1();
        new Ce_1.Ce().f1();
    }
    return ServerGate;
}());
new ServerGate();
// new t2e.c2e();
// new t2.C2A();
/* import {Student} from "../test1s/Student";
// fs.access;
// new Sub2();
let a = Math.sqrt(2);
console.log("[info]",a);
new Student("ServerGate 2017.10.29 16:04","M","L").func1();
 */ 
//# sourceMappingURL=ServerGate.js.map
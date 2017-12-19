var t2;
(function (t2) {
    var C1 = /** @class */ (function () {
        function C1() {
            console.log("C1.constructor");
        }
        C1.prototype.f1 = function () {
            new t2.C2().f1();
            console.log("[debug]", "c1.f1");
        };
        return C1;
    }());
    t2.C1 = C1;
})(t2 || (t2 = {}));
var t2;
(function (t2) {
    var C2 = /** @class */ (function () {
        function C2() {
            console.log("C2.constructor");
        }
        C2.prototype.f1 = function () {
            console.log("C2.f1");
        };
        return C2;
    }());
    t2.C2 = C2;
})(t2 || (t2 = {}));
/* import * from "../test2s/C1";
export class Ce{
    public f1(){
        // let t2 = require("../test2s/C1.ts");
        new t2.C1().f1();
        console.log("[debug]","Ce.f1");
    }
} */ 
/// <reference path="../test2s/C1.ts" />
// import { Ce } from "./Ce";
console.log("[info]", "Init");
/*
import fs from "fs";//不要用import否则tsc with outfile到这里会断掉
// let fs = require("fs");
let files:string[] = fs.readdirSync("./");
for (let i = 0; i < files.length; i++) {
    let item:string = files[i];
    console.log("[info]","file:",item);
}
*/
// import {t2e} from "../test2s/index";
var ServerGate = /** @class */ (function () {
    function ServerGate() {
        this.fs = require("fs");
        console.log("[info]", "ServerGate constructor 2017.11.22 10:19");
        new t2.C1().f1();
        // new Ce().f1();
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
//# sourceMappingURL=bundle_server.js.map
/// <reference path="../test2s/C1.ts" />

// import { Ce } from "./Ce";

console.log("[info]","Init");
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

class ServerGate{
    public fs = require("fs");
    constructor(){
        console.log("[info]","ServerGate constructor 2017.11.22 10:19");
        new t2.C1().f1();
        // new Ce().f1();
    }
}

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
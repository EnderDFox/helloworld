"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="Defind.ts" />
// import {Defind} from "../test1s/Defind";
// new Defind();
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
        console.log("[debug]", "funllName", this.fullName);
    }
    Student.prototype.func1 = function () {
        new TestBundle().exec();
    };
    return Student;
}());
exports.Student = Student;
var Student2 = /** @class */ (function () {
    function Student2() {
        console.log("[debug]", "This is student2");
    }
    Student2.prototype.func1 = function () {
        new TestBundle().exec();
    };
    return Student2;
}());
exports.Student2 = Student2;
//# sourceMappingURL=Student.js.map
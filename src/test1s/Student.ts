/// <reference path="Defind.ts" />
// import {Defind} from "../test1s/Defind";
// new Defind();
export class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
        console.log("[debug]", "funllName", this.fullName);
    }
    public func1(): void {
        new TestBundle().exec();
    }
}
export class Student2 {
    constructor() {
        console.log("[debug]", "This is student2");
    }
    public func1(): void {
        new TestBundle().exec();
    }
}




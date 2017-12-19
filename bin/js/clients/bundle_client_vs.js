var t2;
(function (t2) {
    var C1 = /** @class */ (function () {
        function C1() {
            console.log("C1.constructor");
        }
        C1.prototype.func1 = function () {
            new t2.C2().f1();
            new t2.C3().f1();
            // new C3().f1();
            console.log("[debug]", "func1");
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
var t2;
(function (t2) {
    var C3 = /** @class */ (function () {
        function C3() {
            console.log("C3.constructor");
        }
        C3.prototype.f1 = function () {
            console.log("[info]", "c3.f1");
        };
        C3.prototype.f2 = function () {
            console.log("[info]", "c3.f2");
        };
        return C3;
    }());
    t2.C3 = C3;
})(t2 || (t2 = {}));
///// <reference path="../test1s/Student.ts" />
//new Student("From ClientGate","M","L").func1();
var ClientGate = /** @class */ (function () {
    function ClientGate() {
        new t2.C1().func1();
    }
    return ClientGate;
}());
//# sourceMappingURL=bundle_client_vs.js.map
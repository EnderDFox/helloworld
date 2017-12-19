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
//# sourceMappingURL=C3.js.map
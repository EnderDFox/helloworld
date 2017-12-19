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
//# sourceMappingURL=C1.js.map
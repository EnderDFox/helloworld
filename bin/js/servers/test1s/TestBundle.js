var TestBundle = /** @class */ (function () {
    function TestBundle() {
    }
    TestBundle.prototype.exec = function () {
        console.log("[info]", "This is TestBundle.exec()");
        new Sub1();
        new Sub2();
        new Sub3();
    };
    return TestBundle;
}());
//# sourceMappingURL=TestBundle.js.map
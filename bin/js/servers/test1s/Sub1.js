var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Sub1 = /** @class */ (function (_super) {
    __extends(Sub1, _super);
    function Sub1() {
        var _this = _super.call(this) || this;
        console.log("[debug]", "This is Sub1");
        new Sub3();
        return _this;
    }
    return Sub1;
}(Sub2));
//# sourceMappingURL=Sub1.js.map
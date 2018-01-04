/*
*/
var SDKAdapter = /** @class */ (function () {
    function SDKAdapter() {
    }
    return SDKAdapter;
}());
var SDKAdapterFG = /** @class */ (function () {
    function SDKAdapterFG() {
    }
    SDKAdapterFG.Transition_Play = function (target, onComplete, onCompleteObj, onCompleteParam, times, delay) {
        target.play(onComplete, onCompleteObj, onCompleteParam, times, delay);
    };
    SDKAdapterFG.GObject_addClickListener = function (target, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        thisObj != null || (thisObj = target);
        target.addClickListener(listener, thisObj);
    };
    SDKAdapterFG.GObject_addEventListener = function (target, type, listener, thisObject) {
        if (thisObject === void 0) { thisObject = null; }
        thisObject != null || (thisObject = target);
        target.addEventListener(type, listener, thisObject);
    };
    return SDKAdapterFG;
}());
//# sourceMappingURL=SDKAdapterEgret.js.map
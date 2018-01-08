var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
*/
var SDKAdapter = (function () {
    function SDKAdapter() {
    }
    return SDKAdapter;
}());
__reflect(SDKAdapter.prototype, "SDKAdapter");
var SDKAdapterFG = (function () {
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
__reflect(SDKAdapterFG.prototype, "SDKAdapterFG");
//# sourceMappingURL=SDKAdapterEgret.js.map
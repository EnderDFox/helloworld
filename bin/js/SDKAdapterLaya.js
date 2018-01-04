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
        target.play(new Handler(onComplete, onCompleteObj, onCompleteParam), times, delay);
    };
    SDKAdapterFG.GObject_OnClick = function (target, thisObj, listener) {
        target.onClick(thisObj, listener);
    };
    return SDKAdapterFG;
}());
//# sourceMappingURL=SDKAdapterLaya.js.map
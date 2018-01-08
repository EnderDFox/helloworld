var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Comp1 = (function () {
    function Comp1() {
        this.v1x = 0;
        this.v1y = 0;
    }
    Comp1.prototype.init = function () {
        this.ui = fuis.Package1.UI_Comp1.createInstance();
        this.ui.setXY((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500);
        this.v1x = this.ui.m_anim1.x;
        this.v1y = this.ui.m_anim1.y;
    };
    Comp1.prototype.tick = function () {
        this.v1x += 1;
        this.v1y += Math.random();
        this.ui.m_txt1.setXY(this.v1x, this.v1y);
    };
    Comp1.prototype.dispose = function () {
        this.ui.dispose();
        this.ui = null;
    };
    Object.defineProperty(Comp1.prototype, "play_t0", {
        get: function () {
            return this.ui.m_t0.playing;
        },
        set: function (val) {
            if (val) {
                SDKAdapterFG.Transition_Play(this.ui.m_t0, null, null, null, -1);
            }
            else {
                this.ui.m_t0.stop();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Comp1;
}());
__reflect(Comp1.prototype, "Comp1");
//# sourceMappingURL=Comp1.js.map
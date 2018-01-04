var TestA = /** @class */ (function () {
    function TestA() {
        this.comps = new Array();
        this._play_to = false;
    }
    TestA.prototype.init = function () {
        fuis.Package1.Package1Binder.bindAll();
    };
    TestA.prototype.start = function () {
        //
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_sub, this, this.onMenu1_sub);
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_sub, this, this.onMenu1_sub);
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_add, this, this.onMenu1_add);
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_t0, this, this.onMenu1_t0);
        // this.menu1.m_btn_sub.addClickListener(this.onMenu1_sub, this);
        // this.menu1.m_btn_add.addClickListener(this.onMenu1_add, this);
        // this.menu1.m_btn_t0.addClickListener(this.onMenu1_t0, this);
        this.menu1.x = this.w - this.menu1.width;
        this.menu1.y = this.h - this.menu1.height;
        //
        this.box = new fairygui.GComponent();
        this.root.addChild(this.box);
        this.root.addChild(this.menu1);
        this.reset(10);
        // setTimeout(()=>{this.tick();},100);
        // window.requestAnimationFrame((time:number)=>{this.tick(time);});
    };
    TestA.prototype.tick = function (time) {
        if (time === void 0) { time = 0; }
        console.log("tick", this.comps.length);
        for (var i = 0; i < this.comps.length; i++) {
            var item = this.comps[i];
            item.tick();
        }
    };
    Object.defineProperty(TestA.prototype, "play_t0", {
        get: function () {
            return this._play_to;
        },
        set: function (val) {
            this._play_to = val;
            for (var i = 0; i < this.comps.length; i++) {
                var item = this.comps[i];
                item.play_t0 = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    TestA.prototype.reset = function (count) {
        if (count < 0) {
            count = 0;
        }
        this.menu1.m_txt_currCount.text = count.toString();
        for (var i = this.comps.length; i < count; i++) {
            var item = new Comp1();
            item.init();
            this.box.addChild(item.ui);
            this.comps.push(item);
        }
        for (var i = this.comps.length - 1; i >= count; i--) {
            this.comps[i].dispose();
            this.comps.pop();
        }
    };
    TestA.prototype.onMenu1_sub = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        this.reset(this.comps.length - 10);
    };
    TestA.prototype.onMenu1_add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.reset(this.comps.length + 10);
    };
    TestA.prototype.onMenu1_t0 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.play_t0 = !this.play_t0;
    };
    return TestA;
}());
//# sourceMappingURL=TestA.js.map
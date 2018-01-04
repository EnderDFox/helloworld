var TestFairyGUI = /** @class */ (function () {
    function TestFairyGUI() {
        this.comps = new Array();
        this._play_to = false;
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        //---list0
        this.menu1.m_list0.setVirtual();
        this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
        //
        this.menu1.m_list0.data = ["-100", "-10", "+10", "+100"];
        this.menu1.m_list0.numItems = this.menu1.m_list0.data.length;
        this.menu1.m_list0.refreshVirtualList();
        //---list1
        this.menu1.m_list1.setVirtual();
        this.menu1.m_list1.itemRenderer = this.list1_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list1, fairygui.ItemEvent.CLICK, this.list1_itemClick, this);
        //
        this.menu1.m_list1.data = ["tween"];
        this.menu1.m_list1.numItems = this.menu1.m_list1.data.length;
        this.menu1.m_list1.refreshVirtualList();
        //---
        TestMain.alignRightBottom(this.menu1);
        //
        this.ui = new fairygui.GComponent();
        this.box = new fairygui.GComponent();
        this.ui.addChild(this.box);
        this.ui.addChild(this.menu1);
        this.reset(10);
        // setTimeout(()=>{this.tick();},100);
        // window.requestAnimationFrame((time:number)=>{this.tick(time);});
    }
    TestFairyGUI.prototype.list0_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list0.data[i];
    };
    TestFairyGUI.prototype.list0_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        this.reset(this.comps.length + parseInt(this.menu1.m_list0.data[i]));
    };
    TestFairyGUI.prototype.list1_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list1.data[i];
    };
    TestFairyGUI.prototype.list1_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        switch (i) {
            case 0:
                this.play_t0 = !this.play_t0;
                break;
        }
    };
    TestFairyGUI.prototype.tick = function (time) {
        if (time === void 0) { time = 0; }
        console.log("tick", this.comps.length);
        for (var i = 0; i < this.comps.length; i++) {
            var item = this.comps[i];
            item.tick();
        }
    };
    Object.defineProperty(TestFairyGUI.prototype, "play_t0", {
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
    TestFairyGUI.prototype.reset = function (count) {
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
    return TestFairyGUI;
}());
//# sourceMappingURL=TestFairyGUI.js.map
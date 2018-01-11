var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TestGPUDrawCall = (function () {
    function TestGPUDrawCall() {
        this.list = new Array();
        this._play_tween0 = false;
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        //---list0
        this.menu1.m_list0.setVirtual();
        this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
        //
        this.menu1.m_list0.data = ["+1", "+10", "+100"];
        this.menu1.m_list0.numItems = this.menu1.m_list0.data.length;
        this.menu1.m_list0.refreshVirtualList();
        //---list1
        /*this.menu1.m_list1.setVirtual();
        this.menu1.m_list1.itemRenderer = this.list1_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list1, fairygui.ItemEvent.CLICK, this.list1_itemClick, this);
        //
        this.menu1.m_list1.data = ["tween"];
        this.menu1.m_list1.numItems = (<Array<string>>this.menu1.m_list1.data).length;
        this.menu1.m_list1.refreshVirtualList();*/
        this.menu1.m_list1.visible = false;
        //---
        TestMain.alignRightBottom(this.menu1);
        //
        this.ui = new fairygui.GComponent();
        this.box = new fairygui.GComponent();
        this.ui.addChild(this.box);
        this.ui.addChild(this.menu1);
        this.reset(0);
        this.tick(0);
    }
    TestGPUDrawCall.prototype.list0_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list0.data[i];
    };
    TestGPUDrawCall.prototype.list0_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        this.reset(this.list.length + parseInt(this.menu1.m_list0.data[i]));
    };
    TestGPUDrawCall.prototype.list1_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list1.data[i];
    };
    TestGPUDrawCall.prototype.list1_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        switch (i) {
            case 0:
                this._play_tween0 = !this._play_tween0;
                break;
        }
    };
    TestGPUDrawCall.prototype.tick = function (time) {
        if (this.play_tween0) {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.rotation++;
            }
        }
        window.requestAnimationFrame(this.tick.bind(this));
    };
    Object.defineProperty(TestGPUDrawCall.prototype, "play_tween0", {
        get: function () {
            return this._play_tween0;
        },
        set: function (val) {
            this._play_tween0 = val;
        },
        enumerable: true,
        configurable: true
    });
    TestGPUDrawCall.prototype.reset = function (count) {
        if (count < 0) {
            count = 0;
        }
        this.menu1.m_txt_currCount.text = count.toString();
        for (var i = this.list.length; i < count; i++) {
            // var txtr:egret.Texture = RES.getRes( "testa"+(i+1) );
            var tex = RES.getRes("testa" + (i % 2 == 1 ? 1 : 2) + "_png");
            /*** 本示例关键代码段结束 ***/
            var bitmap = new egret.Bitmap(tex);
            var wHalf = bitmap.anchorOffsetX = tex.textureWidth / 2;
            var hHalf = bitmap.anchorOffsetY = tex.textureHeight / 2;
            bitmap.x = TestProfile.egretRoot.stage.stageWidth * Math.random();
            bitmap.y = TestProfile.egretRoot.stage.stageHeight * Math.random();
            // bird.x = wHalfBird + ( TestProfile.stage.stageWidth - wHalfBird * 2 ) * Math.random() ;
            // bird.y = hHalfBird + ( this.stage.stageHeight - hHalfBird * 2 ) * Math.random() ;
            // vcBirds.push( bird );
            this.list.push(bitmap);
            TestProfile.egretRoot.addChild(bitmap);
        }
        // for (var i = this.comps.length - 1; i >= count; i--) {
        // this.list[i].remove
        // this.list.pop();
        // }
    };
    return TestGPUDrawCall;
}());
__reflect(TestGPUDrawCall.prototype, "TestGPUDrawCall");
//# sourceMappingURL=TestGPUDrawCall.js.map
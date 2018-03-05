var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TestTextureMax = (function () {
    function TestTextureMax() {
        this.imgCount = 0;
        this.list = new Array();
        this._play_tween0 = false;
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        //---list0
        this.menu1.m_list0.setVirtual();
        this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
        //
        this.menu1.m_list0.data = ["+1", "+5", "+10", "+20", "+50", "+100"];
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
        // this.menu1.m_list1.visible = false;
        //---txt
        this.menu1.m_txt_currCount.text = "0";
        // this.menu1.m_txt_currCount.visible = false;
        //---
        TestMain.alignRightBottom(this.menu1);
        //
        this.ui = new fairygui.GComponent();
        this.box = new fairygui.GComponent();
        this.ui.addChild(this.box);
        this.ui.addChild(this.menu1);
        //==
        this.tick(0);
    }
    TestTextureMax.prototype.list0_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list0.data[i];
    };
    TestTextureMax.prototype.list0_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        this.addTextureCount = parseInt(this.menu1.m_list0.data[i]);
        this.addTextures();
    };
    TestTextureMax.prototype.list1_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list1.data[i];
    };
    TestTextureMax.prototype.list1_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        switch (i) {
            case 0:
                this.play_tween0 = !this.play_tween0;
                break;
        }
    };
    TestTextureMax.prototype.addTextures = function () {
        if (this.addTextureCount > 0) {
            this.addTextureCount--;
            this.menu1.enabled = false;
            this.imgCount++;
            this.menu1.m_txt_currCount.text = this.imgCount.toString() + " - loading";
            RES.getResAsync("testb" + this.imgCount + "_png", this.getResHandler, this);
        }
    };
    TestTextureMax.prototype.getResHandler = function (tex, url) {
        this.menu1.enabled = true;
        if (!tex) {
            this.menu1.m_txt_currCount.text = this.imgCount.toString() + " - loading failed";
            console.log("getResHandler is failed", url);
            return;
        }
        this.menu1.m_txt_currCount.text = this.imgCount.toString() + " - loaded";
        var bitmap = new egret.Bitmap(tex);
        var wHalf = bitmap.anchorOffsetX = tex.textureWidth / 2;
        var hHalf = bitmap.anchorOffsetY = tex.textureHeight / 2;
        bitmap.x = TestProfile.egretRoot.stage.stageWidth * Math.random();
        bitmap.y = TestProfile.egretRoot.stage.stageHeight * Math.random();
        this.list.push(bitmap);
        TestProfile.egretRoot.addChild(bitmap);
        //
        this.addTextures();
    };
    Object.defineProperty(TestTextureMax.prototype, "play_tween0", {
        get: function () {
            return this._play_tween0;
        },
        set: function (val) {
            this._play_tween0 = val;
        },
        enumerable: true,
        configurable: true
    });
    TestTextureMax.prototype.tick = function (time) {
        if (this.play_tween0) {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.rotation++;
            }
        }
        window.requestAnimationFrame(this.tick.bind(this));
    };
    return TestTextureMax;
}());
__reflect(TestTextureMax.prototype, "TestTextureMax");
//# sourceMappingURL=TestTextureMax.js.map
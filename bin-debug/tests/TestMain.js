var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TestMain = (function () {
    function TestMain() {
        fuis.Package1.Package1Binder.bindAll();
        //===
        this.ui = new fairygui.GComponent();
        //
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        //---list
        this.menu1.m_list0.setVirtual();
        // this.menu1.m_list0.itemRenderer = (i, item) => { this.list0_itemRender(i, item) };
        this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
        //
        this.menu1.m_list0.data = ["CPU", "GPU", "TextureMax", "FairyGUI", "v8.18.26"];
        this.menu1.m_list0.numItems = this.menu1.m_list0.data.length;
        this.menu1.m_list0.refreshVirtualList();
        //
        this.menu1.m_list1.visible = false;
        this.menu1.m_txt_currCount.visible = false;
        //
        this.ui.addChild(this.menu1);
        TestMain.alignRightBottom(this.menu1);
    }
    TestMain.alignRightBottom = function (target) {
        target.x = fairygui.GRoot.inst.width - target.width;
        target.y = fairygui.GRoot.inst.height - target.height;
    };
    TestMain.prototype.list0_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list0.data[i];
    };
    TestMain.prototype.list0_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        switch (i) {
            case 0:
                this.ui.addChild(new TestCPUCalculate().ui);
                break;
            case 1:
                this.ui.addChild(new TestGPUDrawCall().ui);
                break;
            case 2:
                this.ui.addChild(new TestTextureMax().ui);
                break;
            case 3:
                this.ui.addChild(new TestFairyGUI().ui);
                break;
            default:
                return;
        }
        this.menu1.dispose();
    };
    return TestMain;
}());
__reflect(TestMain.prototype, "TestMain");
//# sourceMappingURL=TestMain.js.map
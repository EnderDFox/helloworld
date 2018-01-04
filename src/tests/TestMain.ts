class TestMain {
	public root: fairygui.GComponent;
	public ui: fairygui.GComponent;
	menu1: fuis.Package1.UI_Menu1;
	public constructor() {
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
		this.menu1.m_list0.data = ["CPU", "GPU", "FairyGUI"];
		this.menu1.m_list0.numItems = (<Array<string>>this.menu1.m_list0.data).length;
		this.menu1.m_list0.refreshVirtualList();
		//
		this.menu1.m_list1.visible = false;
		this.menu1.m_txt_currCount.visible = false;
		//
		this.ui.addChild(this.menu1);
		TestMain.alignRightBottom(this.menu1);
	}
	public static alignRightBottom(target: fairygui.GObject): void {
		target.x = fairygui.GRoot.inst.width - target.width;
		target.y = fairygui.GRoot.inst.height - target.height;
	}

	list0_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list0.data[i];
	}
	list0_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		switch (i) {
			case 0:
				this.ui.addChild(new TestCPUCalculate().ui);
				break;
			case 1:
				this.ui.addChild(new TestGPUDrawCall().ui);
				break;
			case 2:
				this.ui.addChild(new TestFairyGUI().ui);
				break;
		}
		this.menu1.dispose();
	}
}
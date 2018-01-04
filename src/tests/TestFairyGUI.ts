class TestFairyGUI {
	public ui:fairygui.GComponent;
	menu1: fuis.Package1.UI_Menu1;
	public box: fairygui.GComponent;
	comps: Comp1[] = new Array();
	public constructor() {
		this.menu1 = fuis.Package1.UI_Menu1.createInstance();
		//---list0
		this.menu1.m_list0.setVirtual();
		this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
		//
		this.menu1.m_list0.data = ["-100", "-10", "+10", "+100"];
		this.menu1.m_list0.numItems = (<Array<string>>this.menu1.m_list0.data).length;
		this.menu1.m_list0.refreshVirtualList();
		//---list1
		this.menu1.m_list1.setVirtual();
		this.menu1.m_list1.itemRenderer = this.list1_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list1, fairygui.ItemEvent.CLICK, this.list1_itemClick, this);
		//
		this.menu1.m_list1.data = ["tween"];
		this.menu1.m_list1.numItems = (<Array<string>>this.menu1.m_list1.data).length;
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
	list0_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list0.data[i];
	}
	list0_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		this.reset(this.comps.length + parseInt(this.menu1.m_list0.data[i]));
	}
	list1_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list1.data[i];
	}
	list1_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		switch (i) {
			case 0:
				this.play_t0 = !this.play_t0;
				break;
		}
	}
	tick(time: number = 0): void {
		console.log("tick", this.comps.length);
		for (let i = 0; i < this.comps.length; i++) {
			let item: Comp1 = this.comps[i];
			item.tick();
		}
	}
	private _play_to: boolean = false;
	public get play_t0(): boolean {
		return this._play_to;
	}
	public set play_t0(val: boolean) {
		this._play_to = val;
		for (let i = 0; i < this.comps.length; i++) {
			let item: Comp1 = this.comps[i];
			item.play_t0 = val;
		}
	}
	reset(count: number): void {
		if (count < 0) {
			count = 0;
		}
		this.menu1.m_txt_currCount.text = count.toString();
		for (var i = this.comps.length; i < count; i++) {
			var item: Comp1 = new Comp1();
			item.init();
			this.box.addChild(item.ui);
			this.comps.push(item);
		}
		for (var i = this.comps.length - 1; i >= count; i--) {
			this.comps[i].dispose();
			this.comps.pop();
		}
	}
}
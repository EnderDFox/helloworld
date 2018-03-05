class TestTextureMax {
	public ui: fairygui.GComponent;
	menu1: fuis.Package1.UI_Menu1;
	public box: fairygui.GComponent;
	public imgCount: number = 0;
	list: egret.Bitmap[] = new Array();
	public constructor() {
		this.menu1 = fuis.Package1.UI_Menu1.createInstance();
		//---list0
		this.menu1.m_list0.setVirtual();
		this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
		//
		this.menu1.m_list0.data = ["+1","+5","+10","+20","+50","+100"];
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
	list0_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list0.data[i];
	}
	list0_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		this.addTextureCount = parseInt(this.menu1.m_list0.data[i]);
		this.addTextures();
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
				this.play_tween0 = !this.play_tween0;
				break;
		}
	}
	addTextureCount:number;
	addTextures() {
		if(this.addTextureCount>0){
			this.addTextureCount--;
			this.menu1.enabled=false;
			this.imgCount++;
			this.menu1.m_txt_currCount.text = this.imgCount.toString()+" - loading";
			RES.getResAsync(`testb${this.imgCount}_png`, this.getResHandler, this);
		}
	}
	getResHandler(tex: egret.Texture, url: String) {
		this.menu1.enabled=true;
		if (!tex) {
			this.menu1.m_txt_currCount.text = this.imgCount.toString()+" - loading failed";
			console.log("getResHandler is failed", url);
			return;
		}
		this.menu1.m_txt_currCount.text = this.imgCount.toString()+" - loaded";
		var bitmap: egret.Bitmap = new egret.Bitmap(tex);
		var wHalf: number = bitmap.anchorOffsetX = tex.textureWidth / 2;
		var hHalf: number = bitmap.anchorOffsetY = tex.textureHeight / 2;
		bitmap.x = TestProfile.egretRoot.stage.stageWidth * Math.random();
		bitmap.y = TestProfile.egretRoot.stage.stageHeight * Math.random();
		this.list.push(bitmap);
		TestProfile.egretRoot.addChild(bitmap);
		//
		this.addTextures();
	}
	private _play_tween0: boolean = false;
	public get play_tween0(): boolean {
		return this._play_tween0;
	}
	public set play_tween0(val: boolean) {
		this._play_tween0 = val;
	}
	tick(time:number): void {
		if(this.play_tween0){
			for (let i = 0; i < this.list.length; i++) {
				let item: egret.Bitmap = this.list[i];
				item.rotation++;
			}
		}
		window.requestAnimationFrame(this.tick.bind(this));
	}
}
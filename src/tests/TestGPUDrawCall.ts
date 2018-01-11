class TestGPUDrawCall {
	public ui:fairygui.GComponent;
	menu1: fuis.Package1.UI_Menu1;
	public box: fairygui.GComponent;
	list:egret.Bitmap[] = new Array();
	public constructor() {
		this.menu1 = fuis.Package1.UI_Menu1.createInstance();
		//---list0
		this.menu1.m_list0.setVirtual();
		this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
		//
		this.menu1.m_list0.data = ["+1","+10","+100"];
		this.menu1.m_list0.numItems = (<Array<string>>this.menu1.m_list0.data).length;
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
	list0_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list0.data[i];
	}
	list0_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		this.reset(this.list.length + parseInt(this.menu1.m_list0.data[i]));
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
				this._play_tween0 = !this._play_tween0;
				break;
		}
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
	private _play_tween0: boolean = false;
	public get play_tween0(): boolean {
		return this._play_tween0;
	}
	public set play_tween0(val: boolean) {
		this._play_tween0 = val;
	}
	reset(count: number): void {
		if (count < 0) {
			count = 0;
		}
		this.menu1.m_txt_currCount.text = count.toString();
		for (var i = this.list.length; i < count; i++) {
			// var txtr:egret.Texture = RES.getRes( "testa"+(i+1) );
			var tex:egret.Texture = RES.getRes( "testa"+(i%2==1?1:2)+"_png" );
            /*** 本示例关键代码段结束 ***/
            var bitmap:egret.Bitmap = new egret.Bitmap( tex );
            var wHalf:number = bitmap.anchorOffsetX = tex.textureWidth / 2;
            var hHalf:number = bitmap.anchorOffsetY = tex.textureHeight / 2;
			bitmap.x = TestProfile.egretRoot.stage.stageWidth * Math.random() ;
			bitmap.y = TestProfile.egretRoot.stage.stageHeight * Math.random() ;
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
	}
}
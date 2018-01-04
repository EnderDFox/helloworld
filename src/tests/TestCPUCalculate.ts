class TestCPUCalculate {
	public ui: fairygui.GComponent;
	menu1: fuis.Package1.UI_Menu1;
	public constructor() {
		this.ui = new fairygui.GComponent();
		//
		this.menu1 = fuis.Package1.UI_Menu1.createInstance();
		//---list
		this.menu1.m_list0.setVirtual();
		this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
		//
		this.menu1.m_list0.data = ["-100w", "-1w", "+1w", "+100w"];
		this.menu1.m_list0.numItems = (<Array<string>>this.menu1.m_list0.data).length;
		this.menu1.m_list0.refreshVirtualList();
		//---list1
		this.menu1.m_list1.setVirtual();
		this.menu1.m_list1.itemRenderer = this.list1_itemRender.bind(this);
		SDKAdapterFG.GObject_addEventListener(this.menu1.m_list1, fairygui.ItemEvent.CLICK, this.list1_itemClick, this);
		//
		this.menu1.m_list1.data = ["tweenUI"];
		this.menu1.m_list1.numItems = (<Array<string>>this.menu1.m_list1.data).length;
		this.menu1.m_list1.refreshVirtualList();
		// this.menu1.m_list1.visible=false;//TODO: recursion cannot use, because "Uncaught RangeError: Maximum call stack size exceeded"
		//---
		this.refreshTxt();
		//
		this.ui.addChild(this.menu1);
		TestMain.alignRightBottom(this.menu1);
		//
		// console.log(this.calculate_loop(358, 792), this.calculate_recursion(358, 792));
		//
		this.calculate();
	}
	list0_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list0.data[i];
	}
	list0_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		var i: number = item.data;
		var valStr:string = this.menu1.m_list0.data[i];
		valStr = valStr.replace("w","0000");
		this.times += parseInt(valStr);
		this.refreshTxt();
	}
	list1_itemRender(i: number, item: fuis.Package1.UI_Button1): void {
		item.data = i;
		item.title = this.menu1.m_list1.data[i];
	}
	list1_itemClick(evt: fairygui.ItemEvent): void {
		var item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		switch(item.data){
			case 0:
				this.tweenUI = !this.tweenUI;
				break;
		}
		this.refreshTxt();
	}
	refreshTxt(){
		this.menu1.m_txt_currCount.text = (this.kind==0?"loop: ":"recursion: ")+this.times.toFixed();
	}
	//===
	frameCount:number = 0;
	times: number = 0;
	kind: number = 0;
	tweenUI:boolean = false;
	calculate() {
		switch (this.kind) {
			case 0:
				this.frameCount++;
				var r:number = this.calculate_loop(3459, this.frameCount);
				this.frameCount = r;
				if(this.tweenUI){
					this.menu1.m_txt_currCount.y = 1+r%50;
				}
				// console.log(r);
				break;
			case 1:
				this.calculate_recursion(3459, 7685);
				break;
		}
		window.requestAnimationFrame(this.calculate.bind(this));
	}
	calculate_loop(a: number, b: number) {
		var c: number;
		for (let i = 0; i < this.times; i++) {
			if (a < 0) a *= -1;
			if (b < 0) b *= -1;
			while (a > 999999999) {
				a -= 999999999;
			}
			while (b > 999999999) {
				b -= 999999999;
			}
			c = a;
			// a = a + b*2 - (b / a);
			a = this.formula_a(a,b);
			// b = Math.sqrt(c * c + b * b);
			b = this.formula_b(c,b);
			a = a+b;
		}
		return a;
	}
	formula_a(a: number, b: number):number{
		return a + b*2 - (b / a);
	}
	formula_b(a: number, b: number):number{
		return Math.sqrt(a * a + b * b);
	}
	calculate_recursion(a: number, b: number, count: number = 0): number {
		if (count < this.times) {
			if (a < 0) a *= -1;
			if (b < 0) b *= -1;
			while (a > 999999999) {
				a -= 999999999;
			}
			while (b > 999999999) {
				b -= 999999999;
			}
			return this.calculate_recursion(a + b*2 - (b / a), Math.sqrt(a * a + b * b), count + 1);
		}
		return a + b;
	}
	/*formula_a(a:number,b:number):number{
		return a*b-(b/a);
	}
	formula_b(a:number,b:number):number{
		return Math.sqrt(a*a+b*b);
	}*/
}
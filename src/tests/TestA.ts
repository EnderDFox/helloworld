class TestA {
	public constructor() {

	}
	public root: fairygui.GComponent;
	public init(): void {
		fuis.Package1.Package1Binder.bindAll();
	}
	public w:number;
	public h:number;
	comps: Comp1[] = new Array();
	menu1: fuis.Package1.UI_Menu1;
	box:fairygui.GComponent;
	public start(): void {
        //
		this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_sub,this,this.onMenu1_sub);
        SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_sub,this,this.onMenu1_sub);
		SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_add,this,this.onMenu1_add);
		SDKAdapterFG.GObject_OnClick(this.menu1.m_btn_t0,this,this.onMenu1_t0);
		// this.menu1.m_btn_sub.addClickListener(this.onMenu1_sub, this);
		// this.menu1.m_btn_add.addClickListener(this.onMenu1_add, this);
		// this.menu1.m_btn_t0.addClickListener(this.onMenu1_t0, this);
		this.menu1.x = this.w-this.menu1.width;
		this.menu1.y = this.h-this.menu1.height;
        //
		this.box = new fairygui.GComponent();
		this.root.addChild(this.box);
		this.root.addChild(this.menu1);
		this.reset(10);

        // setTimeout(()=>{this.tick();},100);
        // window.requestAnimationFrame((time:number)=>{this.tick(time);});
	}
    tick(time:number=0):void{
        console.log("tick",this.comps.length);
        for (let i = 0; i < this.comps.length; i++) {
            let item:Comp1 = this.comps[i];
            item.tick();
        }
    }
    private _play_to:boolean = false;
    public get play_t0():boolean{
        return this._play_to;
    }
    public set play_t0(val:boolean){
        this._play_to = val;
        for (let i = 0; i < this.comps.length; i++) {
            let item:Comp1 = this.comps[i];
            item.play_t0 = val;
        }
    }
	reset(count: number): void {
		if(count<0){
			count = 0;
		}
		this.menu1.m_txt_currCount.text = count.toString();
		for (var i = this.comps.length; i < count; i++) {
            var item: Comp1 = new Comp1();
            item.init();
			this.box.addChild(item.ui);
			this.comps.push(item);
		}
		for(var i=this.comps.length-1;i>=count;i--){
			this.comps[i].dispose();
			this.comps.pop();
		}
	}
	onMenu1_sub(...args): void {
        console.log(args);
		this.reset(this.comps.length - 10);
	}
	onMenu1_add(...args): void {
		this.reset(this.comps.length + 10);
	}
    onMenu1_t0(...args):void{
        this.play_t0 = !this.play_t0;
    }
}
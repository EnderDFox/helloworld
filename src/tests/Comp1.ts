class Comp1 {
	public ui: fuis.Package1.UI_Comp1;
	v1x: number = 0;
	v1y: number = 0;
	public init() {
		this.ui = fuis.Package1.UI_Comp1.createInstance();
		this.ui.setXY((Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500);
		this.v1x = this.ui.m_anim1.x;
		this.v1y = this.ui.m_anim1.y;
	}
	public tick() {
		this.v1x += 1
		this.v1y += Math.random();
		this.ui.m_txt1.setXY(this.v1x, this.v1y);
	}
	public dispose(): void {
		this.ui.dispose();
		this.ui = null;
	}
	public get play_t0(): boolean {
		return this.ui.m_t0.playing;
	}
	public set play_t0(val: boolean) {
		if (val) {
            SDKAdapterFG.Transition_Play(this.ui.m_t0,null,null,null,-1);
		} else {
			this.ui.m_t0.stop();
		}
	}
}
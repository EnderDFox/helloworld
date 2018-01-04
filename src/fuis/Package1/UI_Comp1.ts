/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_Comp1 extends fairygui.GComponent {

		public m_txt1:fairygui.GTextField;
		public m_anim1:fairygui.GMovieClip;
		public m_anim2:fairygui.GMovieClip;
		public m_txt2:fairygui.GTextField;
		public m_t0:fairygui.Transition;

		public static URL:string = "ui://ra63vp0ukx9f1";

		public static createInstance():UI_Comp1 {
			return <UI_Comp1><any>(fairygui.UIPackage.createObject("Package1","Comp1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_txt1 = <fairygui.GTextField><any>(this.getChildAt(0));
			this.m_anim1 = <fairygui.GMovieClip><any>(this.getChildAt(1));
			this.m_anim2 = <fairygui.GMovieClip><any>(this.getChildAt(2));
			this.m_txt2 = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_t0 = this.getTransitionAt(0);
		}
	}
}
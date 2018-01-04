/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_Menu1 extends fairygui.GComponent {

		public m_btn_sub:UI_Button1;
		public m_btn_add:UI_Button1;
		public m_txt_currCount:fairygui.GTextField;
		public m_btn_t0:UI_Button1;

		public static URL:string = "ui://ra63vp0u9acyi";

		public static createInstance():UI_Menu1 {
			return <UI_Menu1><any>(fairygui.UIPackage.createObject("Package1","Menu1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btn_sub = <UI_Button1><any>(this.getChildAt(0));
			this.m_btn_add = <UI_Button1><any>(this.getChildAt(1));
			this.m_txt_currCount = <fairygui.GTextField><any>(this.getChildAt(2));
			this.m_btn_t0 = <UI_Button1><any>(this.getChildAt(3));
		}
	}
}
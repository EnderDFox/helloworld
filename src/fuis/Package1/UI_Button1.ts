/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_Button1 extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_n1:fairygui.GGraph;
		public m_n2:fairygui.GGraph;
		public m_n3:fairygui.GGraph;
		public m_title:fairygui.GTextField;

		public static URL:string = "ui://ra63vp0u9acyj";

		public static createInstance():UI_Button1 {
			return <UI_Button1><any>(fairygui.UIPackage.createObject("Package1","Button1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n2 = <fairygui.GGraph><any>(this.getChildAt(1));
			this.m_n3 = <fairygui.GGraph><any>(this.getChildAt(2));
			this.m_title = <fairygui.GTextField><any>(this.getChildAt(3));
		}
	}
}
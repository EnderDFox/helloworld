/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_Menu1 extends fairygui.GComponent {

		public m_txt_currCount:fairygui.GTextField;
		public m_list0:fairygui.GList;
		public m_list1:fairygui.GList;

		public static URL:string = "ui://ra63vp0u9acyi";

		public static createInstance():UI_Menu1 {
			return <UI_Menu1><any>(fairygui.UIPackage.createObject("Package1","Menu1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_txt_currCount = <fairygui.GTextField><any>(this.getChildAt(0));
			this.m_list0 = <fairygui.GList><any>(this.getChildAt(1));
			this.m_list1 = <fairygui.GList><any>(this.getChildAt(2));
		}
	}
}
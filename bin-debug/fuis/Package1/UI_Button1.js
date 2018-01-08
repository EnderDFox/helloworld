/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fuis;
(function (fuis) {
    var Package1;
    (function (Package1) {
        var UI_Button1 = (function (_super) {
            __extends(UI_Button1, _super);
            function UI_Button1() {
                return _super.call(this) || this;
            }
            UI_Button1.createInstance = function () {
                return (fairygui.UIPackage.createObject("Package1", "Button1"));
            };
            UI_Button1.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_button = this.getControllerAt(0);
                this.m_n1 = (this.getChildAt(0));
                this.m_n2 = (this.getChildAt(1));
                this.m_n3 = (this.getChildAt(2));
                this.m_title = (this.getChildAt(3));
            };
            UI_Button1.URL = "ui://ra63vp0u9acyj";
            return UI_Button1;
        }(fairygui.GButton));
        Package1.UI_Button1 = UI_Button1;
        __reflect(UI_Button1.prototype, "fuis.Package1.UI_Button1");
    })(Package1 = fuis.Package1 || (fuis.Package1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Button1.js.map
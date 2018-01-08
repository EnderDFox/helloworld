var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TestCPUCalculate = (function () {
    function TestCPUCalculate() {
        //===
        this.frameCount = 0;
        this.times = 0;
        this.kind = 0;
        this.tweenUI = false;
        this.ui = new fairygui.GComponent();
        //
        this.menu1 = fuis.Package1.UI_Menu1.createInstance();
        //---list
        this.menu1.m_list0.setVirtual();
        this.menu1.m_list0.itemRenderer = this.list0_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list0, fairygui.ItemEvent.CLICK, this.list0_itemClick, this);
        //
        this.menu1.m_list0.data = ["-100w", "-1w", "+1w", "+100w"];
        this.menu1.m_list0.numItems = this.menu1.m_list0.data.length;
        this.menu1.m_list0.refreshVirtualList();
        //---list1
        this.menu1.m_list1.setVirtual();
        this.menu1.m_list1.itemRenderer = this.list1_itemRender.bind(this);
        SDKAdapterFG.GObject_addEventListener(this.menu1.m_list1, fairygui.ItemEvent.CLICK, this.list1_itemClick, this);
        //
        this.menu1.m_list1.data = ["test1"];
        this.menu1.m_list1.numItems = this.menu1.m_list1.data.length;
        this.menu1.m_list1.refreshVirtualList();
        // this.menu1.m_list1.visible=false;//TODO: recursion cannot use, because "Uncaught RangeError: Maximum call stack size exceeded"
        //---
        this.refreshTxt();
        //
        this.ui.addChild(this.menu1);
        TestMain.alignRightBottom(this.menu1);
        //
        this.calculate();
    }
    TestCPUCalculate.prototype.list0_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list0.data[i];
    };
    TestCPUCalculate.prototype.list0_itemClick = function (evt) {
        var item = evt.itemObject;
        var i = item.data;
        var valStr = this.menu1.m_list0.data[i];
        valStr = valStr.replace("w", "0000");
        this.times += parseInt(valStr);
        this.refreshTxt();
    };
    TestCPUCalculate.prototype.list1_itemRender = function (i, item) {
        item.data = i;
        item.title = this.menu1.m_list1.data[i];
    };
    TestCPUCalculate.prototype.list1_itemClick = function (evt) {
        var item = evt.itemObject;
        switch (item.data) {
            case 0:
                // this.tweenUI = !this.tweenUI;
                var startTime = Math.round(new Date().getTime());
                console.log("calculate_loop start", startTime);
                this.times = 1000000;
                var rs = this.calculate_loop(358, 792);
                console.log("calculate_loop result:", rs);
                var endTime = Math.round(new Date().getTime());
                console.log("calculate_loop end", endTime, endTime - startTime);
                this.menu1.m_txt_currCount.text = endTime - startTime + "," + rs;
                break;
        }
        // this.refreshTxt();
    };
    TestCPUCalculate.prototype.refreshTxt = function () {
        this.menu1.m_txt_currCount.text = (this.kind == 0 ? "loop: " : "recursion: ") + this.times.toFixed();
    };
    TestCPUCalculate.prototype.calculate = function () {
        switch (this.kind) {
            case 0:
                this.frameCount++;
                var r = this.calculate_loop(3459, this.frameCount);
                this.frameCount = r;
                if (this.tweenUI) {
                    this.menu1.m_txt_currCount.y = 1 + r % 50;
                }
                // console.log(r);
                break;
            case 1:
                this.calculate_recursion(3459, 7685);
                break;
        }
        window.requestAnimationFrame(this.calculate.bind(this));
    };
    TestCPUCalculate.prototype.calculate_loop = function (a, b) {
        var c;
        for (var i = 0; i < this.times; i++) {
            if (a < 0)
                a *= -1;
            if (b < 0)
                b *= -1;
            while (a > 999999999) {
                a -= 999999999;
            }
            while (b > 999999999) {
                b -= 999999999;
            }
            c = a;
            // a = a + b*2 - (b / a);
            a = this.formula_a(a, b);
            // b = Math.sqrt(c * c + b * b);
            b = this.formula_b(c, b);
            a = a + b;
        }
        return a;
    };
    TestCPUCalculate.prototype.formula_a = function (a, b) {
        return a + b * 2 - (b / a);
    };
    TestCPUCalculate.prototype.formula_b = function (a, b) {
        return Math.sqrt(a * a + b * b);
    };
    TestCPUCalculate.prototype.calculate_recursion = function (a, b, count) {
        if (count === void 0) { count = 0; }
        if (count < this.times) {
            if (a < 0)
                a *= -1;
            if (b < 0)
                b *= -1;
            while (a > 999999999) {
                a -= 999999999;
            }
            while (b > 999999999) {
                b -= 999999999;
            }
            return this.calculate_recursion(a + b * 2 - (b / a), Math.sqrt(a * a + b * b), count + 1);
        }
        return a + b;
    };
    return TestCPUCalculate;
}());
__reflect(TestCPUCalculate.prototype, "TestCPUCalculate");
//# sourceMappingURL=TestCPUCalculate.js.map
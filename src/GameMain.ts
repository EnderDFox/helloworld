import Handler = laya.utils.Handler;
import Loader = laya.net.Loader;

// 程序入口
class GameMain {
    constructor()
    {
        Laya.init(1136, 640, Laya.WebGL);
        laya.utils.Stat.show(0, 0);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "left";
        Laya.stage.alignV = "top";
        //设置横竖屏
        Laya.stage.screenMode = "horizontal";
        
        Laya.loader.load([
        { url: "res/fuis/Package1@atlas0.png", type: Loader.IMAGE },
        { url: "res/fuis/Package1@atlas_kx9f0.png", type: Loader.IMAGE },
        { url: "res/fuis/Package1@atlas_kx9f2.png", type: Loader.IMAGE },
        { url: "res/fuis/Package1.fui", type: Loader.BUFFER },
        ], Handler.create(this, this.onLoaded));
    }

    onLoaded(): void {
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        var root: fairygui.GComponent = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(root);

        fairygui.UIPackage.addPackage("res/fuis/Package1");

         var testA: TestA = new TestA();
        testA.w = fairygui.GRoot.inst.width;
        testA.h = fairygui.GRoot.inst.height;
        testA.root = root;
        testA.init();
        testA.start();
    }
}
new GameMain();

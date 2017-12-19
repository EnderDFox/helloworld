class TestBundle {
    constructor(){
    }
    public exec(){
        console.log("[info]","This is TestBundle.exec()");
        new Sub1();
        new Sub2();
        new Sub3();
    }
}
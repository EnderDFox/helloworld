class Sub1 extends Sub2{
    constructor(){
        super();
        console.log("[debug]","This is Sub1");
        new Sub3();
    }
}
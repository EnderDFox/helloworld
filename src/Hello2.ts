class Hello2{
    func1(){
        console.log("[info]","This is hello 2");
    }
}
Hello2.prototype.func1 = function(){
    console.log("[info]","This is hello 2.func1 change");
}
new Hello2().func1()
import { setInterval } from "timers";

class PerformanceTest{
    subs:QuadTreeRectTest[] = [];
    /** 结论 从数组拿 和 从本地变量里拿 属性 数度一样, 普通的加减乘除运算性能消耗不大, 但如果算出了浮点 就很耗了 */
    test1(){
        this.subs.push(new QuadTreeRectTest(12,4234,121,5466));
        this.subs.push(new QuadTreeRectTest(32,1332,142,14462));
        this.subs.push(new QuadTreeRectTest(52,42141434,121,5757576));
        this.subs.push(new QuadTreeRectTest(22,1414,241,5757));
        let len:number = 1000*1000*1000;
        let r = (this.subs[1].right+this.subs[1].x)/2;
        // let r = this.subs[1].right;
        // let b = (this.subs[1].bottom+this.subs[1].y)/2;
        let b = this.subs[1].bottom;
        let st = new Date().getTime();
        for (let i = 0; i <len; i++) {
            // let bl = this.subs[1].right < this.subs[1].bottom;
            let bl = (this.subs[1].right+this.subs[1].x)/2 < (this.subs[1].bottom+this.subs[1].y)/2;
            // let bl = r < b;
        }
        console.log("[info]",new Date().getTime()-st);
    }
}
class QuadTreeRectTest {
    x: number;
    y: number;
    right: number;
    bottom: number;
    constructor(x, right, y, bottom) {
        this.x = x;
        this.y = y;
        this.right = right;
        this.bottom = bottom;
    }
}
setInterval(() => {
    new PerformanceTest().test1();
}, 1000);
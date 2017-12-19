namespace t2 {
    export class C1 {
        constructor() {
            console.log("C1.constructor");
        }
        public f1(): void {
            new C2().f1();
            console.log("[debug]", "c1.f1");
        }
    }
}
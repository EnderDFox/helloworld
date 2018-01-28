class BinaryHeapUtil {
    static pushMin(arr: any[], node: any, keyName: string) {
        arr.push(node);
        let i = arr.length - 1;
        while (i > 0) {
            let parentIndex = Math.ceil(i / 2) - 1;
            if (node[keyName] < arr[parentIndex][keyName]) {
                arr[i] = arr[parentIndex];
                arr[parentIndex] = node;
                i = parentIndex;
            } else {
                break;
            }
        }
    }
    static pushMax(arr: any[], node: any, keyName: string) {
        arr.push(node);
        let i = arr.length - 1;
        while (i > 0) {
            let parentIndex = Math.ceil(i / 2) - 1;
            if (node[keyName] > arr[parentIndex][keyName]) {
                arr[i] = arr[parentIndex];
                arr[parentIndex] = node;
                i = parentIndex;
            } else {
                break;
            }
        }
    }
    static popMin(arr: any[], keyName: string): any {
        let head = arr[0];
        let node = arr[0] = arr[arr.length - 1];
        arr.pop();
        //
        let i = 0;
        while (true) {
            let leftIndex = i * 2 + 1;
            let rightIndex = leftIndex + 1;
            let left: any = arr[leftIndex];
            let right: any = arr[rightIndex];
            if (left == undefined && right == undefined) {
                break;
            } else {
                let tempIndex: number;
                let temp: any;
                if (left == undefined) {
                    tempIndex = rightIndex;
                    temp = right;
                } else if (right == undefined) {
                    tempIndex = leftIndex;
                    temp = left;
                } else {
                    if (left[keyName] < right[keyName]) {
                        tempIndex = leftIndex;
                        temp = left;
                    } else {
                        tempIndex = rightIndex;
                        temp = right;
                    }
                }
                if (node[keyName] > temp[keyName]) {
                    arr[i] = arr[tempIndex];
                    arr[tempIndex] = node;
                    i = tempIndex;
                } else {
                    break;
                }
            }
        }
        return head;
    }
    static popMax(arr: any[], keyName: string): any {
        let head = arr[0];
        let node = arr[0] = arr[arr.length - 1];
        arr.pop();
        //
        let i = 0;
        while (true) {
            let leftIndex = i * 2 + 1;
            let rightIndex = leftIndex + 1;
            let left: any = arr[leftIndex];
            let right: any = arr[rightIndex];
            if (left == undefined && right == undefined) {
                break;
            } else {
                let tempIndex: number;
                let temp: any;
                if (left == undefined) {
                    tempIndex = rightIndex;
                    temp = right;
                } else if (right == undefined) {
                    tempIndex = leftIndex;
                    temp = left;
                } else {
                    if (left[keyName] > right[keyName]) {
                        tempIndex = leftIndex;
                        temp = left;
                    } else {
                        tempIndex = rightIndex;
                        temp = right;
                    }
                }
                if (node[keyName] < temp[keyName]) {
                    arr[i] = arr[tempIndex];
                    arr[tempIndex] = node;
                    i = tempIndex;
                } else {
                    break;
                }
            }
        }
        return head;
    }
}
class TestBinaryHeap {
    test0() {
        let arr1: number[] = [2, 5, 7];
        arr1["a"] = 9;
        console.log("[info]", arr1);
        delete arr1[2];
        delete arr1["0"];
        console.log("[len]", arr1.length);
        console.log("[info]", arr1);
    }
    test1() {
        let arr1: { val: number }[] = [];
        let arr2: { val: number }[] = [];
        let len = this.randomInt(10, 20);
        while (len--) {
            BinaryHeapUtil.pushMin(arr1, { val: this.randomInt(0, 99) }, "val");
            BinaryHeapUtil.pushMax(arr2, { val: this.randomInt(0, 99) }, "val");
        }
        // console.log("[debug]", arr1);
        // console.log("[debug]", arr2);
        console.log("------------------");
        // len = this.randomInt(1,Math.ceil(arr1.length/2));
        len = 5;
        while (len--) {
            console.log("[debug]", len, "pop:", BinaryHeapUtil.popMin(arr1, "val"));
        }
        console.log("[debug]", arr1);
        console.log("------------------");
        len = 5;
        while (len--) {
            console.log("[debug]", len, "pop:", BinaryHeapUtil.popMax(arr2, "val"));
        }
        console.log("[debug]", arr2);
    }
    randomInt(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}
new TestBinaryHeap().test1();
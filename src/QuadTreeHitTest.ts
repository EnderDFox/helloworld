class QuadTree {
    objects: Rect[];
    nodes: QuadTree[];
    level: number;
    bounds: Rect;
    //
    static cacheArr: Rect[] = [];
    //
    constructor(bounds: Rect, level: number = 0) {
        this.objects = [];
        this.nodes = [];
        this.level = level;
        this.bounds = bounds;
    }
    static concatArr(targetArr, ...args) {
        var arr, i;
        for (i = 0; i < args.length; i++) {
            arr = args[i];
            Array.prototype.push.apply(targetArr, arr);
        }
    }
    static spliceArr(arr, index, num) {
        var i, len;
        for (i = index + num, len = arr.length; i < len; i++) {
            arr[i - num] = arr[i];
        }
        arr.length = len - num;
    }
    static MAX_OBJECTS = 10;
    static MAX_LEVELS = 5;
    clear() {
        var nodes: QuadTree[] = this.nodes;
        var subnode: QuadTree;
        this.objects.splice(0, this.objects.length);
        while (nodes.length) {
            subnode = nodes.shift();
            subnode.clear();
        }
    }
    split() {
        var level = this.level;
        var bounds = this.bounds;
        var x = bounds.x;
        var y = bounds.y;
        var sWidth = bounds.sWidth;
        var sHeight = bounds.sHeight;

        this.nodes.push(
            new QuadTree(new Rect(bounds.cX, y, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(x, y, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(x, bounds.cY, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(bounds.cX, bounds.cY, sWidth, sHeight), level + 1)
        );
    }
    getIndex(rect: Rect, checkIsInner: boolean = false) {
        var bounds = this.bounds,
            onTop = rect.y + rect.h <= bounds.cY,
            onBottom = rect.y >= bounds.cY,
            onLeft = rect.x + rect.w <= bounds.cX,
            onRight = rect.x >= bounds.cX;

        // 检测矩形是否溢出象限界限
        if (checkIsInner &&
            (Math.abs(rect.cX - bounds.cX) + rect.sWidth > bounds.sWidth ||
                Math.abs(rect.cY - bounds.cY) + rect.sHeight > bounds.sHeight)) {

            return -1;
        }

        if (onTop) {
            if (onRight) {
                return 0;
            } else if (onLeft) {
                return 1;
            }
        } else if (onBottom) {
            if (onLeft) {
                return 2;
            } else if (onRight) {
                return 3;
            }
        }

        return -1;
    }
    insert(rect) {
        var objs = this.objects,
            i, index;

        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.nodes[index].insert(rect);
                return;
            }
        }
        objs.push(rect);

        if (!this.nodes.length &&
            this.objects.length > QuadTree.MAX_OBJECTS &&
            this.level < QuadTree.MAX_LEVELS) {

            this.split();

            for (i = objs.length - 1; i >= 0; i--) {
                index = this.getIndex(objs[i]);
                if (index !== -1) {
                    this.nodes[index].insert(objs.splice(i, 1)[0]);
                }
            }
        }
    }
    refresh(root?:QuadTree) {
        var objs:Rect[] = this.objects,
            rect:Rect, index:number, i:number, len:number;

        root = root || this;

        for (i = objs.length - 1; i >= 0; i--) {
            index = this.getIndex(objs[i], true);

            // 如果矩形不属于该象限，则将该矩形重新插入
            if (index === -1) {
                if (this !== root) {
                    rect = objs[i];
                    QuadTree.spliceArr(objs, i, 1);
                    root.insert(rect);
                    // root.insert(objs.splice(i, 1)[0]);

                }

                // 如果矩形属于该象限 且 该象限具有子象限，则
                // 将该矩形安插到子象限中
            } else if (this.nodes.length) {
                rect = objs[i];
                QuadTree.spliceArr(objs, i, 1);
                this.nodes[index].insert(rect);
                // this.nodes[index].insert(objs.splice(i, 1)[0]);
            }
        }

        // 递归刷新子象限
        for (i = 0, len = this.nodes.length; i < len; i++) {
            this.nodes[i].refresh(root);
        }
    }
    retrieve(rect: Rect) {
        var result = QuadTree.cacheArr;
        var arr: Rect[], i: number, index: number;

        if (this.level === 0) result.length = 0;

        QuadTree.concatArr(result, this.objects);

        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.nodes[index].retrieve(rect);
            } else {
                arr = rect.carve(this.bounds.cX, this.bounds.cY);
                for (i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i]);
                    this.nodes[index].retrieve(rect);

                }
            }
        }

        return result;
    }
}
class Rect {
    speedArr: number[];
    nextSpeedArr: number[];
    x: number;
    y: number;
    h: number;
    w: number;
    cX: number;
    cY: number;
    sWidth: number;
    sHeight: number;
    static tempRectArr = [new Rect(0, 0, 0, 0),
    new Rect(0, 0, 0, 0)];
    constructor(x, y, width, height, speedArr?: number[]) {
        if (!(this instanceof Rect)) return;
        this.speedArr = speedArr || [20, 20];
        this.nextSpeedArr = this.speedArr.slice();
        this.resize(width, height);
        this.moveTo(x, y);
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.cX = x + this.sWidth;
        this.cY = y + this.sHeight;
    }

    resize(width: number, height: number) {
        this.w = width;
        this.h = height;
        this.sWidth = width / 2;
        this.sHeight = height / 2;
    }

    draw(cxt) {
        cxt.save();
        cxt.beginPath();
        cxt.rect(this.x, this.y, this.w, this.h);
        cxt.closePath();
        cxt.restore();
    }

    run(time?) {
        time = time || 16;
        this.speedArr[0] = this.nextSpeedArr[0];
        this.speedArr[1] = this.nextSpeedArr[1];

        this.moveTo(
            this.x + this.speedArr[0] * time / 1000,
            this.y + this.speedArr[1] * time / 1000
        );
    }

    copy(rect: Rect) {
        this.resize(rect.w, rect.h);
        this.moveTo(rect.x, rect.y);
        this.nextSpeedArr[0] = rect.speedArr[0];
        this.nextSpeedArr[1] = rect.speedArr[1];
    }

    init(x, y, w, h, speedArr) {
        this.resize(w, h);
        this.moveTo(x, y);
    }

    // 改变碰撞后运动方向
    collide(rect: Rect, isInner: boolean = false) {
        if (!(rect instanceof Rect)) return;

        var tRect1 = Rect.tempRectArr[0],
            tRect2 = Rect.tempRectArr[1],
            thisRect:Rect, sWidthSum:number, sHeightSum:number, dWidth:number, dHeight:number,
            onHorizontal:boolean, onVertical:boolean, focusPoint:number;

        if (!isInner) {

            tRect1.copy(this);
            tRect2.copy(rect);

            // 判断碰撞方向
            sWidthSum = tRect1.sWidth + tRect2.sWidth;
            sHeightSum = tRect1.sHeight + tRect2.sHeight;
            dWidth = sWidthSum - Math.abs(tRect1.cX - tRect2.cX);
            dHeight = sHeightSum - Math.abs(tRect1.cY - tRect2.cY);

            while (dWidth > 0 && dHeight > 0) {
                tRect1.run(-16);
                tRect2.run(-16);
                dWidth = sWidthSum - Math.abs(tRect1.cX - tRect2.cX);
                dHeight = sHeightSum - Math.abs(tRect1.cY - tRect2.cY);
            }

            onHorizontal = dWidth <= 0;
            onVertical = dHeight <= 0;

            // 改变方向
            if (onHorizontal) {
                focusPoint = this.cX > rect.cX ? 1 : -1;
                this.nextSpeedArr[0] = focusPoint *
                    (Math.abs(this.nextSpeedArr[0]) + Math.abs(rect.speedArr[0])) / 2;
            }

            if (onVertical) {
                focusPoint = tRect1.cY > tRect2.cY ? 1 : -1;
                this.nextSpeedArr[1] = focusPoint *
                    (Math.abs(this.nextSpeedArr[1]) + Math.abs(rect.speedArr[1])) / 2;
            }

        } else {
            if (Math.abs(this.cX - rect.cX) + this.sWidth > rect.sWidth) {
                this.nextSpeedArr[0] = -(this.nextSpeedArr[0] || this.speedArr[0]);
                this.moveTo(this.cX > rect.cX ?
                    rect.x + rect.w - this.w : rect.x, this.y);
            }
            if (Math.abs(this.cY - rect.cY) + this.sHeight > rect.sHeight) {
                this.nextSpeedArr[1] = -(this.nextSpeedArr[1] || this.speedArr[1]);
                this.moveTo(this.x, this.cY > rect.cY ?
                    rect.y + rect.h - this.h : rect.y);
            }
        }
    }

    carve(cX: number, cY: number) {
        var result = [],
            temp = [],
            dX = cX - this.x,
            dY = cY - this.y,
            carveX = dX > 0 && dX < this.w,
            carveY = dY > 0 && dY < this.h;

        // 切割XY方向
        if (carveX && carveY) {
            temp = this.carve(cX, this.y);
            while (temp.length) {
                result = result.concat(temp.shift().carve(this.x, cY));
            }

            // 只切割X方向
        } else if (carveX) {
            result.push(
                new Rect(this.x, this.y, dX, this.h),
                new Rect(cX, this.y, this.w - dX, this.h)
            );

            // 只切割Y方向
        } else if (carveY) {
            result.push(
                new Rect(this.x, this.y, this.w, dY),
                new Rect(this.x, cY, this.w, this.h - dY)
            );
        }

        return result;
    }

    // 检查两个矩形是否互相接近
    static isApproach(rect1: Rect, rect2: Rect) {
     /*    if (1 > 0) {
            return true;
        } */
        // var tempRect1 = rect1.copy(),
        //     tempRect2 = rect2.copy();

        // tempRect1.run();
        // tempRect2.run();

        // return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(tempRect1.cX - tempRect2.cX, 2) +
        //     Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(tempRect1.cY - tempRect2.cY, 2)).toFixed(6) > 0 ?
        //     true : false;

        var tRect1 = Rect.tempRectArr[0],
            tRect2 = Rect.tempRectArr[1];

        tRect1.copy(rect1);
        tRect2.copy(rect2);

        tRect1.run();
        tRect2.run();

        return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(tRect1.cX - tRect2.cX, 2) +
            Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(tRect1.cY - tRect2.cY, 2)).toFixed(6) > 0 ?
            true : false;


        // var dX, dY;

        // dX = rect1.cX + rect1.speedArr[0] * 0.016 - rect2.cX + rect2.speedArr[0] * 0.016;
        // dY = rect1.cY + rect1.speedArr[1] * 0.016 - rect2.cY + rect2.speedArr[1] * 0.016;

        // return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(dX, 2) +
        //     Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(dY, 2)).toFixed(6) > 0 ?
        //     true : false;
    }

    // 检查矩形是否发生碰撞
    static isCollide(rect1: Rect, rect2: Rect) {
        if (Math.abs(rect1.cX - rect2.cX) < rect1.sWidth + rect2.sWidth &&
            Math.abs(rect1.cY - rect2.cY) < rect1.sHeight + rect2.sHeight &&
            Rect.isApproach(rect1, rect2)) {

            rect1.collide(rect2);
            rect2.collide(rect1);
        }
    };
}

class TestQuadTreeShow {
    canvas: HTMLCanvasElement;
    cxt: CanvasRenderingContext2D;
    w = 1000;
    h = 500;
    rectArr: Rect[] = [];
    tree: QuadTree;
    time: number;
    collideCount: number;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('mycanvas');
        this.cxt = this.canvas.getContext('2d');
        // 设置canvas尺寸
        this.canvas.setAttribute('width', this.w.toString());
        this.canvas.setAttribute('height', this.h.toString());


        // 随机创建
        for (let i = 0; i < 100; i++) {
            this.rectArr.push(
                new Rect(Math.floor(Math.random() * (this.w - 20)),
                    Math.floor(Math.random() * (this.h - 20)),
                    Math.floor(Math.random() * 40 + 5),
                    Math.floor(Math.random() * 40 + 5),
                    // 10,10,
                    // 200,200,
                    [Math.floor(Math.random() * 60 + 20), Math.floor(Math.random() * 60 + 20)])
            );
        }

        // 初始化四叉树
        this.tree = new QuadTree(new Rect(0, 0, this.w, this.h));
        for (let i = 0, len = this.rectArr.length; i < len; i++) {
            this.tree.insert(this.rectArr[i]);
        }

        this.time = new Date().getTime();

        this.cxt.fillStyle = '#000';

        requestAnimationFrame(this.draw.bind(this));
    }
    draw() {
        var cTime = Date.now(),
            i, j, len, rect, tempRect;

        // 清屏
        this.cxt.clearRect(0, 0, this.w, this.h);

        // 更新四叉树
        this.tree.refresh();
        //
        this.collideCount = 0;
        // 碰撞检测
        for (i = 0, len = this.rectArr.length; i < len; i++) {
            tempRect = this.tree.retrieve(this.rectArr[i]);
            for (j = 0; j < tempRect.length; j++) {
                if (this.rectArr[i] != tempRect[j]) {
                    this.collideCount++;
                    Rect.isCollide(this.rectArr[i], tempRect[j]);
                }
            }
            // 防止溢出画布
            this.rectArr[i].collide(new Rect(0, 0, this.w, this.h), true);
        }
        console.info(this.collideCount, "`this.collideCount`");

        // 绘制
        for (i = 0, len = this.rectArr.length; i < len; i++) {
            this.rectArr[i].run(cTime - this.time);
            this.rectArr[i].draw(this.cxt);
            this.cxt.fill();
        }

        this.time = cTime;

        requestAnimationFrame(this.draw.bind(this));
    }
}
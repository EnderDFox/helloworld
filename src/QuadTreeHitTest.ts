/**
 * http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
 */
class QuadTree {
    static MAX_OBJECTS = 10;
    static MAX_LEVELS = 5;
    //
    /**自身范围 */
    bounds: IQuadTreeItem;
    parentQuadTree: QuadTree;
    level: number;
    nodes: QuadTree[];
    objects: IQuadTreeItem[];
    //---
    debug_push_count = 0;

    constructor(bounds: IQuadTreeItem, parentQuadTree: QuadTree = null) {
        this.objects = [];
        this.nodes = [];
        this.parentQuadTree = parentQuadTree;
        if (this.parentQuadTree == null) {
            this.level = 0;
        } else {
            this.level = this.parentQuadTree.level + 1;
        }
        this.bounds = bounds;
    }
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
        var wHalf = bounds.wHalf;
        var hHalf = bounds.hHalf;

        this.nodes.push(
            new QuadTree(new QuadTreeRect(bounds.xHalf, y, wHalf, hHalf), this),
            new QuadTree(new QuadTreeRect(x, y, wHalf, hHalf), this),
            new QuadTree(new QuadTreeRect(x, bounds.yHalf, wHalf, hHalf), this),
            new QuadTree(new QuadTreeRect(bounds.xHalf, bounds.yHalf, wHalf, hHalf), this)
        );
    }
    getIndex(rect: IQuadTreeItem) {
        var bounds = this.bounds,
            onTop = rect.y + rect.h <= bounds.yHalf,
            onBottom = rect.y >= bounds.yHalf,
            onLeft = rect.x + rect.w <= bounds.xHalf,
            onRight = rect.x >= bounds.xHalf;

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
        // 如果物体跨越多个象限，则放回-1
        return -1;
    }
    insert(rect: IQuadTreeItem) {
        var i: number, index: number;
        if (this.nodes.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.nodes[index].insert(rect);
                return;
            }
        }
        //
        this.objects.push(rect);
        rect.parentQuadTree = this;
        this.debug_push_count++;
        //
        if (this.objects.length > QuadTree.MAX_OBJECTS && this.level < QuadTree.MAX_LEVELS) {
            if(!this.nodes.length){
                this.split();//拆分
            }
            for (i = this.objects.length - 1; i >= 0; i--) {
                index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    rect = this.objects.splice(i, 1)[0];
                    this.nodes[index].objects.push(rect);
                    rect.parentQuadTree = this.nodes[index];
                    this.debug_push_count++;
                    // this.nodes[index].insert(rect);//There is no need to write like this, because there is already a index value, and subNode can't split at this time
                }
            }
        }
    }
    static isInner(rect: IQuadTreeItem, bounds: IQuadTreeItem) {
        return rect.x >= bounds.x &&
            rect.x + rect.w <= bounds.x + bounds.w &&
            rect.y >= bounds.y &&
            rect.y + rect.h <= bounds.y + bounds.h;
    }
    refresh(root: QuadTree=null) {
        if(root==null){
            this.debug_push_count = 0;
            root = this;
        }
        var rect: IQuadTreeItem, index: number, i: number, len: number;


        for (i = this.objects.length - 1; i >= 0; i--) {
            rect = this.objects[i];

            // 如果矩形不属于该象限， 且该矩形不是root,则将该矩形重新插入root
            if (!QuadTree.isInner(rect, this.bounds)) {
                if (this !== root) {
                    root.insert(this.objects.splice(i, 1)[0]);
                }
            }
            /* 没必要插入子对象中, 因为从root insert新的后会导致超过上限再拆分或重新排列
            else if (this.nodes.length) {
                // 如果矩形属于该象限 且 该象限具有子象限，则
                // 将该矩形安插到子象限中
                index = this.getIndex(rect);
                if (index !== -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                }
            } */
        }

        // 递归刷新子象限
        for (i = 0, len = this.nodes.length; i < len; i++) {
            this.nodes[i].refresh(root);
        }
    }
    /** 检索可以用鱼碰撞的结果队列 */
    retrieve(rect: IQuadTreeItem) {
        var result: IQuadTreeItem[] = [];
        if (this.nodes.length > 0) {
            var index: number;
            index = this.getIndex(rect);
            if (index !== -1) {
                result = result.concat(this.nodes[index].retrieve(rect));
            } else {
                // 切割矩形
                var arr: IQuadTreeItem[], i: number;
                arr = QuadTree.carve(rect, this.bounds.xHalf, this.bounds.yHalf);
                for (i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i]);
                    result = result.concat(this.nodes[index].retrieve(rect));
                }
            }
        }
        result = result.concat(this.objects);
        return result;
    }
    static carve(rect: IQuadTreeItem, cX: number, cY: number) {
        var result: IQuadTreeItem[] = [],
            temp: IQuadTreeItem[] = [],
            dX = cX - rect.x,
            dY = cY - rect.y,
            carveX = dX > 0 && dX < rect.w,
            carveY = dY > 0 && dY < rect.h;

        // 切割XY方向
        if (carveX && carveY) {
            temp = QuadTree.carve(rect, cX, rect.y);
            while (temp.length) {
                result = result.concat(QuadTree.carve(temp.shift(), rect.x, cY));
            }

            // 只切割X方向
        } else if (carveX) {
            result.push(
                new QuadTreeRect(rect.x, rect.y, dX, rect.h),
                new QuadTreeRect(cX, rect.y, rect.w - dX, rect.h)
            );

            // 只切割Y方向
        } else if (carveY) {
            result.push(
                new QuadTreeRect(rect.x, rect.y, rect.w, dY),
                new QuadTreeRect(rect.x, cY, rect.w, rect.h - dY)
            );
        }

        return result;
    }
}

interface IQuadTreeItem {
    x: number;
    y: number;
    w: number;
    h: number;
    xHalf: number;
    yHalf: number;
    wHalf: number;
    hHalf: number;
    parentQuadTree: QuadTree;
}
class QuadTreeRect implements IQuadTreeItem {
    x: number;
    y: number;
    h: number;
    w: number;
    xHalf: number;
    yHalf: number;
    wHalf: number;
    hHalf: number;
    parentQuadTree: QuadTree;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.xHalf = x + this.wHalf;
        this.yHalf = y + this.hHalf;
        this.wHalf = width / 2;
        this.hHalf = height / 2;
    }
}
class Rect implements IQuadTreeItem {
    speedArr: number[];
    nextSpeedArr: number[];
    x: number;
    y: number;
    h: number;
    w: number;
    xHalf: number;
    yHalf: number;
    wHalf: number;
    hHalf: number;
    parentQuadTree: QuadTree;
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
        this.xHalf = x + this.wHalf;
        this.yHalf = y + this.hHalf;
    }

    resize(width: number, height: number) {
        this.w = width;
        this.h = height;
        this.wHalf = width / 2;
        this.hHalf = height / 2;
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
            thisRect: Rect, sWidthSum: number, sHeightSum: number, dWidth: number, dHeight: number,
            onHorizontal: boolean, onVertical: boolean, focusPointDir: number;

        if (!isInner) {

            tRect1.copy(this);
            tRect2.copy(rect);

            // 判断碰撞方向
            sWidthSum = tRect1.wHalf + tRect2.wHalf;
            sHeightSum = tRect1.hHalf + tRect2.hHalf;
            dWidth = sWidthSum - Math.abs(tRect1.xHalf - tRect2.xHalf);
            dHeight = sHeightSum - Math.abs(tRect1.yHalf - tRect2.yHalf);

            while (dWidth > 0 && dHeight > 0) {
                tRect1.run(-16);
                tRect2.run(-16);
                dWidth = sWidthSum - Math.abs(tRect1.xHalf - tRect2.xHalf);
                dHeight = sHeightSum - Math.abs(tRect1.yHalf - tRect2.yHalf);
            }

            onHorizontal = dWidth <= 0;
            onVertical = dHeight <= 0;

            // 改变方向
            if (onHorizontal) {
                focusPointDir = this.xHalf > rect.xHalf ? 1 : -1;
                // this.nextSpeedArr[0] = focusPointDir * (Math.abs(this.nextSpeedArr[0]) + Math.abs(rect.speedArr[0])) / 2; //Speed is influenced by the other rect
                this.nextSpeedArr[0] = focusPointDir * (Math.abs(this.nextSpeedArr[0])); //Speed is not influenced by the other rect
            }

            if (onVertical) {
                focusPointDir = tRect1.yHalf > tRect2.yHalf ? 1 : -1;
                // this.nextSpeedArr[1] = focusPointDir * (Math.abs(this.nextSpeedArr[1]) + Math.abs(rect.speedArr[1])) / 2;
                this.nextSpeedArr[1] = focusPointDir * (Math.abs(this.nextSpeedArr[1]));
            }

        } else {
            if (Math.abs(this.xHalf - rect.xHalf) + this.wHalf > rect.wHalf) {
                this.nextSpeedArr[0] = -(this.nextSpeedArr[0] || this.speedArr[0]);
                this.moveTo(this.xHalf > rect.xHalf ?
                    rect.x + rect.w - this.w : rect.x, this.y);
            }
            if (Math.abs(this.yHalf - rect.yHalf) + this.hHalf > rect.hHalf) {
                this.nextSpeedArr[1] = -(this.nextSpeedArr[1] || this.speedArr[1]);
                this.moveTo(this.x, this.yHalf > rect.yHalf ?
                    rect.y + rect.h - this.h : rect.y);
            }
        }
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

        return +(Math.pow(rect1.xHalf - rect2.xHalf, 2) - Math.pow(tRect1.xHalf - tRect2.xHalf, 2) +
            Math.pow(rect1.yHalf - rect2.yHalf, 2) - Math.pow(tRect1.yHalf - tRect2.yHalf, 2)).toFixed(6) > 0 ?
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
        if (Math.abs(rect1.xHalf - rect2.xHalf) < rect1.wHalf + rect2.wHalf &&
            Math.abs(rect1.yHalf - rect2.yHalf) < rect1.hHalf + rect2.hHalf &&
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
            if (i < 90) {
                this.rectArr.push(
                    new Rect(Math.floor(Math.random() * (this.w - 20)),
                        Math.floor(Math.random() * (this.h - 20)),
                        Math.floor(Math.random() * 40 + 5),
                        Math.floor(Math.random() * 40 + 5),
                        // 200,200,
                        [Math.floor(Math.random() * 60 + 20), Math.floor(Math.random() * 60 + 20)])
                );
            } else {
                this.rectArr.push(
                    new Rect(Math.floor(Math.random() * (this.w - 20)),
                        Math.floor(Math.random() * (this.h - 20)),
                        200, 200,
                        [0, 0])
                );
            }
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
        console.info(this.collideCount, "`this.collideCount`",this.tree.debug_push_count,"`this.tree.debug_push_count`");

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
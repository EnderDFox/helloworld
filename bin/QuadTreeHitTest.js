/**
 * http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
 * http://jsfiddle.net/lxjwlt/6zLy7u29/embedded/result,js/
 */

(function(global) {
    var QuadTree = function QuadTree(bounds, level) {
        if (!(this instanceof QuadTree)) return;
        this.objects = [];
        this.nodes = [];
        this.level = typeof level === 'undefined' ? 0 : level;
        this.bounds = bounds;
    },
    cacheArr = [],
    concatArr, spliceArr;

    concatArr = function(targetArr) {
        var arr, i;
        for (i = 1; i < arguments.length; i++) {
            arr = arguments[i];
            Array.prototype.push.apply(targetArr, arr);
        }
    };

    spliceArr = function(arr, index, num) {
        var i, len;
        for (i = index + num, len = arr.length; i < len; i++) {
            arr[i - num] = arr[i];
        }
        arr.length = len - num;
    };

    // 常量
    QuadTree.prototype.MAX_OBJECTS = 10;
    QuadTree.prototype.MAX_LEVELS = 5;

    // 清空子节点
    QuadTree.prototype.clear = function() {
        var nodes = this.nodes,
            subnode;
        this.objects.splice(0, this.objects.length);
        while (nodes.length) {
            subnode = nodes.shift();
            subnode.clear();
        }
    };

    // 分裂
    QuadTree.prototype.split = function() {
        var level = this.level,
            bounds = this.bounds,
            x = bounds.x,
            y = bounds.y,
            sWidth = bounds.sWidth,
            sHeight = bounds.sHeight;

        this.nodes.push(
            new QuadTree(new Rect(bounds.cX, y, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(x, y, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(x, bounds.cY, sWidth, sHeight), level + 1),
            new QuadTree(new Rect(bounds.cX, bounds.cY, sWidth, sHeight), level + 1)
        );
    };

    // 获取象限号
    QuadTree.prototype.getIndex = function(rect, checkIsInner) {
        var bounds = this.bounds,
            onTop = rect.y + rect.h <=  bounds.cY,
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
    };

    // 插入
    QuadTree.prototype.insert = function(rect) {
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
            this.objects.length > this.MAX_OBJECTS &&
            this.level < this.MAX_LEVELS) {

            this.split();

            for (i = objs.length - 1; i >= 0; i--) {
                index = this.getIndex(objs[i]);
                if (index !== -1) {
                    this.nodes[index].insert(objs.splice(i, 1)[0]);
                }
            }
        }
    };

    // 动态刷新
    QuadTree.prototype.refresh = function(root) {
        var objs = this.objects,
            rect, index, i, len;

        root = root || this;

        for (i = objs.length - 1; i >= 0; i--) {
            index = this.getIndex(objs[i], true);

            // 如果矩形不属于该象限，则将该矩形重新插入
            if (index === -1) {
                if (this !== root) {
                    rect = objs[i];
                    spliceArr(objs, i, 1);
                    root.insert(rect);
                    // root.insert(objs.splice(i, 1)[0]);
                    
                }

            // 如果矩形属于该象限 且 该象限具有子象限，则
            // 将该矩形安插到子象限中
            } else if (this.nodes.length) {
                rect = objs[i];
                spliceArr(objs, i, 1);
                this.nodes[index].insert(rect);
                // this.nodes[index].insert(objs.splice(i, 1)[0]);
            }
        }

        // 递归刷新子象限
        for (i = 0, len = this.nodes.length; i < len; i++) {
            this.nodes[i].refresh(root);
        }
    };

    // 检索
    QuadTree.prototype.retrieve = function(rect) {
        var result = cacheArr,
            arr, i, index;

        if (this.level === 0) result.length = 0;

        concatArr(result, this.objects);

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
    };

    global.QuadTree = QuadTree;
})(window);

(function(global) {
    var Rect = function Rect(x, y, width, height, speedArr) {
        if (!(this instanceof Rect)) return;
        this.speedArr = speedArr || [20, 20];
        this.nextSpeedArr = this.speedArr.slice();
        this.resize(width, height);
        this.moveTo(x, y);
    }, 
    tempRectArr = [];

    Rect.prototype.moveTo = function(x, y) {
        this.x = x;
        this.y = y;
        this.cX = x + this.sWidth;
        this.cY = y + this.sHeight;
    };

    Rect.prototype.resize = function(width, height) {
        this.w = width;
        this.h = height;
        this.sWidth = width / 2;
        this.sHeight = height / 2;
    };

    tempRectArr.push(
        new Rect(0, 0, 0, 0),
        new Rect(0, 0, 0, 0)
    );

    Rect.prototype.draw = function(cxt) {
        cxt.save();
        cxt.beginPath();
        cxt.rect(this.x, this.y, this.w, this.h);
        cxt.closePath();
        cxt.restore();
    };

    Rect.prototype.run = function(time) {
        time = time || 16;
        this.speedArr[0] = this.nextSpeedArr[0];
        this.speedArr[1] = this.nextSpeedArr[1];

        this.moveTo(
            this.x + this.speedArr[0] * time / 1000,
            this.y + this.speedArr[1] * time / 1000
        );
    };

    Rect.prototype.copy = function(rect) {
        this.resize(rect.w, rect.h);
        this.moveTo(rect.x, rect.y);
        this.nextSpeedArr[0] = rect.speedArr[0];
        this.nextSpeedArr[1] = rect.speedArr[1];
    };

    Rect.prototype.init = function(x, y, w, h, speedArr) {
        this.resize(w, h);
        this.moveTo(x, y);
    };

    // 改变碰撞后运动方向
    Rect.prototype.collide = function(rect, isInner) {
        if (!(rect instanceof Rect)) return;

        var tRect1 = tempRectArr[0], 
            tRect2 = tempRectArr[1],
            thisRect, sWidthSum, sHeightSum, dWidth, dHeight,
            onHorizontal, onVertical, focusPoint;

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
    };

    Rect.prototype.carve = function(cX, cY) {
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
    };

    // 检查两个矩形是否互相接近
    Rect.isApproach = function(rect1, rect2) {
        // var tempRect1 = rect1.copy(),
        //     tempRect2 = rect2.copy();

        // tempRect1.run();
        // tempRect2.run();

        // return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(tempRect1.cX - tempRect2.cX, 2) +
        //     Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(tempRect1.cY - tempRect2.cY, 2)).toFixed(6) > 0 ?
        //     true : false;

        var tRect1 = tempRectArr[0],
            tRect2 = tempRectArr[1];

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
    };

    // 检查矩形是否发生碰撞
    Rect.isCollide = function(rect1, rect2) {
        if (Math.abs(rect1.cX - rect2.cX) < rect1.sWidth + rect2.sWidth &&
            Math.abs(rect1.cY - rect2.cY) < rect1.sHeight + rect2.sHeight &&
            Rect.isApproach(rect1, rect2)) {

            rect1.collide(rect2);
            rect2.collide(rect1);
        }
    };

    global.Rect = Rect;
})(window);

(function(global, doc) {
    var canvas = document.getElementById('mycanvas'),
        cxt = canvas.getContext('2d'),
        QuadTree = global.QuadTree,
        Rect = global.Rect,
        w = 1000,
        h = 500,
        rectArr = [],
        tree, i, len, time;

    // 设置canvas尺寸
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);

    // 随机创建
    for (i = 0; i < 100; i++) {
        rectArr.push(
            new Rect(Math.floor(Math.random() * (w - 20)), 
                Math.floor(Math.random() * (h - 20)), 
                Math.floor(Math.random() * 40+5), 
                Math.floor(Math.random() * 40+5),
                [Math.floor(Math.random() * 60 + 20), Math.floor(Math.random() * 60 + 20)])
        );
    }

    // 初始化四叉树
    tree = new QuadTree(new Rect(0, 0, w, h));
    for (i = 0, len = rectArr.length; i < len; i++) {
        tree.insert(rectArr[i]);
    }

    time = new Date().getTime();
    
    cxt.fillStyle = '#000';
    var draw = function draw() {
        var cTime = Date.now(),
            i, j, len, rect, tempRect;

        // 清屏
        cxt.clearRect(0, 0, w, h);

        // 更新四叉树
        tree.refresh();

        // 碰撞检测
        for (i = 0, len = rectArr.length; i < len; i++) {
            tempRect = tree.retrieve(rectArr[i]);
            for (j = 0; j < tempRect.length; j++) {
                Rect.isCollide(rectArr[i], tempRect[j]);
            }

            // 防止溢出画布
            rectArr[i].collide(new Rect(0, 0, w, h), true);
        }

        // 绘制
        for (i = 0, len = rectArr.length; i < len; i++) {
            rectArr[i].run(cTime - time);
            rectArr[i].draw(cxt);
            cxt.fill();
        }

        time = cTime;

        requestAnimationFrame(draw);
    };


    requestAnimationFrame(draw);

})(this, this.document);
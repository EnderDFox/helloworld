/**
 * http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
 */
var QuadTree = /** @class */ (function () {
    function QuadTree(bounds, parentQuadTree) {
        if (parentQuadTree === void 0) { parentQuadTree = null; }
        this.items = [];
        this.children = [];
        this.parent = parentQuadTree;
        if (this.parent == null) {
            this.level = 0;
        }
        else {
            this.level = this.parent.level + 1;
        }
        this.bounds = bounds;
    }
    QuadTree.prototype.clear = function () {
        var nodes = this.children;
        var subnode;
        this.items.splice(0, this.items.length);
        while (nodes.length) {
            subnode = nodes.shift();
            subnode.clear();
        }
    };
    QuadTree.prototype.split = function () {
        var level = this.level;
        var bounds = this.bounds;
        var x = bounds.x;
        var y = bounds.y;
        var wHalf = bounds.wHalf;
        var hHalf = bounds.hHalf;
        this.children.push(new QuadTree(new QuadTreeItem(bounds.xHalf, y, wHalf, hHalf), this), new QuadTree(new QuadTreeItem(x, y, wHalf, hHalf), this), new QuadTree(new QuadTreeItem(x, bounds.yHalf, wHalf, hHalf), this), new QuadTree(new QuadTreeItem(bounds.xHalf, bounds.yHalf, wHalf, hHalf), this));
    };
    QuadTree.prototype.getIndex = function (rect) {
        QuadTree.debug_getIndex_count++;
        var bounds = this.bounds, onTop = rect.y + rect.h <= bounds.yHalf, onBottom = rect.y >= bounds.yHalf, onLeft = rect.x + rect.w <= bounds.xHalf, onRight = rect.x >= bounds.xHalf;
        if (onTop) {
            if (onRight) {
                return 0;
            }
            else if (onLeft) {
                return 1;
            }
        }
        else if (onBottom) {
            if (onLeft) {
                return 2;
            }
            else if (onRight) {
                return 3;
            }
        }
        // 如果物体跨越多个象限，则返回-1
        return -1;
    };
    QuadTree.prototype.insert = function (rect) {
        var i, index;
        if (this.children.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.children[index].insert(rect);
                return;
            }
        }
        //
        this.items.push(rect);
        rect.ownerQuadTree = this;
        QuadTree.debug_itemsPush_count++;
        //
        if (this.items.length > QuadTree.MAX_ITEMS && this.level < QuadTree.MAX_LEVEL) {
            if (!this.children.length) {
                this.split(); //拆分
            }
            for (i = this.items.length - 1; i >= 0; i--) {
                index = this.getIndex(this.items[i]);
                if (index !== -1) {
                    rect = this.items.splice(i, 1)[0];
                    this.children[index].items.push(rect);
                    rect.ownerQuadTree = this.children[index];
                    QuadTree.debug_itemsPush_count++;
                    // this.nodes[index].insert(rect);//There is no need to write like this, because there is already a index value, and subNode can't split at this time
                }
            }
        }
    };
    QuadTree.isInner = function (rect, bounds) {
        QuadTree.debug_isInner_count++;
        return rect.x >= bounds.x &&
            rect.x + rect.w <= bounds.x + bounds.w &&
            rect.y >= bounds.y &&
            rect.y + rect.h <= bounds.y + bounds.h;
    };
    QuadTree.prototype.refresh = function (root) {
        if (root === void 0) { root = null; }
        if (root == null) {
            QuadTree.debug_itemsPush_count = 0;
            QuadTree.debug_getIndex_count = 0;
            QuadTree.debug_isInner_count = 0;
            root = this;
        }
        var rect, index, i, len;
        for (i = this.items.length - 1; i >= 0; i--) {
            rect = this.items[i];
            if (rect.isDirty == false) {
                continue;
            }
            rect.isDirty = false;
            // 如果矩形不属于该象限， 且该矩形不是root,则将该矩形重新插入root
            if (!QuadTree.isInner(rect, this.bounds)) {
                if (this !== root) {
                    root.insert(this.items.splice(i, 1)[0]);
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
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].refresh(root);
        }
    };
    /** 检索可以用鱼碰撞的结果队列 */
    QuadTree.prototype.retrieve = function (rect) {
        var result = [];
        if (this.children.length > 0) {
            var index;
            index = this.getIndex(rect);
            if (index !== -1) {
                result = result.concat(this.children[index].retrieve(rect));
            }
            else {
                // 切割矩形
                var arr, i;
                arr = QuadTree.carve(rect, this.bounds.xHalf, this.bounds.yHalf);
                for (i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i]);
                    result = result.concat(this.children[index].retrieve(rect));
                }
            }
        }
        result = result.concat(this.items);
        return result;
    };
    QuadTree.carve = function (rect, cX, cY) {
        var result = [], temp = [], dX = cX - rect.x, dY = cY - rect.y, carveX = dX > 0 && dX < rect.w, carveY = dY > 0 && dY < rect.h;
        // 切割XY方向
        if (carveX && carveY) {
            temp = QuadTree.carve(rect, cX, rect.y);
            while (temp.length) {
                result = result.concat(QuadTree.carve(temp.shift(), rect.x, cY));
            }
            // 只切割X方向
        }
        else if (carveX) {
            result.push(new QuadTreeItem(rect.x, rect.y, dX, rect.h), new QuadTreeItem(cX, rect.y, rect.w - dX, rect.h));
            // 只切割Y方向
        }
        else if (carveY) {
            result.push(new QuadTreeItem(rect.x, rect.y, rect.w, dY), new QuadTreeItem(rect.x, cY, rect.w, rect.h - dY));
        }
        return result;
    };
    QuadTree.MAX_ITEMS = 10;
    QuadTree.MAX_LEVEL = 5;
    //---
    QuadTree.debug_itemsPush_count = 0;
    QuadTree.debug_getIndex_count = 0;
    QuadTree.debug_isInner_count = 0;
    return QuadTree;
}());
var QuadTreeItem = /** @class */ (function () {
    function QuadTreeItem(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.xHalf = x + this.wHalf;
        this.yHalf = y + this.hHalf;
        this.wHalf = width / 2;
        this.hHalf = height / 2;
    }
    return QuadTreeItem;
}());
//# sourceMappingURL=QuadTree.js.map
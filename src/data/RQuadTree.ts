import {Rect} from "./Rect"

interface RQuadTree {
    readonly bounds: Rect
    readonly maxItems: number
    readonly maxDepth: number
    insert(rect: Rect): RQuadTree
    query(rect: Rect): Rect[]
    clear(): RQuadTree
    split(): RQuadTree
    delete(rect: Rect): RQuadTree
}

class Branch implements RQuadTree {
    readonly NW: RQuadTree
    readonly NE: RQuadTree
    readonly SE: RQuadTree
    readonly SW: RQuadTree

    constructor(
        public readonly bounds: Rect,
        public readonly maxItems: number,
        public readonly maxDepth: number
    ) {}

    insert(rect: Rect): RQuadTree {}

    query(rect: Rect): Rect[] {}

    clear(): RQuadTree {
        return new Empty(this.bounds, this.maxItems, this.maxDepth)
    }

    split(): RQuadTree { return this }

    delete(rect: Rect): RQuadTree {}
}

class Quadrant implements RQuadTree {
    constructor(
        public readonly bounds: Rect,
        public readonly maxItems: number,
        public readonly maxDepth: number
    ) {}

    insert(rect: Rect): RQuadTree {}

    query(rect: Rect): Rect[] {}

    clear(): RQuadTree {
        return new Empty(this.bounds, this.maxItems, this.maxDepth)
    }

    split(): RQuadTree {}

    delete(rect: Rect): RQuadTree {}
}

class Empty implements RQuadTree {
    constructor(
        public readonly bounds: Rect,
        public readonly maxItems: number,
        public readonly maxDepth: number
    ) {}

    insert(rect: Rect): RQuadTree {}

    query(rect: Rect): Rect[] {}

    clear(): RQuadTree { return this; }

    split(): RQuadTree { }

    delete(rect: Rect): RQuadTree {}
}

/*
abstract class RegionQuadTree {
    public abstract readonly bounds: Rectangle
    public abstract readonly capacity: number
    public abstract readonly items: Rectangle[]
    public abstract readonly maxDepth

    //Creates an empty QuadTree based on the current settings
    public clear(): RegionQuadTree {
        return new Empty(
            this.bounds,
            this.capacity,
            this.maxDepth
        )
    }
    //subdivides the current node into 4 quadrants
    public abstract split(): RegionQuadTree
    //inserts the item
    public abstract insert(): RegionQuadTree

}

class Leaf extends RegionQuadTree {
    constructor(
        public readonly bounds: Rectangle,
        public readonly capacity: number,
        public readonly maxDepth: number,
        public readonly items: Rectangle[]
    ) { super() }

    public split(): RegionQuadTree<T> {
        var subWidth = Math.floor(this.bounds.width / 2),
            subHeight = Math.floor(this.bounds.height),
            subRect = new Rectangle(subWidth,subHeight),
            c = this.capacity,
            px = this.position.x,
            py = this.position.y,
            x_2 = Math.floor(px / 2),
            y_2 = Math.floor(py / 2)

        return new Quadrant<T>(
            this.position,
            this.bounds,
            this.capacity,
            this.maxDepth,
            new Leaf<T>(
                new Point2(px-x_2,py-y_2),
                subRect,
                c,
                this.maxDepth - 1,
                this.items.filter(item =>
                    subRect.contains(new Point2(x_2,))
                    item.position.x <= px && item.position.y <= py
                )
            ),
            new Leaf<T>(
                new Point2(px+x_2,py-y_2),
                subRect,
                c,
                this.maxDepth - 1,
                this.items.filter(item => 
                    item.position.x >= px && item.position.y <= py
                )
            ),
            new Leaf<T>(
                new Point2(px+x_2,py+y_2),
                subRect,
                c,
                this.maxDepth - 1,
                this.items.filter(item => 
                    item.position.x >= px && item.position.y >= py
                )
            ),
            new Leaf<T>(
                new Point2(px-x_2,py+y_2),
                subRect,
                c,
                this.maxDepth - 1,
                this.items.filter(item =>
                    item.position.x <= px && item.position.y >= py
                )
            )
        )
    }
}

class Empty extends RegionQuadTree {
    public readonly items: Rectangle[] = []
    constructor(
        public readonly position: Point2,
        public readonly bounds: Rectangle,
        public readonly capacity: number,
        public readonly maxDepth: number
    ){ super() }

    public split(): RegionQuadTree<T> {
        var subWidth = Math.floor(this.bounds.width / 2),
            subHeight = Math.floor(this.bounds.height),
            subRect = new Rectangle(subWidth,subHeight),
            c = this.capacity,
            px = this.position.x,
            py = this.position.y,
            x_2 = Math.floor(px / 2),
            y_2 = Math.floor(py / 2)

        return new Quadrant(
            this.bounds,
            this.capacity,
            this.maxDepth,
            new Empty(new Point2(px-x_2,py-y_2),subRect,c,this.maxDepth),
            new Empty(new Point2(px+x_2,py-y_2),subRect,c,this.maxDepth),
            new Empty(new Point2(px+x_2,py+y_2),subRect,c,this.maxDepth),
            new Empty(new Point2(px-x_2,py+y_2),subRect,c,this.maxDepth)
        )
    }
}

class Quadrant extends RegionQuadTree {
    public readonly items: Rectangle[] = []
    constructor(
        public readonly bounds: Rectangle,
        public readonly capacity: number,
        public readonly maxDepth: number,
        public readonly NW: RegionQuadTree,
        public readonly NE: RegionQuadTree,
        public readonly SE: RegionQuadTree,
        public readonly SW: RegionQuadTree
    ){ super() }

    public split(): RegionQuadTree { return this }
}

function create(
    bounds: Rectangle,
    capacity: number,
    maxDepth: number
): RegionQuadTree { 
    return new Empty(position, bounds, capacity, maxDepth)
}

export {RegionQuadTree, create}
*/

function create(bounds: Rect, maxItems: number, maxDepth): RQuadTree {
    return new Empty(bounds, maxItems, maxDepth)
}
    
export default create
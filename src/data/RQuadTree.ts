import {Rect} from "./Rect"

interface RQuadTree {
    readonly bounds: Rect
    readonly capacity: number
    readonly maxDepth: number
    insert(rect: Rect): RQuadTree
    find(rect: Rect): Rect[]
    clear(): RQuadTree
    split(): RQuadTree
}

class Branch implements RQuadTree {
    constructor(
        readonly bounds: Rect,
        readonly capacity: number,
        readonly maxDepth: number,
        readonly items: Rect[],
        readonly NE: RQuadTree,
        readonly NW: RQuadTree,
        readonly SE: RQuadTree,
        readonly SW: RQuadTree
    ) {}

    insert(rect: Rect): RQuadTree {
        var b = this.bounds,   c = this.capacity,
            d = this.maxDepth, i = this.items,
            NE = this.NE, NW = this.NW,
            SE = this.SE, SW = this.SW

        return !b.contains(rect)        ? this :
               NE.bounds.contains(rect) ? new Branch(b,c,d,i,NE.insert(rect),NW,SE,SW) :
               NW.bounds.contains(rect) ? new Branch(b,c,d,i,NE,NW.insert(rect),SE,SW) :
               SE.bounds.contains(rect) ? new Branch(b,c,d,i,NE,NW,SE.insert(rect),SW) :
               SW.bounds.contains(rect) ? new Branch(b,c,d,i,NE,NW,SE,SW.insert(rect)) :
               new Branch(b,c,d,i.concat(rect),NE,NW,SE,SW)
    }

    find(rect: Rect): Rect[] {
        return !rect.intersects(this.bounds) ? [] :
            [this.NE,this.NW,this.SE, this.SW]
            .filter(quad => quad.bounds.intersects(rect))
            .map(quad => quad.find(rect))
            .reduce((sum, cur) => sum.concat(cur))
            .concat(this.items.filter(item => item.intersects(rect)))
    }

    clear(): RQuadTree {
        return new Quadrant(this.bounds, this.capacity, this.maxDepth, [])
    }

    split(): RQuadTree { return this }
}

class Quadrant implements RQuadTree {
    constructor(
        public readonly bounds: Rect,
        public readonly capacity: number,
        public readonly maxDepth: number,
        public readonly items: Rect[]
    ) {}

    insert(rect: Rect): RQuadTree {
        return !this.bounds.contains(rect) ? this :
            this.items.length == this.capacity && this.maxDepth > 0 ? 
                this.split().insert(rect) :
                new Quadrant(
                    this.bounds,
                    this.capacity,
                    this.maxDepth,
                    this.items.concat(rect)
                )
    }

    find(rect: Rect): Rect[] {
        return !rect.intersects(this.bounds) ? [] :
            this.items.filter(item => item.intersects(rect))
    }

    clear(): RQuadTree {
        return new Quadrant(this.bounds, this.capacity, this.maxDepth, [])
    }

    split(): RQuadTree {
        var floor = Math.floor, items = this.items, b = this.bounds,
            height = b.height, width = b.width,
            top = b.top, right = b.right, bottom = b.bottom, left = b.left,
            midTop = floor(top+height/2), midLeft = floor(left+width/2), 
            neBounds = new Rect(top,right,midTop,midLeft),
            nwBounds = new Rect(top,midLeft,midTop,left),
            seBounds = new Rect(midTop,right,bottom,midLeft),
            swBounds = new Rect(midTop,midLeft,bottom,left),
            neItems = items.filter(item => neBounds.contains(item)),
            nwItems = items.filter(item => nwBounds.contains(item)),
            seItems = items.filter(item => seBounds.contains(item)),
            swItems = items.filter(item => swBounds.contains(item)),
            remItems = items.filter(item => 
                !neBounds.contains(item) && !nwBounds.contains(item) &&
                !seBounds.contains(item) && !swBounds.contains(item)
            );

        return new Branch(
            this.bounds,
            this.capacity,
            this.maxDepth-1,
            remItems,
            new Quadrant(neBounds,this.capacity,this.maxDepth-1,neItems),
            new Quadrant(nwBounds,this.capacity,this.maxDepth-1,nwItems),
            new Quadrant(seBounds,this.capacity,this.maxDepth-1,seItems),
            new Quadrant(swBounds,this.capacity,this.maxDepth-1,swItems)
        )
    }
}

function create(bounds: Rect, capacity: number, maxDepth): RQuadTree {
    return new Quadrant(bounds, capacity, maxDepth, [])
}
    
export default create
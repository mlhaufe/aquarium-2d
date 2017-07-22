import {IRect, IRectConstructor} from "./Rect"

//References
// <https://en.wikipedia.org/wiki/Quadtree>
// <http://algs4.cs.princeton.edu/92search/QuadTree.java.html>
// <https://www.cs.umd.edu/class/spring2008/cmsc420/L17-18.QuadTrees.pdf>
// <http://web.eecs.utk.edu/~cphillip/cs594_spring2014/quadtree-Allan.pdf>
// <https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374>

export default function<R extends IRect>(CRect: IRectConstructor) {
    interface RQuadTree {
        readonly bounds: R
        readonly capacity: number
        readonly maxDepth: number
        insert(rect: R): RQuadTree
        delete(rect: R): RQuadTree
        find(rect: R): R[]
        clear(): RQuadTree
        split(): RQuadTree
    }

    class Branch implements RQuadTree {
        constructor(
            readonly bounds: R,
            readonly capacity: number,
            readonly maxDepth: number,
            readonly items: R[],
            readonly NE: RQuadTree,
            readonly NW: RQuadTree,
            readonly SE: RQuadTree,
            readonly SW: RQuadTree
        ) {}

        insert(rect: R): RQuadTree {
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

        find(rect: R): R[] {
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

        delete(rect: R): RQuadTree {
            return rect.contains(this.bounds)    ? this.clear() : 
                !rect.intersects(this.bounds) ? this :
                new Branch(
                    this.bounds, this.capacity,this.maxDepth,
                    this.items.filter(item => item.intersects(rect)),
                    this.NE.delete(rect),
                    this.NW.delete(rect),
                    this.SE.delete(rect),
                    this.SW.delete(rect)
                )
        }
    }

    class Quadrant implements RQuadTree {
        constructor(
            public readonly bounds: R,
            public readonly capacity: number,
            public readonly maxDepth: number,
            public readonly items: R[]
        ) {}

        insert(rect: R): RQuadTree {
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

        find(rect: R): R[] {
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
                neBounds = new CRect(top,right,midTop,midLeft),
                nwBounds = new CRect(top,midLeft,midTop,left),
                seBounds = new CRect(midTop,right,bottom,midLeft),
                swBounds = new CRect(midTop,midLeft,bottom,left),
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

        delete(rect: R): RQuadTree {
            return rect.contains(this.bounds)    ? this.clear() : 
                !rect.intersects(this.bounds) ? this :
                new Quadrant(
                    this.bounds, this.capacity,this.maxDepth,
                    this.items.filter(item => item.intersects(rect))
                )
        }
    }

    return function create(bounds: R, capacity: number, maxDepth: number): RQuadTree {
        return new Quadrant(bounds, capacity, maxDepth, [])
    }
}
import {Rect, IRect, IRectConstructor} from "./Rect"

interface IBoundingRect<T> extends IRect {
    readonly item: T
}

class BoundingRect<T> extends Rect implements IBoundingRect<T> {
    constructor(
        readonly item: T,
        readonly top: number,
        readonly right: number,
        readonly bottom: number,
        readonly left: number
    ) { super(top,right,bottom,left) }
}

interface IBoundingRectConstructor<T> {
    new(item: T, top: number, right: number, bottom: number, left: number): IBoundingRect<T>
}

export {BoundingRect, IBoundingRect, IBoundingRectConstructor}
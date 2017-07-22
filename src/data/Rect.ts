interface IRect {
    readonly top: number
    readonly right: number
    readonly bottom: number
    readonly left: number
    readonly width: number
    readonly height: number
    contains(rect: IRect): boolean
    intersects(rect: IRect): boolean
}

class Rect implements IRect {
    readonly width: number = this.right - this.left
    readonly height: number = this.bottom - this.top
    constructor(
        readonly top: number,
        readonly right: number,
        readonly bottom: number,
        readonly left: number
    ){}
    contains(rect: Rect): boolean {
        return rect.top >= this.top &&
            rect.right  <= this.right &&
            rect.bottom <= this.bottom &&
            rect.left   >= this.left
    } 
    intersects(rect: Rect): boolean {
        return rect.top <= this.bottom && rect.bottom >= this.top
            && rect.left <= this.right && rect.right >= this.left
    }
}

interface IRectConstructor {
    new(top: number, right: number, bottom: number, left: number): IRect
}

export {IRect, Rect, IRectConstructor}
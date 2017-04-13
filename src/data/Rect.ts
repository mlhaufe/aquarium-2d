class Rect {
    readonly width: number
    readonly height: number

    constructor(
        readonly top: number,
        readonly right: number,
        readonly bottom: number,
        readonly left: number
    ){
        this.width = this.right - this.left
        this.height = this.bottom - this.top
    }

    contains(rect: Rect): boolean {
        return rect.top    >= this.top &&
               rect.right  <= this.right &&
               rect.bottom <= this.bottom &&
               rect.left   >= this.left
    }

    intersects(rect: Rect): boolean {
        return rect.top <= this.bottom && rect.bottom >= this.top
            && rect.left <= this.right && rect.right >= this.left
    }
}

export {Rect}
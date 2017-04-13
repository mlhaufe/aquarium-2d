import {Rect} from "./Rect"

class BoundingRect<T> extends Rect {
    constructor(
        readonly item: T,
        top: number,
        right: number,
        bottom: number,
        left: number
        ) { super(top,right,bottom,left) }
}

class Boid {
    getBoundingRect(): BoundingRect<Boid> { 
        return new BoundingRect<Boid>(this,0,0,0,0);
    }
}

export default function boid(): Boid{ return new Boid() }
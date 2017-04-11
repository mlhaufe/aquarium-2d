import Rect from "./Rect"

class BoundingRect<T> extends Rect {
    constructor(item: T) {}
}

class Boid {
    getBoundingRect(): BoundingRect {}
}

export default function boid(): Boid{ return new Boid() }
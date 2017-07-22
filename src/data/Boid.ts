import {BoundingRect} from "./BoundingRect"
import {Vector2} from "./Vector2"


// References:
// <http://www.red3d.com/cwr/boids/>
// <https://en.wikipedia.org/wiki/Boids>

class Boid {
    constructor(public position: Vector2){

    }
    getBoundingRect(): BoundingRect<Boid> { 
        return new BoundingRect<Boid>(this,0,0,0,0);
    }
}

export {Boid}
class Vector2 {
    static readonly Zero: Vector2 = new Vector2(0, 0)
    static readonly UnitX: Vector2 = new Vector2(1, 0)
    static readonly UnitY: Vector2 = new Vector2(0,1)

    constructor(
        public readonly a: number,
        public readonly b: number
    ) { }

    // <a,b> + <c,d> = <a+c,b+d>
    add(vector: Vector2): Vector2 {
        return new Vector2(this.a + vector.a, this.b + vector.b)
    }

    // <a,b> angle <c,d> = atan2(b,a) - atan(c,d)
    // The angle is in radians between between -π and π
    angle(vector: Vector2): number {
        return Math.atan2(vector.b, vector.a) - Math.atan2(this.b, this.a)
    }

    //<a,b> dot <c,d> = a * c + b * d
    dot(vector: Vector2): number {
        return this.a * vector.a + this.b * vector.b
    }
    //<a,b> = <c,d> => <a = c, b = d>
    equals(vector: Vector2): boolean {
        return vector.a == this.a && vector.b == this.b;
    }

    innerProduct(vector: Vector2): number { return this.dot(vector) }

    isOrthogonal(vector: Vector2): boolean { return this.dot(vector) === 0 }

    isPerpendicular(vector: Vector2): boolean { return this.isOrthogonal(vector) }

    magnitude(): number { return (this.a ** 2 + this.b ** 2) ** (1/2) }

    projectScalar(ontoVector: Vector2): number {
        return ontoVector.dot(this) / ontoVector.magnitude()
    }

    projectVector(ontoVector: Vector2): Vector2 {
        return ontoVector.unit().scale(this.projectScalar(ontoVector))
    }

    scale(n: number): Vector2 {
        return new Vector2(this.a * n, this.b * n)
    }

    sub(vector: Vector2): Vector2 {
        return new Vector2(this.a - vector.a, this.b - vector.b)
    }

    unit(): Vector2 {
        return new Vector2(this.a / Math.abs(this.a), this.b / Math.abs(this.b));
    }
}

export {Vector2}
export class Bullet {
    constructor(x, y, velocity, angle) {
        this.velocity = velocity
        this.angle = angle
        
        this.bulletShape = Path.Circle({
            center: new Point(x, y),
            radius: 10,
            fillColor: "black"
        })
    }

    update() {
        this.bulletShape.position.x = this.bulletShape.position.add(new Point({angle: this.angle, length: this.velocity})).x
        this.bulletShape.position.y = this.bulletShape.position.add(new Point({angle: this.angle, length: this.velocity})).y
    }

    outOfBounds(clientHeight, clientWidth) {
        return (this.bulletShape.position.x > clientWidth || this.bulletShape.position.y > clientHeight)
    }
};
export class Bullet {
    constructor(x, y, velocity, angle, target, targetBase) {
        this.velocity = velocity
        this.angle = angle
        
        this.bulletShape = Path.Circle({
            center: new Point(x, y),
            radius: 10,
            fillColor: "black"
        })

        this.target = target
        this.targetBase = targetBase
        this.targetPos = new Point(this.targetBase.position.x, this.targetBase.position.y)
    }

    update() {
        this.bulletShape.position.x = this.bulletShape.position.add(new Point({angle: this.angle, length: this.velocity})).x
        this.bulletShape.position.y = this.bulletShape.position.add(new Point({angle: this.angle, length: this.velocity})).y
        this.bulletPos = new Point(this.bulletShape.position.x, this.bulletShape.position.y)
    }
    
    itemHitTest() {
        let options = {
            fill: true,
            tolerance: 0
        }
        let hitResultPlayer = this.targetBase.hitTest(this.bulletPos, options) 
        if (hitResultPlayer != null) {
            this.target.lives -= 1
            return true
        }
        return false
    }

    outOfBounds(clientHeight, clientWidth) {
        return (this.bulletShape.position.x > clientWidth || this.bulletShape.position.y > clientHeight)
    }
};

/* Hit Test
- Perform a hit test on the bullet at the point of the player and the enemy
- if there is a hit find if on player or enemy
- subtract life from player or enemy
- hit test should be of type 'fill'
*/
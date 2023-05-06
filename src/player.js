export class Player {
    constructor(x, y, color, team) { 
        this.color = color
        this.team = team

        this.playerBase = new Path.Circle({
            center : [x, y],
            radius : 50,
            strokeColor : this.color,
            fillColor : this.color
        })

        this.velocity = 0
        this.mousePoint = new Point(this.playerBase.position.x, this.playerBase.position.y)
        this.lookPath = new Path.Line(this.playerBase.position, this.playerBase.position)
    }
    
    accelerate(v) {
        this.velocity += v
        if (this.velocity > 10) {
            this.velocity = 10
        } else if (this.velocity < -10) {
            this.velocity = -10
        }
    }   

    decelerate(v) {
        if (this.velocity > 0) {
            this.velocity += v
        } else if (this.velocity < 0) {
            this.velocity -= v
        }
    }

    move() {
        this.dir = new Point({
            length: this.velocity/2,
            angle: this.calculateAngle(this.mousePoint),   
        })
        
        
        this.playerBase.position.x += this.dir.x
        this.playerBase.position.y += this.dir.y
    
    }  

    update() {
        this.move()
        this.lookDir() 
    }

    calculateAngle(point) {
        let playerPos = new Point(this.playerBase.position.x, this.playerBase.position.y)
        let mousePos = new Point(point.x, point.y)
        let lookVector = mousePos.subtract(playerPos)

        if (lookVector.length < 5) {
            this.velocity = 0
        }

        return lookVector.angle
    }

    rotate(point) {
        this.mousePoint = point
    }

    lookDir() {
        this.lookPath.remove()
        this.lookPath = new Path.Line(this.playerBase.position, this.playerBase.position.add(new Point({angle: this.calculateAngle(this.mousePoint), length: 70})))
        this.lookPath.strokeColor = this.color
        this.lookPath.strokeWidth = 35
    }

}
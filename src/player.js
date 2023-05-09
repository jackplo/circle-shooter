import { Bullet } from "./bullet.js"

export class Player {
    constructor(x, y, color, team) { 
        this.color = color
        this.team = team

        this.playerBase = new Path.Circle({
            center : [x, y],
            radius : 25,
            strokeColor : this.color,
            fillColor : this.color
        })

        this.velocity = 0
        this.bulletVelocity = 5
        this.mousePoint = new Point(this.playerBase.position.x, this.playerBase.position.y)
        this.lookPath = new Path.Line(this.playerBase.position, this.playerBase.position)
        this.bulletArray = []
    }
    
    accelerate(v) {
        this.velocity += v
        if (this.velocity > 5) {
            this.velocity = 5
        } else if (this.velocity < -5) {
            this.velocity = -5
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

    outOfBounds(item, clientHeight, clientWidth) {
        return (item.position.x > clientWidth || item.position.x < 0 || item.position.y > clientHeight || item.position.y < 0)
    }

    update(clientHeight, clientWidth) {
        this.move()
        this.lookDir() 
        if (this.bulletArray != []) {
            for (let i = this.bulletArray.length - 1; i >= 0; i--) {
                this.bulletArray[i].update()
                if (this.outOfBounds(this.bulletArray[i].bulletShape, clientHeight, clientWidth)) {
                    this.bulletArray[i].bulletShape.remove()
                    this.bulletArray.splice(i, 1)
                }
            }
        }
    }

    shoot() {
        let turret_pos = this.playerBase.position.add(new Point({angle: this.calculateAngle(this.mousePoint), length: 70}))
        this.bulletArray.push(new Bullet(turret_pos.x, turret_pos.y, 3, this.calculateAngle(this.mousePoint)))
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
        this.lookPath = new Path.Line(this.playerBase.position, this.playerBase.position.add(new Point({angle: this.calculateAngle(this.mousePoint), length: 35})))
        this.lookPath.strokeColor = this.color
        this.lookPath.strokeWidth = 17.5
    }

}
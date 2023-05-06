import { Project, Path } from '../node_modules/paper/dist/paper-full.js';
import * as paper from '../node_modules/paper/dist/paper-full.js';

export class Player {
    color: string
    team: string
    playerBase: any
    velocity: number
    mousePoint: any
    lookPath: any
    dir: any

    constructor(x: number, y: number, color: string, team: string) { 
        this.color = color
        this.team = team

        this.playerBase = new paper.Path.Circle({
            center : [x, y],
            radius : 50,
            strokeColor : this.color,
            fillColor : this.color
        })

        this.velocity = 0
        this.mousePoint = new paper.Point(this.playerBase.position.x, this.playerBase.position.y)
        this.lookPath = new paper.Path.Line(this.playerBase.position, this.playerBase.position)
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
        this.dir = new paper.Point({
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
        let playerPos = new paper.Point(this.playerBase.position.x, this.playerBase.position.y)
        let mousePos = new paper.Point(point.x, point.y)
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
        this.lookPath = new paper.Path.Line(this.playerBase.position, this.playerBase.position.add(new paper.Point({angle: this.calculateAngle(this.mousePoint), length: 70})))
        this.lookPath.strokeColor = this.color
        this.lookPath.strokeWidth = 35
    }

}
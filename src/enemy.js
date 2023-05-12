import { Bullet } from "./bullet.js"

export class Enemy {
    constructor(x, y, color, player) {
        this.color = color
        this.player = player
        
        this.enemyBase = Path.Circle({
            center: [x, y],
            radius: 25,
            strokeColor: this.color,
            fillColor: this.color
        })

        this.velocity = 0
        this.bulletVelocity = 5
        this.bulletArray = []
        this.lives = 3
        this.interval = 0
    }

    accelerate(v) {
        this.velocity += v
        if (this.velocity > 2) {
            this.velocity = 2
        } else if (this.velocity < -2) {
            this.velocity = -2
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
        let dir = new Point({
            length: 3/2,
            angle: this.calculateAngle(this.player),   
        })
    
        this.enemyBase.position.x += dir.x
        this.enemyBase.position.y += dir.y
    }

    stop() {
        this.velocity = 0
        let dir = new Point({
            length: 0,
            angle: this.calculateAngle(this.player)
        })

        this.enemyBase.position.x += dir.x
        this.enemyBase.position.y += dir.y
    }

    death() {
        this.enemyBase.remove()
        clearInterval(this.interval)
        for (let i = this.bulletArray.length - 1; i >= 0; i--) {
            this.bulletArray[i].bulletShape.remove()
            this.bulletArray.splice(i, 1)
        }
    }

    shoot() {
        this.interval = setInterval(() => {
            this.bulletArray.push(new Bullet(this.enemyBase.position.x, this.enemyBase.position.y, 3, this.calculateAngle(this.player), this.player, this.player.playerBase))
        }, 2000)
    }

    outOfBounds(item, clientHeight, clientWidth) {
        return (item.position.x > clientWidth || item.position.x < 0 || item.position.y > clientHeight || item.position.y < 0)
    }

    calculateAngle(player) {
        let enemyPos = new Point(this.enemyBase.position.x, this.enemyBase.position.y)
        this.playerPos = new Point(player.playerBase.position.x, player.playerBase.position.y)
        let lookVector = this.playerPos.subtract(enemyPos)

        if (lookVector.length < 10) {
            this.velocity = 0
        }

        return lookVector.angle
    }

    pythagorean(playerPos, enemyPos) {
        let vectorDistance = playerPos.subtract(enemyPos)
        let distance = Math.sqrt(vectorDistance.x**2 + vectorDistance.y**2)

        return distance
    }

    update(clientWidth, clientHeight) {
        if (this.lives >= 0) {
            let playerPos = new Point(this.player.playerBase.position)
            let enemyPos = new Point(this.enemyBase.position)
            if (this.pythagorean(playerPos, enemyPos) > 100) {
                this.move()
            } else {
                this.stop()
            }

            for (let i = this.bulletArray.length - 1; i >= 0; i--) {
                this.bulletArray[i].update()
                if (this.bulletArray[i].itemHitTest() || this.outOfBounds(this.bulletArray[i].bulletShape, clientHeight, clientWidth)) {
                    this.bulletArray[i].bulletShape.remove()
                    this.bulletArray.splice(i, 1)
                }
            }
        } else {
            this.death()
            return
        }
    }
}
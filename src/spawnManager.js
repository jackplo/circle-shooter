import { Enemy } from "./enemy.js"

export class spawnManager {
    constructor(xMax, yMax, player) {
        this.xMax = xMax
        this.yMax = yMax
        this.player = player
        this.enemyArray = []
    }

    spawn() {
        let randomX = Math.floor(Math.random() * (this.xMax + 1))
        let randomY = Math.floor(Math.random() * (this.yMax + 1))

        this.enemyArray.push(new Enemy(randomX, randomY, "red", this.player))
    }
}
import { Player } from "./player.js"
import { Enemy  } from "./enemy.js"

window.onload = function() {
    var canvas = document.getElementById("canvas");
    paper.install(window);
    paper.setup(canvas);
    
    var xMax = canvas.clientWidth;
    var yMax = canvas.clientHeight;
    
    var centerPoint = new Point(xMax/2, yMax/2)
    
    var userChar = new Player(centerPoint.x, centerPoint.y, "blue", "good")
    var enemy = new Enemy(centerPoint.x, centerPoint.y, "red", userChar)

    setInterval(() => {
        enemy.shoot1()
    }, 2000)
    
    view.onMouseMove = function(event) { 
        userChar.rotate(event.point)
        userChar.lookDir()
    }

    view.onKeyDown = function(event) {
        if (event.key === 'w') {
            userChar.accelerate(1)
        } 
        if (event.key === 's') {
            userChar.decelerate(-1)
        } 
    }

    
    view.onKeyUp = function(event) {
        if (event.key === "space") {
            userChar.shoot()
        }
    } 
    
    view.onFrame = function() {
        enemy.update(xMax, yMax)
        userChar.update(yMax, xMax)
    }
}
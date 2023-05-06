import { Player } from "./game.js";
window.onload = function () {
    var canvas = document.getElementById("canvas");
    paper.install(window);
    paper.setup(canvas);
    var xMax = canvas.clientWidth;
    var yMax = canvas.clientHeight;
    var centerPoint = new Point(xMax / 2, yMax / 2);
    var userChar = new Player(centerPoint.x, centerPoint.y, "blue", "good");
    view.onMouseMove = function (event) {
        userChar.rotate(event.point);
        userChar.lookDir();
    };
    view.onKeyDown = function (event) {
        if (event.key === 'w') {
            userChar.accelerate(1);
        }
        else if (event.key === 's') {
            userChar.decelerate(-1);
        }
    };
    view.onFrame = function () {
        userChar.update();
    };
};

const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js")
const Game = require("./game.js")
const GameView = require("./game_view.js")

window.MovingObject = MovingObject;
window.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext("2d")

    let canvasView = new GameView(new Game(), ctx)
    canvasView.start();
})

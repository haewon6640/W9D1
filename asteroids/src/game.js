const Asteroid = require("./asteroid"); 
const Ship = require("./ship");

function Game() {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 4;
    this.asteroids = [];
    this.addAsteroids()
    this.ship = new Ship({pos: this.randomPosition(), game: this})
}

Game.prototype.allObjects = function() {
    let arr = this.asteroids.concat([this.ship]);
    return arr
}

Game.prototype.addAsteroids = function() {
    for(let i = 0; i < this.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
    }
}

Game.prototype.randomPosition = function() {
    return [Math.floor(Math.random()*this.DIM_X),Math.floor(Math.random()*this.DIM_Y)]
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);
    this.allObjects().forEach( (obj) => {
        obj.draw(ctx);
    })
}

Game.prototype.moveObjects = function() {
    this.checkCollisions();
    this.allObjects().forEach( (obj) => {
        obj.move()
    })
}

Game.prototype.wrap = function(pos) {
    pos[0] = (pos[0]+this.DIM_X) % this.DIM_X
    pos[1] = (pos[1]+this.DIM_Y) % this.DIM_Y
    return [pos[0], pos[1]]
}

Game.prototype.checkCollisions = function() {
    for(let i = 0; i < this.allObjects().length-1; i++) {
        for (let j = i+1; j < this.allObjects().length; j++) {

            if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
                console.log("Collision!!")
                console.log(i+ "   " + j)
                // this.remove(Math.max(i,j));
                // this.remove(Math.min(i,j));
                i++;
            }
        }
    }

}

Game.prototype.remove = function (index) {
    this.asteroids.splice(index,1);
    // let i = 0;
    // while (i < this.asteroids.length) {
    //     if (Object.is(this.asteroids[i],asteroid)) {
    //         this.asteroids = this.asteroids.splice(i,1)
    //     } else {
    //         i++;
    //     }
    // }
}

module.exports = Game;

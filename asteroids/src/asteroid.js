const MovingObject = require("./moving_object");
const Util = require("./util");
const Ship = require("./ship")

function Asteroid(options) {
    this.pos = options['pos'];
    this.COLOR = "brown";
    this.RADIUS = 20;
    options = {pos: this.pos , color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(5), game: options['game']}
    MovingObject.call(this,options);
}
Util.inherits(Asteroid,MovingObject);
Asteroid.prototype.isCollidedWith = function(otherObject) {
    MovingObject.prototype.isCollidedWith.call(this);
    let x_dis = Math.abs(this.pos[0] - otherObject.pos[0])
    let y_dis = Math.abs(this.pos[1] - otherObject.pos[1])
    let dis = Math.sqrt(x_dis ** 2 + y_dis ** 2)
    if ((this.radius + otherObject.radius) > dis) {
        if (otherObject instanceof Ship ) {
            otherObject.relocate();
        }
        return true;
    }
    
    return false;
}

module.exports = Asteroid;



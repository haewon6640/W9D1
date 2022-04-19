const MovingObject = require("./moving_object");
const Util = require("./util");

function Ship(options) {
    this.RADIUS = 30;
    this.COLOR = "yellow";
    options['radius'] = this.RADIUS;
    options['color'] = this.COLOR;
    options['vel'] = [0,0]
    MovingObject.call(this,options);
}
Util.inherits(Ship, MovingObject)

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}


module.exports = Ship;
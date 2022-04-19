/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\")\n\nfunction Asteroid(options) {\n    this.pos = options['pos'];\n    this.COLOR = \"brown\";\n    this.RADIUS = 20;\n    options = {pos: this.pos , color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(5), game: options['game']}\n    MovingObject.call(this,options);\n}\nUtil.inherits(Asteroid,MovingObject);\nAsteroid.prototype.isCollidedWith = function(otherObject) {\n    MovingObject.prototype.isCollidedWith.call(this);\n    let x_dis = Math.abs(this.pos[0] - otherObject.pos[0])\n    let y_dis = Math.abs(this.pos[1] - otherObject.pos[1])\n    let dis = Math.sqrt(x_dis ** 2 + y_dis ** 2)\n    if ((this.radius + otherObject.radius) > dis) {\n        if (otherObject instanceof Ship ) {\n            otherObject.relocate();\n        }\n        return true;\n    }\n    \n    return false;\n}\n\nmodule.exports = Asteroid;\n\n\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\"); \nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game() {\n    this.DIM_X = 500;\n    this.DIM_Y = 500;\n    this.NUM_ASTEROIDS = 4;\n    this.asteroids = [];\n    this.addAsteroids()\n    this.ship = new Ship({pos: this.randomPosition(), game: this})\n}\n\nGame.prototype.allObjects = function() {\n    let arr = this.asteroids.concat([this.ship]);\n    return arr\n}\n\nGame.prototype.addAsteroids = function() {\n    for(let i = 0; i < this.NUM_ASTEROIDS; i++) {\n        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));\n    }\n}\n\nGame.prototype.randomPosition = function() {\n    return [Math.floor(Math.random()*this.DIM_X),Math.floor(Math.random()*this.DIM_Y)]\n}\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);\n    this.allObjects().forEach( (obj) => {\n        obj.draw(ctx);\n    })\n}\n\nGame.prototype.moveObjects = function() {\n    this.checkCollisions();\n    this.allObjects().forEach( (obj) => {\n        obj.move()\n    })\n}\n\nGame.prototype.wrap = function(pos) {\n    pos[0] = (pos[0]+this.DIM_X) % this.DIM_X\n    pos[1] = (pos[1]+this.DIM_Y) % this.DIM_Y\n    return [pos[0], pos[1]]\n}\n\nGame.prototype.checkCollisions = function() {\n    for(let i = 0; i < this.allObjects().length-1; i++) {\n        for (let j = i+1; j < this.allObjects().length; j++) {\n\n            if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {\n                console.log(\"Collision!!\")\n                console.log(i+ \"   \" + j)\n                // this.remove(Math.max(i,j));\n                // this.remove(Math.min(i,j));\n                i++;\n            }\n        }\n    }\n\n}\n\nGame.prototype.remove = function (index) {\n    this.asteroids.splice(index,1);\n    // let i = 0;\n    // while (i < this.asteroids.length) {\n    //     if (Object.is(this.asteroids[i],asteroid)) {\n    //         this.asteroids = this.asteroids.splice(i,1)\n    //     } else {\n    //         i++;\n    //     }\n    // }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n}\n\nGameView.prototype.start = function() {\n    setInterval(() => {\n        this.game.moveObjects();\n        this.game.draw(this.ctx);\n    },20)\n}\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\")\n\nwindow.MovingObject = MovingObject;\nwindow.addEventListener(\"DOMContentLoaded\", (event) => {\n    let canvas = document.getElementById('game-canvas');\n    let ctx = canvas.getContext(\"2d\")\n\n    let canvasView = new GameView(new Game(), ctx)\n    canvasView.start();\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject(options) {\n    this.pos = options['pos'];\n    this.vel = options['vel'];\n    this.radius = options['radius'];\n    this.color = options['color'];\n    this.game = options['game'];\n}\n\nMovingObject.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI); \n    ctx.fill(); \n}\n\nMovingObject.prototype.move = function() {\n    this.pos = [this.pos[0]+this.vel[0], this.pos[1]+this.vel[1]]\n    this.pos = this.game.wrap(this.pos)\n}\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n    // let x_dis = Math.abs(this.pos[0] - otherObject.pos[0])\n    // let y_dis = Math.abs(this.pos[1] - otherObject.pos[1])\n    // let dis = Math.sqrt(x_dis ** 2 + y_dis ** 2)\n    // if ((this.radius + otherObject.radius) > dis) {\n    //     return true;\n    // }\n    // return false;\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Ship(options) {\n    this.RADIUS = 30;\n    this.COLOR = \"yellow\";\n    options['radius'] = this.RADIUS;\n    options['color'] = this.COLOR;\n    options['vel'] = [0,0]\n    MovingObject.call(this,options);\n}\nUtil.inherits(Ship, MovingObject)\n\nShip.prototype.relocate = function() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n}\n\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n    inherits(childClass,parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    }\n    \n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
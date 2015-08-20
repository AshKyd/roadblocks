var Game = require('./game');
var canvas = document.querySelector('canvas');
var levels = require('./levels');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var level = levels[0];

var thisGame = new Game({
    tileSize: (canvas.width - 30)/level.w,
    w: level.w,
    h: level.h,
    canvas: canvas,
    base: level.base,
    predef: level.predef,
    seed: level.seed,
    dist: level.dist,
    queue:5
});

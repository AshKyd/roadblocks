var Game = require('./game');
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var thisGame = new Game({
    tileSize: 128,
    w: 16,
    h: 16,
    canvas: canvas
});

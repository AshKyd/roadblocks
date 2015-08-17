var Stats = require('./stats');
var drawCube = require('./drawCube');

var round = Math.round;

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getPixelPos(x, y, tileWidth){
    return [
        (x / (tileWidth/2) + y / (tileWidth/4)) /2,
        (y / (tileWidth/4) -(x / (tileWidth/2))) /2
    ];
}

function Game(opts){
    var viewport = [0, 0];
    var canvas = opts.canvas;
    var ctx = canvas.getContext('2d');

    var tileSize = opts.tileSize;

    /**
     * An array containing everything we're going to render next round.
     * @type {Array}
     */
    var renderQueue = [];
    var worker = new Worker('/worker.js');
    worker.onmessage = function(message){
        renderQueue = message.data;
    };
    worker.p = worker.postMessage;
    function updateViewport(){
        worker.p([
            'setViewport',
            [viewport[0], viewport[1], canvas.width, canvas.height]
        ]);
    }

    updateViewport();
    worker.postMessage([
        'init',
        {
            w:opts.w,
            h:opts.h,
            t: tileSize
        }
    ]);

    var stats = new Stats();

    canvas.a = canvas.addEventListener;
    var lastTouch = false;
    var moves;
    canvas.a('touchstart', function(e){
        e.preventDefault();

        // FIXME: I suspect this doesn't work on iOS.
        lastTouch = e.touches;
        moves = 0;
    }, true);

    canvas.a('touchmove', function(e){
        e.preventDefault();
        moves++;
        if(e.touches.length === 1){
            // Pan the map
            viewport[0] += (e.touches[0].clientX - lastTouch[0].clientX);
            viewport[1] += (e.touches[0].clientY - lastTouch[0].clientY);
            updateViewport();
        // } else if(e.touches.length === 2){
        //     zoom += (
        //         (e.touches[1].clientX + e.touches[1].clientY) -
        //         (lastTouch[1].clientX + lastTouch[1].clientX)
        //     ) / 100;
        //     console.log(zoom);
        }
        lastTouch = e.touches;
    }, true);

    canvas.a('touchend', function(e){
        if(moves < 5){
            var pos = getPixelPos(lastTouch[0].clientX - viewport[0], lastTouch[0].clientY - viewport[1], tileSize);
            worker.p([
                'setTile',
                [
                    Math.ceil(pos[0]),
                    Math.ceil(pos[1]),
                    'test'
                ]
            ]);
        }
    },true);

    function drawMapSingle(current){
        // ctx.translate(current.o[0], current.o[1]);
        drawCube(
            ctx,
            current.x,
            current.y,
            current.l[0],
            current.l[1],
            current.l[2],
            current.l[3],
            current.l[4]
        );
        // ctx.translate(0-current.o[0], 0-current.o[1]);
    }

    /**
     * Draw the entire map, including all layers & sprites.
     */
    function drawMap(){
        stats.begin();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(viewport[0], viewport[1]);

        renderQueue.forEach(drawMapSingle);

        ctx.translate(0-viewport[0], 0-viewport[1]);
        stats.end();
        requestAnimationFrame(drawMap);
    }
    drawMap();
}

module.exports = Game;

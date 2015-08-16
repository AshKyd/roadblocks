var Stats = require('./stats');
var drawCube = require('./drawCube');
var SpriteLib = require('./sprites.js');
var sprites = SpriteLib.sprites;

var round = Math.round;

function crawlMap(map, w, h, fn){
    var returnVal, x, y;
    for(x=0; x<w; x++){
        if(!map[x]){
            map[x] = [];
        }
        for(y=0; y<h; y++){
            returnVal = fn(x, y, map[x][y]);
            if(returnVal){
                map[x][y] = returnVal;
            }
        }
    }
    return map;
}

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getIsometricPos(x, y, tileWidth){
    return [
        (x - y) * (tileWidth / 2),
        (x + y) * (tileWidth / 4)
    ];
}

function getPixelPos(x, y, tileWidth){
    return [
        (x / (tileWidth/2) + y / (tileWidth/4)) /2,
        (y / (tileWidth/4) -(x / (tileWidth/2))) /2
    ]
}

function Game(opts){
    var canvas = opts.canvas;
    var ctx = canvas.getContext('2d');
    var tileSize = opts.tileSize;
    var tileHalf = tileSize / 2;
    var tileDepth = tileSize / 10;

    var viewport = [0, 0];
    var zoom = 0;

    var stats = new Stats();

    var map = crawlMap([], opts.w, opts.h, function(){
        return 'grass';
    });
    map[2][2] = 'test';
    map[2][1] = 'test2';
    map[2][3] = 'water';
    map[2][4] = 'water';
    map[1][3] = 'water';
    map[1][4] = 'water';
    map[0][4] = 'forest';
    map[0][3] = 'forest';
    map[0][2] = 'forest';

    map[3] = map[3].map(function(){
        return 'roady';
    });

    map[4][0] = 'roadx';
    map[3][0] = 'roadxy';
    map[5][0] = 'roadx2yl';
    map[5][1] = 'roady';
    map[5][2] = 'roadx2yr';
    map[4][2] = 'roady2xl';
    map[4][3] = 'roady2xr';

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
            map[Math.ceil(pos[0])][Math.ceil(pos[1])] = 'test';
        }
    },true);
    /**
     * Current drawing position. Global so we can recycle & share between fns.
     */
    var currentDrawPos;

    /**
     * Draw a single item at currentDrawPos
     * @param  {Array} layer Array layer containing params to draw
     */
    function drawItem(layer){
        var layerPos = getIsometricPos(layer[1], layer[2], tileSize);
        drawCube(
            ctx,
            currentDrawPos[0] - layerPos[0],
            currentDrawPos[1] - layerPos[1] - layer[0]*tileHalf,
            layer[3]*tileHalf,
            layer[4]*tileHalf,
            layer[5]*tileHalf,
            layer[6],
            layer[7]
        );
    }

    /**
     * Draw a layer at currentDrawPos
     * @param  {Array} layer Array layer containing params to draw
     */
    function drawLayer(layer){
        if(layer.length === 4){
            var layerPos = getIsometricPos(layer[2], layer[3], tileSize);
            ctx.translate(0 - layerPos[0] - layer[1], 0 - layerPos[1]);
            sprites[layer[0]].forEach(drawItem);
            ctx.translate(layerPos[0], layerPos[1]);

        } else {
            drawItem(layer);
        }
    }

    /**
     * Draw the entire map, including all layers & sprites.
     */
    function drawMap(){
        stats.begin();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(viewport[0], viewport[1]);
        crawlMap(map, opts.w, opts.h, function(x, y, tile){
            currentDrawPos = getIsometricPos(x, y, tileSize);

            // Don't render if we're not on-screen
            if(
                currentDrawPos[1] < 0 - viewport[1] - tileHalf ||
                currentDrawPos[0] < 0 - viewport[0] - tileHalf ||
                currentDrawPos[1] > 0 - viewport[1] + canvas.height + tileHalf ||
                currentDrawPos[0] > 0 - viewport[0] + canvas.width + tileHalf

            ){
                return;
            }
            sprites[tile].forEach(drawLayer);
        });
        ctx.translate(0-viewport[0], 0-viewport[1]);
        stats.end();
        setTimeout(drawMap,50)
        // requestAnimationFrame(drawMap);
    }

    drawMap();
}

module.exports = Game;

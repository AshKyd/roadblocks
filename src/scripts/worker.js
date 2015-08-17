var SpriteLib = require('./sprites.js');
var sprites = SpriteLib.sprites;

var renderQueue;
var viewport;
var operating;
var map;
var w;
var h;
var tileSize;
var tileHalf;
var tileDepth;

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

/**
 * Convert a tile xy into a pixel xy.
 */
function getIsometricPos(x, y, tileWidth){
    return [
        (x - y) * (tileWidth / 2),
        (x + y) * (tileWidth / 4)
    ];
}


/**
 * Draw a layer at currentDrawPos
 * @param  {Array} layer Array layer containing params to draw
 */
function buildRenderLayer(layer, offset){
    if(layer.length === 4){
        var layerPos = getIsometricPos(layer[2], layer[3], tileSize);
        sprites[layer[0]].forEach(function(sprite){
            buildRenderLayer(sprite, [0 - layerPos[0] - layer[1], 0 - layerPos[1]]);
        });
    } else {
        var layerPos = getIsometricPos(layer[1], layer[2], tileSize);
        var x = currentDrawPos[0] - layerPos[0] + (offset[0] || 0);
        var y = currentDrawPos[1] - layerPos[1] - layer[0]*tileHalf + (offset[1] || 0);

        var computedLayer = layer.slice(3);
        for(var i=0; i<3; i++){
            computedLayer[i] *= tileHalf
        }
        renderQueue.push({
            x:x,
            y: y,
            l: computedLayer
        });
    }
}

function buildRenderQueue(){
    console.time('buildRenderQueue');
    var oldRenderQueue = renderQueue;
    renderQueue = [];
    crawlMap(map, w, h, function(x, y, tile){
        currentDrawPos = getIsometricPos(x, y, tileSize);

        // Don't render if we're not on-screen
        if(
            currentDrawPos[1] < 0 - viewport[1] - tileSize ||
            currentDrawPos[0] < 0 - viewport[0] - tileSize ||
            currentDrawPos[1] > 0 - viewport[1] + viewport[4] + tileSize ||
            currentDrawPos[0] > 0 - viewport[0] + viewport[3] + tileSize*2.5

        ){
            return;
        }
        sprites[tile].forEach(buildRenderLayer);
    });

    if(operating){
        if(JSON.stringify(oldRenderQueue) !== JSON.stringify(renderQueue)){
            console.log('changed');
            postMessage(renderQueue);
        }
        setTimeout(buildRenderQueue,100);
    }
    console.timeEnd('buildRenderQueue');
}

var actions = {
    init: function(opts){
        w = opts.w;
        h = opts.h;
        tileSize = opts.t;
        tileHalf = tileSize / 2;
        tileDepth = tileSize / 10;

        map = crawlMap([], w, h, function(){
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

        operating = true;

        buildRenderQueue();

    },
    setTile: function(opts){
        map[opts[0]][opts[1]] = opts[2];
    },
    setViewport: function(opts){
        viewport = opts;
    }
};

addEventListener('message', function(e) {
    actions[e.data[0]](e.data[1]);
}, false);

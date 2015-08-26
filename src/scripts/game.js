var Stats = require('./stats');
var drawCube = require('./drawCube');
var SpriteLib = require('./sprites.js');
var sprites = SpriteLib.sprites;
var tileLogic = SpriteLib.tileLogic;
var firstruns = {};
var playSound = require('./sfx');
var jsonStringify = JSON.stringify;
var random = require('./random');
var touchList = require('./touchlist');
var jsonStringify = JSON.stringify;

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

/**
 * Get the position (in pixels) from an isometric tile x,y
 */
function getIsometricPos(x, y, tileWidth){
    return [
        (x - y) * (tileWidth / 2),
        (x + y) * (tileWidth / 4)
    ];
}

/**
 * Get the position (in isometric coordinates) from a pixel x,y
 */
function getPixelPos(x, y, tileWidth){
    return [
        (x / (tileWidth/2) + y / (tileWidth/4)) /2,
        (y / (tileWidth/4) -(x / (tileWidth/2))) /2
    ];
}

function Game(opts){
    var _this = this;
    var canvas = opts.canvas;
    var ctx = canvas.getContext('2d');
    var running = true;

    // Spacing amount used in the interface.
    var spacing = 15;

    var trafficPath = [];

    // Tile size helpers
    var tileSize = opts.tileSize;
    var tileHalf = tileSize / 2;
    var tileDepth = tileSize / 10;

    // Display offset. Compensates for big fat fingers when touching.
    var displayOffset;

    // Cache of rendered sprites
    var spriteCache = {};

    // Current viewport. Default to center the map
    var mapHeight = opts.h*tileHalf/4;
    var viewport = [canvas.width/2, (canvas.height/2-mapHeight)];
    var renderChrome = 1;

    //Current drawing position. Global so we can recycle & share between fns.
    var currentCtx;

    // Stats object tracks performance. Remove for production.
    var stats = new Stats();

    // DEBUG: show the path on the map.
    var debugPath;

    // Create a predetermined buffer of tiles.
    var tileStack = [];
    var heliStack = [];
    var possibleTiles = SpriteLib.placeable;

    // equivalent of date.now
    var now = Date.now();

    // Keep track of fps
    var time = 0;

    // Load up the tile queue & pre-cache all our tiles.
    if(opts.dist){
        tileStack = opts.dist.map(function(tile){
            cacheSprite(possibleTiles[tile], undefined, opts.seed++);
            return possibleTiles[tile];
        });
    } else {
        for(var i=0; i<opts.w*opts.h*2; i++){
            var thisTile = possibleTiles[round(random(opts.seed++)*(possibleTiles.length-1))];
            tileStack.push(thisTile);
            cacheSprite(thisTile, undefined, opts.seed++);
        }
    }

    // Cache some stuff we know we're going to use.
    ['ok','notok'].map(function(thisTile){
        cacheSprite(thisTile);
    });

    // Bounds for latest selectable tile.
    var tileQueueBounds = getTileQueuePos(0);

    // Crete map
    var map = crawlMap([], opts.w, opts.h, function(){
        return opts.base;
    });

    // Create a graph of overrides so we can mess with tiles.
    var mapOverrides = crawlMap([], opts.w, opts.h, function(){
        return false;
    });

    // Fill in any predefined tiles in this level.
    opts.predef.forEach(function(theseOpts){
        map[theseOpts[0]][theseOpts[1]] = theseOpts[2];
    });

    // Add listeners.
    var lastTouch = false;
    var moves;
    var longPress;
    var selectedTile;
    var lastHoveredTileCoords;
    var lastHoveredTileType;
    var lastHoveredTilePos;
    var tileSelectType;
    var isTouching;
    var touchStartSpot;

    function touchstart(e){
        touchStartTime = now;
        e.preventDefault();
        var touch = touchList(e);
        isTouching=1;

        if(touch.is){ // If this is a touch event
            displayOffset = 40;
        } else {
            displayOffset = 0;
        }
        lastTouch = touch;
        touchStartSpot = touch.clientX + touch.clientY;

        // Check if we're dragging the last tile off the queue.
        if(
            touch.clientY < tileSize &&
            touch.clientX > tileQueueBounds &&
            touch.clientX < tileQueueBounds + tileSize
        ){
            selectedTile = tileStack[0];
            playSound('select');
            tileSelectType = 0;
        }

        moves = 0;
        lastHoveredTileCoords = getPixelPosFromTouch(touch);
        lastHoveredTileType = getTileFromTouch(touch);
        lastHoveredTilePos = getIsometricPos(lastHoveredTileCoords[0], lastHoveredTileCoords[1], tileSize);

        // Do this before we do our fat finger munging.
        if(getTileFromTouch(touch, 0) === 'helipad'){
            console.log('helipad');
            selectedTile = heliStack[heliStack.length-1];
            playSound('select');
            tileSelectType = 1;
        }

        if(!selectedTile){
            longPress = setTimeout(function(){
                var touchCurrentSpot = touch.clientX + touch.clientY;
                if(moves < 10 && opts.bulldozers-- > 0 && touchCurrentSpot-15 < touchStartSpot && touchCurrentSpot+15 > touchStartSpot){
                    displayOffset = 0;
                    var tile = getPixelPosFromTouch(touch);
                    if(!opts.predef.filter(function(item){
                        if(tile[0] === item[0] && tile[1] === item[1]){
                            return true;
                        }
                    }).length){
                        playSound('boom');
                        setTileFromTouch(touch, opts.base);
                        document.body.className = 'rumble';
                        setTimeout(function(){
                            document.body.className = '';
                        }, 500);
                    }
                }
            }, 400);
        }

    }

    function touchmove(e){
        if(!isTouching){
            return;
        }
        e.preventDefault();
        moves++;
        var touch = touchList(e);
        if(!selectedTile){
            // Pan the map
            viewport[0] += (touch.clientX - lastTouch.clientX);
            viewport[1] += (touch.clientY - lastTouch.clientY);
        }
        lastTouch = touch;
        lastHoveredTileCoords = getPixelPosFromTouch(touch);
        lastHoveredTileType = getTileFromTouch(touch);
        lastHoveredTilePos = getIsometricPos(lastHoveredTileCoords[0], lastHoveredTileCoords[1], tileSize);
    }

    function touchend(e){
        isTouching=0;
        clearTimeout(longPress);
        if(selectedTile){
            if(lastHoveredTileType === 'helipad'){
                heliStack.push(selectedTile);
                tileStack.shift();
                playSound('place');
            } else if(canPlaceTileHere(selectedTile, lastHoveredTileCoords)) {
                if(sprites[selectedTile+'-base']){
                    selectedTile = selectedTile+'-base';
                    console.log('replaced with base tile');
                }
                try{
                    setTileFromTouch(lastTouch, selectedTile);
                    playSound('place');
                    // 0 = tileStack, 1 = heliStack.
                    if(tileSelectType === 0){
                        tileStack.shift();
                    } else {
                        heliStack.pop();
                    }
                    tileSelectType = 0;
                } catch(err){}
            } else {
                playSound('error');
                playSound('error',0.15);
            }

            // Calculate win state and optionally show help dialog.
            calculateWinState();
            nextTile = tileLogic[tileStack[0]];
            if(nextTile && nextTile.firstrun && !firstruns[tileStack[0]]){
                showTooltip(nextTile.firstrun, nextTile.title, tileStack[[0]]);
                firstruns[tileStack[0]] = true;
            }
        }
        selectedTile = false;
    }

    var events = [
        ['touchstart', touchstart],
        ['touchmove', touchmove],
        ['touchend', touchend],
        ['mousedown', touchstart],
        ['mousemove', touchmove],
        ['mouseup', touchend],
    ];
    events.forEach(function(event){
        canvas.addEventListener(event[0], event[1], true);
    });

    /**
     * Can we place the selected tile here?
     * @param  {String} placingThis Type of tile to place.
     * @param  {Array} coords      Coordinates of the tile we want to place on.
     * @return {Boolean}
     */
    function canPlaceTileHere(placingThis, coords){
        // Strict mode only lets you place tiles to continue the current road.
        if(opts.strict && placingThis.indexOf('road') === 0){
            // This will throw when attempting to access out of bounds tiles.
            try{
                var oldTile = map[coords[0]][coords[1]];
                var oldRoute = getCalculatedTrafficPath();
                map[coords[0]][coords[1]] = placingThis;
                var newRoute = getCalculatedTrafficPath();
                map[coords[0]][coords[1]] = oldTile;
                if(newRoute.win){
                    return true;
                }
                if(oldRoute.lose.length === newRoute.lose.length){
                    return false;
                }
            }catch(e){
                return false;
            }
        }
        for(var i=0;i<2; i++){
            if(jsonStringify(coords) === jsonStringify(opts.predef[i].slice(0,2))){
                return false;
            }
        }
        if(map[coords[0]]){
            return tileLogic[placingThis].p(map[coords[0]][coords[1]]);
        }
    }
    function getPixelPosFromTouch(touch, includeOffset){
        var pp = getPixelPos(touch.clientX - viewport[0], touch.clientY - viewport[1] - (includeOffset!==0 ? displayOffset : 0), tileSize);
        return [Math.ceil(pp[0]), Math.ceil(pp[1])];
    }
    function getTileFromTouch(touch, includeOffset){
        var pos = getPixelPosFromTouch(touch, includeOffset);
        try{
            return map[pos[0]][pos[1]];
        } catch(ex){
        }
    }
    function setTileFromTouch(touch, val){
        var pos = getPixelPosFromTouch(touch);

        try{
            map[pos[0]][pos[1]] = val;
        } catch(ex){
        }
    }

    /**
     * Show/hide the tooltip over the top of the game.
     */
    function showTooltip(message, title, tile){
        var tooltip = opts.tooltip;
        title = title ? '<h1>'+title+'</h1>' : '';
        tile = tile ? '<img class="rubberBand" src="'+spriteCache[tile].c.toDataURL()+'">' : '';
        tooltip.innerHTML = '<a class="close"></a> '+title+message+tile;
        tooltip.style.display = 'block';
        tooltip.setAttribute('class', 'visible');
        tooltip.onclick = function(){
            tooltip.setAttribute('class', '');
            playSound('select');
            setTimeout(function(){
                tooltip.style.display = 'none';
            },1200);
        };
        setTimeout(function(){
            playSound('dialog');
        },10);
    }
    _this.showTooltip = showTooltip;

    _this.destroy = function(){
        // Stop the boats
        running = false;

        // tear down the infrastructure.
        events.forEach(function(event){
            canvas.removeEventListener(event[0], event[1], true);
        });
    };

    /**
     * Take screenshot
     */
    this.ss = function(){
        renderChrome = 0;
        drawMap();
        var a = document.createElement('a');
        a.setAttribute('download', 'screenshot.png');
        a.href = canvas.toDataURL('image/png');
        a.click();
        renderChrome = 1;
        drawMap();
    };

    function calculatePoints(here){

    }

    // A handy dandy array that maps tiles to one another. See also sprites.js
    var trafficDirections = [
        [0,[-1,0]], // go south
        [1,[0,-1]], // go north
        [2,[1,0]], // go east
        [3,[0,1]], // go south
    ];

    function calculateTrafficPath(here, there, lastMove, path){
        // Init our route.
        if(!path){
            path = [here];
        }

        // If we've reached our destination, do nothing more.
        if(
            here[0] === there[0] &&
            here[1] === there[1]
        ){
            return {
                win: path
            };
        }

        // Get our current tile details to compare against.
        var thisTile = map[here[0]][here[1]];
        var thisTileSpec = tileLogic[thisTile];
        var oppositeThisMovement = lastMove[0] > 1 ? 0 - 2 + lastMove[0] : lastMove[0] + 2;
        var nextMovement;

        // If we can go straight ahead, go for it.
        if(thisTileSpec.c[lastMove[0]]){
            nextMovement = lastMove;
        } else {
            // Otherwise pick the next direction we can.
            var possibleMovements = trafficDirections.filter(function(option){
                if(thisTileSpec.c[option[0]] && option[0] !== oppositeThisMovement){
                    return true;
                }
            });

            // If there are other possibilities, use them.
            if(possibleMovements.length){
                nextMovement = possibleMovements[0];
            } else {
                return {lose:path};
            }
        }


        // If it does connect, pick the next tile it connects to.
        // Try is slow, but this runs infrequently.
        var nextTile, nextTileSpec;
        var nextCoords = [
            here[0] + nextMovement[1][0],
            here[1] + nextMovement[1][1]
        ];
        try{
            nextTile = map[nextCoords[0]][nextCoords[1]];
            nextTileSpec = tileLogic[nextTile];
        } catch(ex) {
            return {lose:path};
        }


        // and see if it connects back to this tile.
        var oppositeNextMovement = nextMovement[0] > 1 ? 0 - 2 + nextMovement[0] : nextMovement[0] + 2;
        if(nextTileSpec && nextTileSpec.c && nextTileSpec.c[oppositeNextMovement]){
            path.push(nextCoords);
            return calculateTrafficPath(nextCoords, there, nextMovement, path);
        } else {
            return {lose:path};
        }
    }

    // Convenience method
    function getCalculatedTrafficPath(){
        return calculateTrafficPath(opts.predef[0], opts.predef[1], trafficDirections[1]);
    }

    /**
     * Calculate the win state.
     */
    function calculateWinState(){
        var result = getCalculatedTrafficPath();
        debugPath = result.win || result.lose;
        if(result && result.win){
            var sinPath = function(layer, tick){
                if(tick > this.start && tick < this.end){
                    layer[1] += 0-(Math.sin((tick-this.start)/125))*20;
                }
            };
            result.win.forEach(function(coords, i){
                setTimeout(function(){
                    playSound('ping');
                }, i*100);
                mapOverrides[coords[0]][coords[1]] = {
                    fn: sinPath,
                    start: i*100 + now,
                    end: i*100 + now + 350,
                };
            });
            playSound('win', result.win.length/10+0.1);
            playSound('win', result.win.length/10+0.2);
            setTimeout(function(){
                if(opts.onwin){
                    opts.onwin.call(_this);
                }
            },result.win.length*100+2000);
        } else {
            var full = true;

            // If tileStack is empty, we lose.
            // Otherwise check if the map is full; if it is, we lose.
            if(tileStack.length !== 0){
                crawlMap(map, opts.w, opts.h, function(x,y,tile){
                    if(tile === opts.base){
                        full = false;
                    }
                });
            }
            if(full){
                if(opts.onlose){
                    opts.onlose.call(_this);
                }
            }
        }
    }

    /**
     * Draw a single item at currentDrawPos
     * @param  {Array} layer Array layer containing params to draw
     */
    function drawItem(layer, pos){
        if(typeof layer === 'function'){
            layer = layer();
        }
        var layerPos = getIsometricPos(layer[1], layer[2], tileSize);
        drawCube(
            currentCtx,
            0-layerPos[0],
            0-layerPos[1] - layer[0]*tileHalf,
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
            currentCtx.translate(0 - layerPos[0] - layer[1], 0 - layerPos[1]);
            var layers = sprites[layer[0]];
            if(typeof layers === 'function'){
                layers = layers(layerPos);
            }
            layers.forEach(drawItem);
            currentCtx.translate(layerPos[0] - layer[1], layerPos[1]);

        } else {
            drawItem(layer);
        }
    }

    function renderCanvas(tiles, seed){
        currentCtx.translate(tileSize/2, tileSize*1.5);
        if(typeof tiles === 'function'){
            tiles = tiles(seed);
        }
        tiles.forEach(drawLayer);
        currentCtx.translate(0-tileSize/2, 0-tileSize*1.5);

    }

    /**
     * Draw a single tile
     */
    function cacheSprite(tile, spriteCanvas, seed){
        if(!spriteCanvas){
            spriteCanvas = {
                c: document.createElement('canvas'),
                seed: seed
            };
            spriteCanvas.c.width = tileSize+1;
            spriteCanvas.c.height = tileSize*2;
            currentCtx = spriteCanvas.c.getContext('2d');
            spriteCanvas.x = currentCtx;
        } else {
            if(spriteCanvas.lastRender === now){
                return spriteCanvas;
            }
            currentCtx = spriteCanvas.x;
            currentCtx.clearRect(0,0,spriteCanvas.c.width, spriteCanvas.c.height);
        }
        spriteCanvas.lastRender = now;
        renderCanvas(sprites[tile], spriteCanvas.seed);
        spriteCache[tile] = spriteCanvas;
        return spriteCanvas;
    }

    function drawSprite(x, y, tile){
        var spriteCanvas = spriteCache[tile];
        var currentDrawPos = getIsometricPos(x, y, tileSize);

        // Don't render if we're not on-screen
        if(
            currentDrawPos[1] < 0 - viewport[1] - tileSize ||
            currentDrawPos[0] < 0 - viewport[0] - tileSize ||
            currentDrawPos[1] > 0 - viewport[1] + canvas.height + tileHalf ||
            currentDrawPos[0] > 0 - viewport[0] + canvas.width + tileHalf

        ){
            return;
        }

        // Cache/recache sprites before drawing
        if(!spriteCanvas){
            spriteCanvas = cacheSprite(tile);
        } else if(SpriteLib.animated[tile]){
            cacheSprite(tile, spriteCanvas);
        }

        if(mapOverrides[x][y]){
            mapOverrides[x][y].fn.call(mapOverrides[x][y], currentDrawPos, now);
        }

        // Treat water tiles differently so we can get the sweet sine wave ripple.
        // Only do this if we're over 20 fps as it's kinda slow.
        if(tile === 'water' && 1000/time > 20){
            ctx.drawImage(spriteCanvas.c, currentDrawPos[0] - tileSize/2, currentDrawPos[1] - tileSize*1.5 - Math.sin(x+y+now/200)*2 );
        } else {
            ctx.drawImage(spriteCanvas.c, currentDrawPos[0] - tileSize/2, currentDrawPos[1] - tileSize*1.5);
        }

        if(tile === 'helipad'){
            drawHeliStack(currentDrawPos);
        }
    }

    function getTileQueuePos(i){
        return 0 - tileHalf/2 + (opts.queue - i - 1)*(tileHalf+spacing);
    }

    var tileQueueCanvas = document.createElement('canvas');
    tileQueueCanvas.width = getTileQueuePos(0) + tileSize;
    tileQueueCanvas.height = tileHalf+2;
    var tileQueueContext = tileQueueCanvas.getContext('2d');

    function drawTileQueue(){
        if(!renderChrome){
            return;
        }
        for(var i=1; i>-1; i--){
            tileQueueContext.fillStyle = i === 0 ? '#55bbff' : '#fff';
            tileQueueContext.fillRect(
                0+i,
                1 - i,
                round(getTileQueuePos(0) + tileSize /2 + 10),
                round(tileHalf + i*2)
            );
        }


        for(i=0; i<opts.queue; i++){
            var tile = tileStack[i];
            if(typeof tile === 'undefined'){
                continue;
            }
            // Don't render the last one if we're moving it.
            if(isTouching && selectedTile && tileSelectType === 0 && i === 0){
            } else {
                tileQueueContext.drawImage(
                    spriteCache[tile].c, // cacned canvas tile
                    getTileQueuePos(i), // x
                    0-tileHalf*0.75, //y
                    tileHalf, // w
                    tileSize //h
                );
            }
        }
        tileQueueContext.globalAlpha = 0.5;
        tileQueueContext.fillStyle = '#fff';
        tileQueueContext.fillRect(0,1,getTileQueuePos(0)-tileHalf/2, tileHalf-1);
        tileQueueContext.globalAlpha = 1;
        ctx.drawImage(tileQueueCanvas,0,10);
    }

    function drawHeliStack(pos){
        heliStack.forEach(function(tile, i){
            // Don't draw the last tile if we're currently dragging it.
            // This is too hard to do with array manipulation in touch events.
            if(tileSelectType === 1 && i === heliStack.length-1){

            } else{
                ctx.drawImage(
                    spriteCache[tile].c,
                    pos[0] - tileSize/2,
                    pos[1] - tileSize * 1.5 - tileHalf/10*(i+1)
                );
            }
        });
    }

    /**
     * Draw the entire map, including all layers & sprites.
     */
    function drawMap(keepRendering){
        if(!running){
            return;
        }
        time = (time * 0.9 + (Date.now() - now) * 0.1);
        now = Date.now();
        stats.begin();
        ctx.fillStyle = '#191F27';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.translate(viewport[0], viewport[1]);
        crawlMap(map, opts.w, opts.h, drawSprite);
        ctx.translate(0-viewport[0], 0-viewport[1]);
        drawTileQueue();
        if(selectedTile && isTouching){
            ctx.drawImage(
                spriteCache[selectedTile].c, // cached canvas tile
                lastTouch.clientX - tileSize/2, // x
                lastTouch.clientY - tileSize*1.25  - displayOffset
            );

            if(lastHoveredTilePos && map[lastHoveredTileCoords[0]] && map[lastHoveredTileCoords[0]][lastHoveredTileCoords[1]]){
                var indicatorTileName = lastHoveredTileType === 'helipad' || canPlaceTileHere(selectedTile, lastHoveredTileCoords) ? 'ok' : 'notok';
                ctx.drawImage(spriteCache[indicatorTileName].c, lastHoveredTilePos[0] - tileSize/2 + viewport[0], lastHoveredTilePos[1] - tileSize*1.5 + viewport[1]);
            }
        }

        // if(debugPath){
        //     debugPath.map(function(tile){
        //         var pos = getIsometricPos(tile[0], tile[1], tileSize);
        //         ctx.drawImage(spriteCache.ok.c, pos[0] - tileSize/2 + viewport[0], pos[1] - tileSize*1.5 + viewport[1]);
        //     });
        // }
        stats.end();
        // setTimeout(drawMap, 1);
        if(keepRendering !== false){
            requestAnimationFrame(drawMap);
        }
    }

    drawMap();
    // if(opts.onload){
    //     opts.onload.call(_this);
    // }
    if(opts.intro){
        showTooltip.apply(this, opts.intro);
    }

    setInterval(function(){
        console.log('fps',1000/time);
    },1000);
}

module.exports = Game;

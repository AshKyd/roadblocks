var Stats = require('./stats');
var drawCube = require('./drawCube');
var SpriteLib = require('./sprites.js');
var sprites = SpriteLib.sprites;
var tileLogic = SpriteLib.tileLogic;
var firstruns = {};
var playSound = require('./sfx');
var jsonStringify = JSON.stringify;
var random = require('./random');

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

    // Incrementing integer to choose whether to render this sprite.
    var spriteRound = 0;

    // Current viewport. Default to center the map
    var mapHeight = opts.h*tileHalf/4;
    var viewport = [canvas.width/2, (canvas.height/2-mapHeight)];

    //Current drawing position. Global so we can recycle & share between fns.
    var currentCtx;

    // Stats object tracks performance. Remove for production.
    var stats = new Stats();

    // Create a predetermined buffer of tiles.
    var tileStack = [];
    var heliStack = [];
    var possibleTiles = SpriteLib.placeable;

    // Load up the tile queue & pre-cache all our tiles.
    if(opts.dist){
        tileStack = opts.dist.map(function(tile){
            cacheSprite(possibleTiles[tile]);
            return possibleTiles[tile];
        });
    } else {
        for(var i=0; i<opts.w*opts.h*2; i++){
            var thisTile = possibleTiles[round(random(opts.seed++)*(possibleTiles.length-1))];
            tileStack.push(thisTile);
            cacheSprite(thisTile);
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

    function touchstart(e){
        touchStartTime = Date.now();
        e.preventDefault();
        var touch = e.touches;
        isTouching=1;
        lastTouch = touch;

        if(touch){
            displayOffset = tileHalf;
        } else {
            displayOffset = 0;
            touch = [e];
        }

        // Check if we're dragging the last tile off the queue.
        if(
            touch[0].clientY < tileSize/2 &&
            touch[0].clientX > tileQueueBounds &&
            touch[0].clientX < tileQueueBounds + tileSize/2
        ){
            selectedTile = tileStack[0];
            playSound('select');
            tileSelectType = 0;
        }

        if(getTileFromTouch(touch) === 'helipad'){
            selectedTile = heliStack[heliStack.length-1];
            playSound('select');
            tileSelectType = 1;
        }

        moves = 0;
        lastHoveredTileCoords = getPixelPosFromTouch(touch);
        lastHoveredTileType = getTileFromTouch(touch);
        lastHoveredTilePos = getIsometricPos(lastHoveredTileCoords[0], lastHoveredTileCoords[1], tileSize);

        longPress = setTimeout(function(){
            if(!selectedTile && moves < 2 && opts.bulldozers-- > 0){
                displayOffset = 0;
                var tile = getPixelPosFromTouch(touch);
                if(!opts.predef.filter(function(item){
                    if(tile[0] === item[0] && tile[1] === item[1]){
                        return true;
                    }
                }).length){
                    playSound('boom');
                    setTileFromTouch(touch, opts.base);
                }
            }
        }, 500);

    }

    function touchmove(e){
        if(!isTouching){
            return;
        }
        e.preventDefault();
        moves++;
        var touch = e.touches;
        if(!touch){
            touch = [e];
        }
        // if(e.touches.length === 1){
            // Pan the map
            // viewport[0] += (e.touches[0].clientX - lastTouch[0].clientX);
            // viewport[1] += (e.touches[0].clientY - lastTouch[0].clientY);
        // }
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
            } else if(tileLogic[selectedTile].p(lastHoveredTileType)) {
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


    function getPixelPosFromTouch(touch){
        var pp = getPixelPos(touch[0].clientX - viewport[0], touch[0].clientY - viewport[1] - displayOffset, tileSize);
        return [Math.ceil(pp[0]), Math.ceil(pp[1])];
    }
    function getTileFromTouch(touch){
        var pos = getPixelPosFromTouch(touch);
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
        tooltip.setAttribute('class', 'visible');
        tooltip.onclick = function(){
            tooltip.setAttribute('class', '');
            playSound('select');
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

    /**
     * Calculate the win state.
     */
    function calculateWinState(){
        var result = calculateTrafficPath(opts.predef[0], opts.predef[1], trafficDirections[1]);
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
                    start: i*100 + Date.now(),
                    end: i*100 + Date.now() + 350,
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
            crawlMap(map, opts.w, opts.h, function(x,y,tile){
                if(tile === opts.base){
                    full = false;
                }
            });
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

    function renderCanvas(tiles){
        currentCtx.translate(tileSize/2, tileSize*1.5);
        tiles.forEach(drawLayer);
        currentCtx.translate(0-tileSize/2, 0-tileSize*1.5);

    }

    /**
     * Draw a single tile
     */
    function cacheSprite(tile, spriteCanvas){
        if(!spriteCanvas){
            spriteCanvas = {
                c: document.createElement('canvas')
            };
            spriteCanvas.c.width = tileSize+1;
            spriteCanvas.c.height = tileSize*2;
            currentCtx = spriteCanvas.c.getContext('2d');
            spriteCanvas.x = currentCtx;
        } else {
            currentCtx = spriteCanvas.x;
            currentCtx.clearRect(0,0,spriteCanvas.c.width, spriteCanvas.c.height);
        }
        renderCanvas(sprites[tile]);
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
        } else if(spriteRound++ % 2 === 0 && SpriteLib.animated[tile]){
            cacheSprite(tile, spriteCanvas);
        }

        if(mapOverrides[x][y]){
            mapOverrides[x][y].fn.call(mapOverrides[x][y], currentDrawPos, Date.now());
        }
        ctx.drawImage(spriteCanvas.c, currentDrawPos[0] - tileSize/2, currentDrawPos[1] - tileSize*1.5);

        if(tile === 'helipad'){
            drawHeliStack(currentDrawPos);
        }
    }



    function getTileQueuePos(i){
        return 0 - tileHalf/2 + (opts.queue - i - 1)*(tileHalf+spacing);
    }

    function drawTileQueue(){
        for(var i=0; i<opts.queue; i++){
            var tile = tileStack[i];
            if(typeof tile === 'undefined'){
                continue;
            }
            // Don't render the last one if we're moving it.
            if(isTouching && selectedTile && tileSelectType === 0 && i === 0){
            } else {
                ctx.drawImage(
                    spriteCache[tile].c, // cacned canvas tile
                    getTileQueuePos(i), // x
                    0-tileHalf*0.75, //y
                    tileHalf, // w
                    tileSize //h
                );
            }
        }
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
                    pos[1] - (0.25*tileHalf*(i+1) - tileSize*1.5)
                );
            }
        });
    }

    /**
     * Draw the entire map, including all layers & sprites.
     */
    function drawMap(){
        if(!running){
            return;
        }
        stats.begin();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(viewport[0], viewport[1]);
        crawlMap(map, opts.w, opts.h, drawSprite);
        ctx.translate(0-viewport[0], 0-viewport[1]);
        drawTileQueue();
        if(selectedTile && isTouching){
            ctx.drawImage(
                spriteCache[selectedTile].c, // cached canvas tile
                lastTouch[0].clientX - tileSize/2, // x
                lastTouch[0].clientY - tileSize*1.25  - displayOffset
            );

            if(lastHoveredTilePos && map[lastHoveredTileCoords[0]] && map[lastHoveredTileCoords[0]][lastHoveredTileCoords[1]]){
                var indicatorTileName = lastHoveredTileType === 'helipad' || tileLogic[selectedTile].p(lastHoveredTileType) ? 'ok' : 'notok';
                ctx.drawImage(spriteCache[indicatorTileName].c, lastHoveredTilePos[0] - tileSize/2 + viewport[0], lastHoveredTilePos[1] - tileSize*1.5 + viewport[1]);
            }
        }
        stats.end();
        // setTimeout(drawMap, 1000);
        requestAnimationFrame(drawMap);
    }

    drawMap();
    // if(opts.onload){
    //     opts.onload.call(_this);
    // }
    if(opts.intro){
        showTooltip.apply(this, opts.intro);
    }
}

module.exports = Game;

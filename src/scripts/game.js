// var Stats = require('./stats');
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
var modal = require('./modal');

var colorInterface = '#55bbff';
var ingameclass = 'ingame';

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
var getIsometricPos = require('./getisometricpos');

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

    var gameIsFree = opts.gameType === 'Free';

    // Size of the visible queue
    var queueSize = 4;

    // Spacing amount used in the interface.
    var spacing = 15;

    // Tile size helpers
    var tileSize, tileHalf, tileDepth;

    var tileQueueCanvas = d.createElement('canvas');
    var tileQueueContext = tileQueueCanvas.getContext('2d');
    var tileQueueReset = 0;

    // Cache of rendered sprites
    // The preexisting ones will be cached ahead of time so we can use them
    // without explicitly having to draw them.
    var spriteCache = {
        ok:1,
        notok:1,
        dump:1,
        forest: 1,
    };

    if(gameIsFree){
        SpriteLib.placeable.map(function(sprite){
            spriteCache[sprite] = 1;
        });
    }

    // Resize handler. Sets sizing when viewport changes.
    function resize(){
        if(!opts.renderOnly){
            canvas.width = w.innerWidth;
            canvas.height = w.innerHeight;
        }
        tileSize = ((canvas.width + canvas.height)/2 - 30)/(opts.wMod || opts.w);
        tileHalf = tileSize / 2;
        tileDepth = tileSize / 10;

        // Resize tileQueue
        tileQueueCanvas.width = getTileQueuePos(0) + tileSize;
        tileQueueCanvas.height = tileHalf+2;

        Object.keys(spriteCache).map(function(key){
            cacheSprite(key);
        });
    }
    resize();

    var trafficPath = [];

    // Display offset. Compensates for big fat fingers when touching.
    var displayOffset;

    // Current viewport. Default to center the map
    var mapHeight = opts.h*tileHalf/4;
    var viewport = [canvas.width/2, canvas.height/2-mapHeight+tileHalf/4];
    var renderChrome = 1;

    //Current drawing position. Global so we can recycle & share between fns.
    var currentCtx;

    // Stats object tracks performance. Remove for production.
    // var stats = new Stats();

    // DEBUG: show the path on the map.
    var currentConnectedPath;

    // Create a predetermined buffer of tiles.
    var tileStack = [];
    var heliStack = [];
    var possibleTiles = SpriteLib.placeable;

    // equivalent of date.now
    var now = Date.now();
    var showTileQueue = 1;

    // Keep track of fps
    var time = 0;

    // Game score!
    var totalPoints = 0;
    var globalPoints=0;
    if(opts.points){
        opts.points.innerText = 0;
    }

    // Load up the tile queue & pre-cache all our tiles.
    if(opts.dist){
        tileStack = opts.dist.map(function(tile){
            cacheSprite(possibleTiles[tile], undefined, opts.seed++);
            return possibleTiles[tile];
        });
    } else if(opts.dist === 0) {
        showTileQueue = 0;
    } else {
        // Randomly generate tiles.
        // for(var i=0; i<opts.w*opts.h*2; i++){
        //     var thisTile = possibleTiles[round(random(opts.seed++)*(possibleTiles.length-1))];
        //     tileStack.push(thisTile);
        //     cacheSprite(thisTile, undefined, opts.seed++);
        // }
    }

    // Bounds for latest selectable tile.
    var tileQueueBounds = getTileQueuePos(0);

    // Crete map
    var map = crawlMap([], opts.w, opts.h, function(){
        return opts.base;
    });

    // Create a graph of overrides so we can mess with tiles.
    var mapOverrides = crawlMap([], opts.w, opts.h, function(){
        return 0;
    });

    // Create a graph of overrides so we can mess with tiles.
    var points = crawlMap([], opts.w, opts.h, function(){
        return [0,0];
    });

    // Fill in any predefined tiles in this level.
    opts.predef.forEach(function(theseOpts){
        map[theseOpts[0]][theseOpts[1]] = theseOpts[2];
    });

    // Append sprites to the document so we can preview 'em.
    // For developers only.
    // Object.keys(sprites).forEach(function(key, i){
    //     cacheSprite(key);
    //     var img = d.createElement('img');
    //     img.src = spriteCache[key].c.toDataURL();
    //     img.title = i + ' - ' + key;
    //     d.body.appendChild(img);
    // });

    // Touch & movement states
    var lastTouch = false;
    var moves;
    var longPress;
    var selectedTile;
    var tileChangeCallback;
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
        moves = 0;

        lastHoveredTileCoords = getPixelPosFromTouch(touch);
        lastHoveredTileType = getTileFromTouch(touch);
        lastHoveredTilePos = getIsometricPos(lastHoveredTileCoords[0], lastHoveredTileCoords[1], tileSize);

        if(selectedTile){
            return;
        }

        // Check if we're dragging the last tile off the queue.
        if(!gameIsFree && isTouchInTileQueueBounds(touch)){
            selectedTile = tileStack[0];
            playSound('select');
            tileSelectType = 0;
            return;
        }
        // Do this before we do our fat finger munging.
        var tileundertouch = getTileFromTouch(touch, 0);

        if(!tileundertouch){
            selectedTile = 0;
            if(tileChangeCallback){
                tileChangeCallback();
                tileChangeCallback = 0;
            }
        }

        if(tileundertouch === 'helipad' && heliStack.length){
            selectedTile = heliStack[heliStack.length-1];
            playSound('select');
            tileSelectType = 1;
        }

        if(tileundertouch === 'water'){
            playSound('bloop');
            explode(getPixelPosFromTouch(touch), colorInterface);
        }

        if(!selectedTile){
            longPress = setTimeout(function(){
                var touchCurrentSpot = touch.clientX + touch.clientY;
                if(moves < 10 && touchCurrentSpot-15 < touchStartSpot && touchCurrentSpot+15 > touchStartSpot){
                    displayOffset = 0;
                    var tile = getPixelPosFromTouch(touch);
                    var tileType = getTileFromTouch(touch);
                    var predefs = opts.predef.filter(function(item){
                        // Skipping this tile
                        if(item[2] === opts.base){
                            return false;
                        }
                        if(tile[0] === item[0] && tile[1] === item[1]){
                            return true;
                        }
                    });
                    if(tileType && tileType !== opts.base && !predefs.length){
                        setTileFromTouch(touch, opts.base);
                        playSound('boom');
                        explode(tile);
                        rumble();
                        globalPoints -= 15;
                        showPoints(tile, -15);
                        calculateWinState();
                    }
                }
            }, 400);
        }

    }

    function touchmove(e){
        if(!gameIsFree && !isTouching){
            return;
        }
        e.preventDefault();
        moves++;
        var touch = touchList(e);
        if(!selectedTile && isTouching){
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
            if(
                isTouchInTileQueueBounds(lastTouch) || // If we're dropping on the queue
                (tileSelectType===1 && lastHoveredTileType === 'helipad') // Or if we picked up & dropped on the helipad
            ){
                // Do nothing. Assume the user wants to drop the tile later.
                return;
            } else if(lastHoveredTileType === 'helipad'){
                playSound('place');
                // If we pulled this tile off the helipad then put it back on,
                // don't shift off the main stack.
                if(tileSelectType != 1){
                    heliStack.push(selectedTile);
                    tileStack.shift();
                    tileQueueReset = now;
                }
            } else if(gameIsFree || canPlaceTileHere(selectedTile, lastHoveredTileCoords)) {
                if(sprites[selectedTile+'-base']){
                    selectedTile = selectedTile+'-base';
                }
                if(setTileFromTouch(lastTouch, selectedTile)){
                    playSound('place');
                    explode(getPixelPosFromTouch(lastTouch, selectedTile), '#aaaaaa', 1, 0.25);
                    // calculatePoints(getPixelPosFromTouch(lastTouch,1));
                    // 0 = tileStack, 1 = heliStack.
                    if(tileSelectType === 0){
                        tileQueueReset = now;
                        tileStack.shift();
                    } else {
                        heliStack.pop();
                    }
                    tileSelectType = 0;
                }
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
        if(!gameIsFree){
            selectedTile = false;
            tileSelectType = 0;
            calculatePointsState();
        }
    }

    function isTouchInTileQueueBounds(touch){
        return  touch.clientY < tileSize &&
                touch.clientX > tileQueueBounds &&
                touch.clientX < tileQueueBounds + tileSize;

    }

    var events = [
        ['resize', resize, window],
        ['touchstart', touchstart],
        ['touchmove', touchmove],
        ['touchend', touchend],
        ['mousedown', touchstart],
        ['mousemove', touchmove],
        ['mouseup', touchend],
    ];
    if(!opts.renderOnly){
        d.body.className = ingameclass;
        events.forEach(function(event){
            (event[2] || canvas).addEventListener(event[0], event[1], true);
        });
    }

    var particles = [];
    var particleSize = tileSize/30;
    function explode(pos, color, disableGravity, startAlpha){
        for(var i=0; i<8; i++){
            particles.push([
                now,
                pos[0],
                pos[1],
                Math.random()*2-1,
                Math.random()*2-1,
                1.5,
                500,
                color || '#C8AF9E',
                !disableGravity,
                startAlpha || 1
            ]);
        }
    }

    function drawParticles(){
        if(particles.length){
            particles = particles.filter(function(p){
                var diff = (now - p[0])/(p[6]);
                var x = p[1] + p[3] * diff;
                var y = p[2] + p[4] * diff;
                var z = (p[5]*tileHalf*diff)* (p[8] ? (1-diff*diff) : 1);
                var pos = getIsometricPos(x, y, tileSize);
                // ctx.fillRect(pos[0] + viewport[0], pos[1] + viewport[1], 5, 5);
                drawCube(ctx,
                    pos[0] + viewport[0],
                    pos[1] + viewport[1] - z,
                    particleSize,
                    particleSize,
                    particleSize,
                    p[7],
                    diff > 0.5 ? p[9] - (diff-0.5)*2 : p[9]
                );
                // drawCube(ctx,
                //     pos[0] + viewport[0],
                //     pos[1] + viewport[1],
                //     particleSize,
                //     particleSize,
                //     0,
                //     '#000000',
                //     0.25,
                //     1-diff
                // );
                if(diff*p[6] < p[6]){
                    return true;
                }
            });
        }
    }

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
            return 0;
        }
        return 1;
    }

    function rumble(){
        d.body.className = ingameclass+' rumble';
        setTimeout(function(){
            d.body.className = ingameclass;
        }, 500);
    }

    function showTooltip(message, title, tile, cb){
        modal.show(message, title, spriteCache[tile].c.toDataURL(), 1, cb);
    }

    _this.setTile = function(tile, cb){
        selectedTile = tile;
        tileChangeCallback = cb;
    };

    /**
     * Fall away animation for use in mapOverrides/this.destroy
     */
    function fallAway(currentDrawPos){
        var offset = Math.pow(1.02, Math.max(0, (now - this.start)/3)) / 200 * canvas.height;
        currentDrawPos[1] += offset;
    }

    _this.destroy = function(cb){

        // If we have a callback, perform the animation.
        if(cb){
            mapOverrides = crawlMap([], opts.w, opts.h, function(){
                var start = now + Math.random()*100;
                return {
                    fn: fallAway,
                    start: start,
                    end: start + 500,
                };
            });
            setTimeout(teardown,1000);
            setTimeout(rumble,50);
            playSound('boom');
        } else {
            // otherwise just tear down immediately.
            teardown();
        }
        function teardown(){
            // Stop the boats
            running = false;

            // tear down the infrastructure.
            events.forEach(function(event){
                (event[2] || canvas).removeEventListener(event[0], event[1], true);
            });

            d.body.className = '';

            if(cb){
                cb();
            }
        }
    };

    /**
     * Take screenshot
     */
    this.ss = function(){
        renderChrome = 0;
        drawMap();
        var a = d.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('download', 'screenshot.png');
        a.href = canvas.toDataURL('image/png');
        a.click();
        renderChrome = 1;
        drawMap();
    };

    // A handy dandy array that maps tiles to one another. See also sprites.js
    var trafficDirections = [
        [0,[-1,0]], // go south
        [1,[0,-1]], // go north
        [2,[1,0]], // go east
        [3,[0,1]], // go south
    ];

    function calculatePoints(here){
        // Look on each side of the tile.
        trafficDirections.forEach(function(dir){
            var pos = [
                here[0]+dir[1][0],
                here[1]+dir[1][1]
            ];
            try{
                // Work out which tile we're looking at.
                var thisTile = map[pos[0]][pos[1]];
                // If this tile gives us points
                if(tileLogic[thisTile]){
                    // Work out how many points
                    var thesePoints = tileLogic[thisTile].points || 0;

                    // Then set the points for this tile.
                    points[pos[0]][pos[1]] = [
                        thesePoints,
                        points[pos[0]][pos[1]][0] !== thesePoints, // Flags that this tile has changed.
                        1
                    ];
                } else {

                    // Set no points for this tile, flagging if it's changed.
                    points[pos[0]][pos[1]] = [
                        0,
                        points[pos[0]][pos[1]][0] !== 0,
                        1
                    ];
                }
            }catch(e){}
        });
    }

    function calculatePointsState(path){
        if(!currentConnectedPath){
            return;
        }
        currentConnectedPath.forEach(function(tile){
            calculatePoints(tile);
        });
        totalPoints = 0;
        crawlMap(points, opts.w, opts.h, function(x, y, points){
            // 0: points
            // 1: Have these changed from last time
            // 2: Do we need to invalidate this

            // If we need to invalidate this, do so.
            if(!points[2] && points[0]){
                showPoints([x,y], 0 - points[0]);
                points[0] = 0;
            } else if(points[1]){
                showPoints([x,y], points[0]);
            }

            // reset our changed flag.
            points[1] = 0;
            points[2] = 0;
            totalPoints += points[0];
            updatePointsDisplay();
        });
    }

    var visiblePoints = [];
    function showPoints(here, howMany){
        if(howMany){
            visiblePoints.push([
                now,
                howMany,
                getIsometricPos(here[0], here[1], tileSize),
                howMany > 1 // Color flag
            ]);
        }
        updatePointsDisplay();
        return howMany;
    }
    function updatePointsDisplay(){
        opts.points.innerText = totalPoints + globalPoints;
    }
    function drawPoints(){
        ctx.font = "bold 16px serif";
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 5;
        if(visiblePoints.length){
            visiblePoints = visiblePoints.filter(function(spec,i){
                var diff = now - spec[0];
                if(diff < 1000){
                    var args = [
                        spec[1],
                        spec[2][0] + viewport[0],
                        spec[2][1] + viewport[1] - diff/1000*tileHalf - tileHalf
                    ];
                    ctx.globalAlpha = 1-(diff/1000);
                    ctx.fillStyle = spec[3] ? colorInterface : '#FF5566';
                    ctx.strokeText.apply(ctx,args);
                    ctx.fillText.apply(ctx,args);
                } else if(diff > 1000){
                    return false;
                }
                return true;
            });
            ctx.globalAlpha = 1;
        }
    }

    function calculateTrafficPath(here, there, lastMove, path){
        if(gameIsFree){
            return [];
        }
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
        if(gameIsFree){
            return;
        }
        var result = getCalculatedTrafficPath();
        currentConnectedPath = result.win || result.lose;
        if(result && result.win){
            var sinPath = function(layer, coords){
                if(now > this.start && now < this.end){
                    layer[1] += 0-(Math.sin((now-this.start)/125))*20;
                    if(!this.s){
                        this.s = 1;
                        calculatePoints(coords);
                    }
                }
            };
            result.win.forEach(function(coords, i){
                setTimeout(function(){
                    playSound('ping');
                    showPoints(coords, 10);
                    globalPoints += 10;
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
    function drawLayer(layer, ctxOverride){
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
                c: d.createElement('canvas'),
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
            mapOverrides[x][y].fn.call(mapOverrides[x][y], currentDrawPos, [x,y]);
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
        return 0 - tileHalf/2 + (queueSize - i - 1)*(tileHalf+spacing);
    }

    var drawTileQueueOffset = 0;
    function drawTileQueue(){
        if(!renderChrome || !showTileQueue){
            return;
        }
        if(tileQueueReset){
            drawTileQueueOffset = (1-(now - tileQueueReset)/200) * (getTileQueuePos(1) - getTileQueuePos(0));
            if(now > tileQueueReset+200){
                tileQueueReset = 0;
                drawTileQueueOffset = 0;
            }
        }

        // Draw the background/outline.
        for(var i=1; i>-1; i--){
            tileQueueContext.fillStyle = i === 0 ? colorInterface : '#fff';
            tileQueueContext.fillRect(
                0+i,
                1 - i,
                round(getTileQueuePos(0) + tileSize /2 + 10),
                round(tileHalf + i*2)
            );
        }

        // Draw the tiles themselves.
        for(i=0; i<queueSize; i++){
            var tile = tileStack[i];
            if(typeof tile === 'undefined'){
                continue;
            }
            // Don't render the last one if we're moving it.
            if(selectedTile && tileSelectType === 0 && i === 0){

            } else {
                tileQueueContext.drawImage(
                    spriteCache[tile].c, // cacned canvas tile
                    getTileQueuePos(i) + drawTileQueueOffset, // x
                    0-tileHalf*0.75 - (i===0 ? Math.max(0, Math.sin(now/200))*5 : 1), //y
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
                if(!isTouching){
                    // If we're not touching, we've clicked. So bounce the tile
                    // so there's an indicator of what's happening.
                    ctx.drawImage(
                        spriteCache[tile].c,
                        pos[0] - tileSize/2,
                        pos[1] - tileSize * 1.5 - tileHalf/10*(i+1) - Math.abs(Math.sin(now/200))*5
                    );
                }
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
        // stats.begin();
        ctx.fillStyle = '#191F27';
        if(!opts.renderOnly){
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        ctx.translate(viewport[0], viewport[1]);
        crawlMap(map, opts.w, opts.h, drawSprite);
        ctx.translate(0-viewport[0], 0-viewport[1]);
        if(!opts.renderOnly){
            drawTileQueue();

            if(gameIsFree && selectedTile && lastHoveredTilePos){
                // Draw our happiness indicator on the map.
                ctx.drawImage(spriteCache.ok.c, lastHoveredTilePos[0] - tileSize/2 + viewport[0], lastHoveredTilePos[1] - tileSize*1.5 + viewport[1]);
            } else if(selectedTile){
                if(isTouching){
                    // Draw the tile we're dragging right now.
                    ctx.drawImage(
                        spriteCache[selectedTile].c, // cached canvas tile
                        lastTouch.clientX - tileSize/2, // x
                        lastTouch.clientY - tileSize*1.25  - displayOffset
                    );

                    // Draw the happiness indicator
                    if(lastHoveredTilePos && map[lastHoveredTileCoords[0]] && map[lastHoveredTileCoords[0]][lastHoveredTileCoords[1]]){
                        var indicatorTileName = lastHoveredTileType === 'helipad' || canPlaceTileHere(selectedTile, lastHoveredTileCoords) ? 'ok' : 'notok';
                        ctx.drawImage(spriteCache[indicatorTileName].c, lastHoveredTilePos[0] - tileSize/2 + viewport[0], lastHoveredTilePos[1] - tileSize*1.5 + viewport[1]);
                    }
                } else {
                    // We're not dragging, but this tile has been selected.
                    ctx.drawImage(
                        spriteCache[selectedTile].c, // cached canvas tile
                        getTileQueuePos(0), // x
                        0 - tileSize
                    );
                }
            }
            drawPoints();
        }
        drawParticles();

        // if(currentConnectedPath){
        //     currentConnectedPath.map(function(tile){
        //         var pos = getIsometricPos(tile[0], tile[1], tileSize);
        //         ctx.drawImage(spriteCache.ok.c, pos[0] - tileSize/2 + viewport[0], pos[1] - tileSize*1.5 + viewport[1]);
        //     });
        // }
        // stats.end();
        // setTimeout(drawMap, 1);
        if(keepRendering !== false){
            requestAnimationFrame(drawMap);
        }
    }

    drawMap(!opts.renderOnly);


    if(!opts.renderOnly){
        if(opts.intro){
            showTooltip.apply(this, opts.intro);
        }

        // setInterval(function(){
        //     console.log('fps',1000/time);
        // },1000);
    }
}

module.exports = Game;

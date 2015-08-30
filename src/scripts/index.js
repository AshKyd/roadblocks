var Game = require('./game');
window.d = document;
window.w = window;
var canvas = d.querySelector('canvas');
canvas.width = w.innerWidth;
canvas.height = w.innerHeight;
var ctx = canvas.getContext('2d');
var tooltip = d.querySelector('#tt');
var points = d.querySelector('#p');
var levels = require('./levels');
var logo = require('./logo');
var playSound = require('./sfx');

/**
 * Fire up a game and render one single tile as specified.
 */
function drawTile(tile, size){
    var drawTileCanvas = d.createElement('canvas');
    drawTileCanvas.width = size;
    drawTileCanvas.height = size;
    var drawable = new Game({
        tileSize: size,
        w:1,
        h:1,
        canvas: drawTileCanvas,
        base: tile,
        predef: [],
        dist: [],
        renderOnly: true,
    });
    return drawTileCanvas.toDataURL('image/png');
}

var thisGame = 0;
var thisLevelId;
var thisGameType;
var actions = {
    restart: function(){
        thisGame.destroy(function(){
            loadGame(thisGameType, thisLevelId);
        });

    },
    menu: function(){
        if(thisGame){
            thisGame.destroy(function(){
                showMenu();
            });
        }
    },
    Puzzle: function(){
        loadGame('Puzzle', 0);
    },
    Casual: function(){
        loadGame('Casual', 0);
    },
};

d.body.onclick = function(e){
    var action = e.target.dataset.action;
    if(actions[action]){
        actions[action]();
    }
    if(thisGame[action]){
        thisGame[action]();
    }
};

function loadGame(gameType, levelId){
    document.body.className = '';
    thisGameType = gameType;
    thisLevelId = levelId;
    levelId = Number(levelId);
    var level = levels[gameType][levelId];
    if(!level){
        alert('you won everything');
        showMenu();
        return;
    }

    thisGame = new Game({
        tileSize: ((canvas.width + canvas.height)/2 - 30)/(level.wMod || level.w),
        w: level.w,
        h: level.h,
        canvas: canvas,
        tooltip: tooltip,
        points: points,
        base: level.base,
        predef: level.predef,
        seed: level.seed,
        dist: level.dist,
        intro: level.intro,
        strict: level.strict,
        queue:4,
        onwin: function(){
            thisGame.destroy();
            loadGame(gameType, levelId+1);
            w.location.hash = gameType+'-'+(levelId+1);
        },
        onlose: function(){
            thisGame.destroy(function(){
                thisGame.showTooltip.apply(thisGame, ['Look like you got stuck. Tap to try again.', 'Level failed']);
                loadGame(gameType, levelId);
            });
        }
    });
}

function showMenu(){
    logo(canvas,ctx,0,1);
    d.body.className = 'menu';
    d.querySelector('#menu').innerHTML = ['Puzzle', 'Casual', 'Free map'].map(function(text){
        var dac = ' data-action="'+text+'"';
        return '<div'+dac+'><img'+dac+' src="'+drawTile('grass', canvas.width/5)+'">'+text+'</div>';
    }).join('');
    playSound('dialog');
}

logo(canvas, ctx, function(){
    if(window.location.hash){
        loadGame.apply(null, window.location.hash.substr(1).split('-'));
    } else {
        // loadGame(0);
        showMenu();
    }
});

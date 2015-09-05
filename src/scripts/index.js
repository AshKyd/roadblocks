var Game = require('./game');
window.d = document;
window.w = window;
var canvas = d.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var tooltip = d.querySelector('#tt');
var points = d.querySelector('#p');
var levels = require('./l');
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
    Free: function(){

    }
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
    d.body.className = '';
    thisGameType = gameType;
    thisLevelId = levelId;
    levelId = Number(levelId);
    var level = levels[gameType][levelId];
    if(!level){
        if(thisGame){
            thisGame.tt(
                "Congratulations, you've finished all the levels. Be sure to share this game with your friends!",
                'You won!',
                0,
                showMenu
            );

        } else {
            showMenu();
        }
        return;
    }

    level.canvas = canvas;
    level.points = 0;

    level.onwin = function(){
        thisGame.destroy();
        loadGame(gameType, levelId+1);
        w.location.hash = gameType+'-'+(levelId+1);
    };

    level.onlose = function(){
        thisGame.destroy(function(){
            thisGame.tt.apply(thisGame, ['Look like you got stuck. Tap to try again.', 'Level failed']);
            loadGame(gameType, levelId);
        });
    };

    thisGame = new Game(level);
}

function showMenu(){
    logo(canvas,ctx,0,1);
    d.body.className = 'menu';
    d.querySelector('#menu').innerHTML = ['Puzzle', 'Free map'].map(function(text){
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

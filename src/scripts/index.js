var Game = require('./game');
window.d = document;
window.w = window;
var canvas = d.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var levels = require('./l');
var SpriteLib = require('./sprites');
var logo = require('./logo');
var playSound = require('./sfx');
var modal = require('./modal');
var Storage = require('./storage');
var tileList = d.querySelector('#tl');

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
        wMod: 1.3,
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
        modal.show(
            levels.Puzzle.map(function(level, i){
                var unlocked = (!i || Storage.state['Puzzle'+i]);
                return '<a class="pill '+
                (unlocked ? 'active' : '') +
                '" data-action="'+(unlocked ? 'l' : '')+'" data-l="'+i+'">'+(i+1)+'. '+level.name+'</a>';
            }).join(''),
            'Puzzle play',
            null,
            0,
            0,
            'Back'
        );
    },
    'Free map': function(){
        if(!Storage.state.Puzzle5){
            modal.show('Unlock this mode by completing more puzzles.', 'Mode locked');
        } else {
            tileList.innerHTML = SpriteLib.placeable.map(function(sprite){
                return '<img id="t'+sprite+'" src="'+drawTile(sprite, 128)+'" data-action="p" data-s="'+sprite+'">';
            }).join('');
            tileList.className = 'active';
            loadGame('Free', 0);
        }
    },
    // Exit: function(){
    //     window.close();
    // },
    // 'Report a bug': function(){
    //     window.open('https://github.com/AshKyd/roadblocks/issues/new');
    // },

    // Load puzzle game
    l: function(data){
        modal.hide(function(){
            loadGame('Puzzle', data.l);
        });
    },

    // place tile
    p: function(data){
        var prevActive = d.querySelector('#tl .active');
        if(prevActive){
            prevActive.className = '';
        }
        var thisActive = d.querySelector('#t'+data.s);
        thisActive.className = 'active';
        thisGame.setTile(data.s, function(){
            console.log('tile deselected');
            thisActive.className = '';
        });

    }
};

d.body.onclick = function(e){
    var data = e.target.dataset;
    if(actions[data.action]){
        actions[data.action](data);
        return false;
    }
    if(thisGame[data.action]){
        thisGame[data.action](data);
        return false;
    }
};

function loadGame(gameType, levelId){
    d.body.className = '';
    thisGameType = gameType;
    levelId = Number(levelId);
    thisLevelId = levelId;
    var level = levels[gameType][levelId];
    if(!level){
        if(thisGame){
            modal.show(
                "Congratulations, you've finished all the levels. Be sure to share this game with your friends!",
                'You won!',
                0,
                0,
                showMenu
            );

        } else {
            showMenu();
        }
        return;
    }

    level.canvas = canvas;
    level.gameType = gameType;

    level.onwin = function(){
        thisGame.destroy();
        loadGame(gameType, levelId+1);
        w.location.hash = gameType+'-'+(levelId+1);
        Storage.set(gameType+(levelId+1),  1);
    };

    level.onlose = function(){
        thisGame.destroy(function(){
            modal.show('Looks like you got stuck. Tap to try again.', 'Level failed', null, 1, function(){
                loadGame(gameType, levelId);
            });
        });
    };

    thisGame = new Game(level);
}

function showMenu(){
    // hide the tile list dialog from free mode
    tileList.className = '';
    logo(canvas,ctx,0,1);
    d.body.className = 'menu';
    d.querySelector('#menu').innerHTML = [
        ['Puzzle','roadx-base'],
        ['Free map','dump'],
        // ['Report a bug','grass'],
        // ['Exit','grass'], // Only useful for app modes.
    ].map(function(text){
        var dac = ' data-action="'+text[0]+'"';
        return '<div'+dac+'><img'+dac+' src="'+drawTile(text[1], Math.min(canvas.width, canvas.height)/4)+'">'+text[0]+'</div>';
    }).join('');
    playSound('dialog');
}

showMenu();

window.d = document;
window.w = window;
var fs = require('fs');
d.body.innerHTML = fs.readFileSync(__dirname+'/../templates/bootstrap.tpl', 'utf8');
require('../style/style.css');
var Game = require('./game');
var canvas = d.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var levels = require('./levels');
var SpriteLib = require('./sprites');
var logo = require('./logo');
var playSound = require('./sfx');
var modal = require('./modal');
var Storage = require('./storage');
var tileList = d.querySelector('#tl');
var i18n = require('./i18n');

// Feature detect Chrome using chrome.storage.sync.
var chromeApp = false;
try{
    chromeApp = !!chrome.storage.sync;
} catch(e){

}

window.onresize = function(){
    d.body.width = window.innerWidth;
    d.body.height = window.innerHeight;
};
window.onresize();

// Previous active tile.
var thisActive;

// Press escape to close dialogs, clear selection.
d.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        if(thisActive){
            // If we have an active tile, deselect it
            deselectTile();
        } else if(modal.visible){
            // if we  have a visible modal,
            modal.hide();
        } else if(thisGame) {
            // TODO: Show a dialog "are you sure you want to quit"
        } else {
            try{
                window.close();
            } catch(e){

            }
        }
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

function deselectTile(){
    thisGame.setTile('', 0);
    thisActive.className = '';
    thisActive = 0;
}

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
            thisGame = 0;
        }
    },
    save: function(){
        modal.show(
            fs.readFileSync(__dirname+'/../templates/savedialog.tpl','utf8'),
            'Save map',
            null,
            0,
            function(){
                var saveFile = thisGame.saveState({
                    name: document.querySelector('#save-name').value,
                    intro: document.querySelector('#save-intro').value,
                });
                var games = Storage.state.customgames || [];
                games.push(saveFile);
                Storage.set('customgames', JSON.stringify(games));
            },
            'Save'
        );
    },
    Puzzle: function(){
        modal.show(
            levels.Puzzle.map(function(level, i){
                var unlocked = (!i || Storage.state['Puzzle'+i]);
                return '<a class="pill '+
                (unlocked ? 'active' : '') +
                '" data-action="'+(unlocked ? 'l' : '')+'" data-l="'+i+'">'+(i+1)+'. '+i18n(level.name)+'</a>';
            }).join(''),
            i18n('Puzzle Play'),
            null,
            0,
            0,
            i18n('Back')
        );
    },
    'Free map': function(){
        if(!Storage.state.Puzzle5){
            modal.show(
                i18n('Unlock this mode by completing more puzzles.'),
                i18n('Mode locked')
            );
        } else {
            tileList.innerHTML = SpriteLib.placeable.map(function(sprite){
                return '<img id="t'+sprite+'" src="'+drawTile(sprite, 128)+'" data-action="p" data-s="'+sprite+'">';
            }).join('');
            tileList.className = 'active';
            loadGame('Free', 0);
        }
    },
    Exit: function(){
        window.close();
    },
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
        var prevActive = thisActive;
        if(prevActive){
            prevActive.className = '';
        }
        thisActive = d.querySelector('#t'+data.s);
        if(prevActive === thisActive){
            deselectTile();
        } else {
            thisActive.className = 'active';
            thisGame.setTile(data.s, function(){
                deselectTile();
            });
        }

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
                i18n('Congratulations, you\'ve finished all the levels. Be sure to share this game with your friends!'),
                i18n('You won!'),
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
    level.offsetTouch = gameType !== 'Free';

    level.onwin = function(){
        thisGame.destroy();
        loadGame(gameType, levelId+1);
        w.location.hash = gameType+'-'+(levelId+1);
        Storage.set(gameType+(levelId+1),  1);
    };

    level.onlose = function(){
        thisGame.destroy(function(){
            modal.show(
                i18n('Looks like you got stuck. Tap to try again.'),
                i18n('Level failed'),
                null,
                1,
                function(){
                    loadGame(gameType, levelId);
                }
            );
        });
    };

    thisGame = new Game(level);
}

function showMenu(){
    // hide the tile list dialog from free mode
    tileList.className = '';
    logo(canvas,ctx,0,1);
    var menuOptions = [
        ['Puzzle','roadx-base', i18n('Puzzle')],
        ['Free map','dump', i18n('Free map')],
    ];

    if(chromeApp){
        menuOptions.push(['Exit','grass']); // Only useful for app modes.
    }
    d.querySelector('#menu').innerHTML = menuOptions.map(function(text){
        var dac = ' data-action="'+text[0]+'"';
        return '<div'+dac+'><img'+dac+' src="'+drawTile(text[1], Math.min(canvas.width, canvas.height)/4)+'">'+text[2]+'</div>';
    }).join('');
    d.body.className = 'menu';
    playSound('dialog');
}

if(window.AudioContext || window.webkitAudioContext){
    showMenu();
} else {
    modal.show(
        i18n('This browser is too old to run Road Blocks.')+
        '<a class="pill active" href="http://spacekidgames.com/road-blocks/system-requirements">'+i18n('Find out more')+'</a>',
        i18n('Unsupported'),
        null,
        1
    );
}

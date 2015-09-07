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

localStorage.uniqueId = localStorage.uniqueId || Math.round(Math.random()*1e6);


_LTracker.push({
    action: 'Startup',
    uid: localStorage.uniqueId,
    ua: navigator.userAgent,
    res: canvas.width + 'x' + canvas.height,
});

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
        _LTracker.push({
            action: 'Restart',
            uid: localStorage.uniqueId
        });
        thisGame.destroy(function(){
            loadGame(thisGameType, thisLevelId);
        });
    },
    menu: function(){
        _LTracker.push({
            action: 'Menu click',
            uid: localStorage.uniqueId
        });
        if(thisGame){
            thisGame.destroy(function(){
                showMenu();
            });
        }
    },
    Puzzle: function(){
        _LTracker.push({
            action: 'Show puzzles menu',
            uid: localStorage.uniqueId
        });
        modal.show(
            levels.Puzzle.map(function(level, i){
                var unlocked = (!i || Storage.state['Puzzle'+i]);
                return '<a class="pill '+
                (unlocked ? 'active' : '') +
                '" data-action="'+(unlocked ? 'l' : '')+'" data-l="'+i+'">'+(i+1)+'. '+level.name+'</a>';
            }).join(''),
            'Puzzle play',
            null,
            0
        );
    },
    'Free map': function(){
        if(!Storage.state.Puzzle5){
            _LTracker.push({
                action: 'Free map locked',
                uid: localStorage.uniqueId
            });
            modal.show('Unlock this mode by completing more puzzles.', 'Mode locked');
        } else {
            _LTracker.push({
                action: 'Free map',
                uid: localStorage.uniqueId
            });
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
    'Report a bug': function(){
        window.open('https://github.com/AshKyd/roadblocks/issues/new');
    },

    // Load puzzle game
    l: function(data){
        modal.hide(function(){
            loadGame('Puzzle', data.l);
        });
    },

    // place tile
    p: function(data){
        _LTracker.push({
            action: 'Place tile',
            data: data,
            uid: localStorage.uniqueId
        });
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
    _LTracker.push({
        action: 'Level '+levelId,
        uid: localStorage.uniqueId
    });

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
        _LTracker.push({
            action: 'Win',
            uid: localStorage.uniqueId
        });
        thisGame.destroy();
        loadGame(gameType, levelId+1);
        w.location.hash = gameType+'-'+(levelId+1);
        Storage.set(gameType+(levelId+1),  1);
    };

    level.onlose = function(){
        _LTracker.push({
            action: 'Autolos',
            uid: localStorage.uniqueId
        });
        thisGame.destroy(function(){
            modal.show('Looks like you got stuck. Tap to try again.', 'Level failed', null, 1, function(){
                loadGame(gameType, levelId);
            });
        });
    };

    thisGame = new Game(level);
}

function showMenu(){
    _LTracker.push({
        action: 'Menu',
        uid: localStorage.uniqueId
    });
    // hide the tile list dialog from free mode
    tileList.className = '';
    logo(canvas,ctx,0,1);
    d.body.className = 'menu';
    d.querySelector('#menu').innerHTML = [
        ['Puzzle','roadx-base'],
        ['Free map','dump'],
        ['Report a bug','grass'],
        // ['Exit','grass'], // Only useful for app modes.
    ].map(function(text){
        var dac = ' data-action="'+text[0]+'"';
        return '<div'+dac+'><img'+dac+' src="'+drawTile(text[1], canvas.width/5)+'">'+text[0]+'</div>';
    }).join('');
    playSound('dialog');
}

if(!_LTracker.session_id){
    modal.show(
        'Howdy. During the beta phase I\'m using <a href="https://www.loggly.com/">Loggly</a> to gather analytics.'+
        'All it\'s doing is logging crashes and gameplay stats (duration, play count etc). Could you please let it run just this once? Thank you!',
        'Unblock trackers, yo',
        0,
        1,
        function(){
            window.location.reload();
        }
    );
} else {
    logo(canvas, ctx, function(){
        modal.show(
            'This is a beta version, please feel free to leave <a href="https://github.com/AshKyd/roadblocks/issues/new" target="_blank">bug reports &amp; feedback</a>! (You\'ll need a free GitHub account to do this.)',
            'Thanks for testing!',
            0,
            1,
            function(){
                if(window.location.hash){
                    loadGame.apply(null, window.location.hash.substr(1).split('-'));
                } else {
                    // loadGame(0);
                    showMenu();
                }
            }
        );
    });
}

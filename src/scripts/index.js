var Game = require('./game');
var canvas = document.querySelector('canvas');
var tooltip = document.querySelector('#tt');
var levels = require('./levels');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function loadGame(levelId){
    var level = levels[levelId];
    if(!level){
        alert('you won everything');
        return;
    }

    var actions = {
        restart: function(){
            console.log('restarting');
            thisGame.destroy(function(){
                loadGame(levelId);
            });

        }
    };

    var thisGame = new Game({
        tileSize: ((canvas.width + canvas.height)/2 - 30)/(level.wMod || level.w),
        w: level.w,
        h: level.h,
        canvas: canvas,
        tooltip: tooltip,
        base: level.base,
        predef: level.predef,
        seed: level.seed,
        dist: level.dist,
        intro: level.intro,
        strict: level.strict,
        queue:5,
        bulldozers: level.bulldozers,
        onwin: function(){
            console.log('onwin');
            thisGame.destroy();
            loadGame(levelId+1);
            window.location.hash = levelId+1;
        },
        onlose: function(){
            thisGame.destroy(function(){
                thisGame.showTooltip.apply(thisGame, ['Look like you got stuck. Tap to try again.', 'Level failed']);
                loadGame(levelId);
            });
        }
    });


    document.body.onclick = function(e){
        var action = e.target.dataset.action;
        if(actions[action]){
            actions[action]();
        }
        if(thisGame[action]){
            thisGame[action]();
        }
    };
}

if(window.location.hash){
    loadGame(Number(window.location.hash.substr(1)));
} else {
    loadGame(0);
}

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
        queue:5,
        bulldozers: level.bulldozers,
        onwin: function(){
            console.log('onwin');
            this.destroy();
            loadGame(levelId+1);
            window.location.hash = levelId+1;
        },
        onlose: function(){
            console.log('onlose');
            this.destroy('Look like you got stuck. Tap to try again.', 'Level failed');
            loadGame(levelId);
        }
    });
}

if(window.location.hash){
    loadGame(Number(window.location.hash.substr(1)));
} else {
    loadGame(0);
}

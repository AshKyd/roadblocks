var logo = [
    [1,1,1, , ,1,1, , , ,1, , ,1,1, , ,1,1,1, ,1, , , ,1,1, , , ,1,1],
    [1, ,1, ,1, , ,1, ,1, ,1, ,1, ,1, ,1, ,1, ,1, , ,1, , ,1, ,1, , ],
    [1,1, , ,1, , ,1, ,1,1,1, ,1, ,1, ,1,1, , ,1, , ,1, , ,1, ,1, , ],
    [1, ,1, ,1, , ,1, ,1, ,1, ,1, ,1, ,1, ,1, ,1, , ,1, , ,1, ,1, , ],
    [1, ,1, , ,1,1, , ,1, ,1, ,1,1, , ,1,1,1, ,1,1,1, ,1,1, , , ,1,1]
];
var drawCube = require('./drawCube');
var getIsometricPos = require('./getisometricpos');
var shadeColor = require('./shadecolor');
var playSound = require('./sfx');

module.exports = function(canvas, ctx, cb, force){
    var x = canvas.width/4;
    var y = canvas.height/5;
    var w = canvas.width/50;
    var color = '#55bbff';
    var start = Date.now();
    if(force){
        start -= 5000;
    }
    render();
    var hitYet = 0;
    var hits = 0;

    function render(){
        var now = Date.now()-500*2;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        logo.map(function(line, i){
            line.map(function(char, j){
                var pos = getIsometricPos(j, i, w);
                var diff = ((now + j*10)-start)/500;
                var yoff = Math.max(0, (screen.height) * (1-diff));
                if(yoff === 0){
                    hits++;
                }
                if(char == 1){
                    drawCube(
                        ctx,
                        x + pos[0]*2,
                        y + pos[1]*2 - yoff,
                        w,
                        w,
                        w*.75,
                        shadeColor('#888888', 0-j)
                    );
                    drawCube(
                        ctx,
                        x + pos[0]*2,
                        y + pos[1]*2 - w*0.75 - yoff,
                        w,
                        w,
                        w*.25,
                        shadeColor(color, 0-j)
                    );
                }
            });
        });

        if(hits && !hitYet){
            hitYet = 1;
            for(var i=0; i<4; i++){
                playSound('thud', i/9);
            }
        }

        if(now - start <= 1000){
            requestAnimationFrame(render);
        } else {
            if(cb){
                cb();
            }
        }
    }
};

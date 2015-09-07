/**
 * Show/hide the tooltip over the top of the game.
 */
var playSound = require('./sfx');
function getElementHeight(ele){
    return parseInt(w.getComputedStyle(ele, null).getPropertyValue("height"));
}

var tooltip = document.querySelector('#tt');
var scrim = document.querySelector('#s');

module.exports = {
    show: function(message, title, tile, copyfit, cb){
        title = title ? '<h1>'+title+'</h1>' : '';
        tile = tile ? '<img class="rubberBand" src="'+tile+'">' : '';
        tooltip.innerHTML = '<div id="tt-inner"><a class="close">OK</a> '+title+message+tile+'</div>';
        tooltip.style.display = 'block';
        scrim.style.display = 'block';
        setTimeout(function(){
            tooltip.className = 'active';
            scrim.className = 'active';
        }, 1);

        // Copyfit the text to fit the dialog, regardless of screen size.
        var height = getElementHeight(tooltip);
        var inner = d.querySelector('#tt-inner');
        var img = d.querySelector('#tt-inner img');

        if(copyfit){
            inner.className = '';
            for(var i=35; i>10; i--){
                inner.style.fontSize = i+'px';
                if(getElementHeight(inner) < height - 100){
                    break;
                }
            }
        } else {
            inner.className = 'scroll';
        }

        function close(e){
            e.preventDefault();
            playSound('select');
            module.exports.hide(cb);
        }
        document.querySelector('.close').onclick = close;
        scrim.onclick = close;
        tooltip.ontouchstart = tooltip.onclick;
        setTimeout(function(){
            playSound('dialog');
        },10);
    },
    hide: function(cb){
        tooltip.className = '';
        scrim.className = '';
        setTimeout(function(){
            tooltip.style.display = 'none';
            scrim.style.display = 'none';
            if(cb){
                cb();
            }
        }, 150);
    },
};

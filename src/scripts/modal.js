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
    show: function(message, title, tile, cb){
        title = title ? '<h1>'+title+'</h1>' : '';
        tile = tile ? '<img class="rubberBand" src="'+tile+'">' : '';
        tooltip.innerHTML = '<div id="tt-inner"><a class="close">OK</a> '+title+message+tile+'</div>';
        tooltip.style.display = 'block';
        scrim.style.display = 'block';
        tooltip.className = 'active';
        scrim.className = 'active';

        // Copyfit the text to fit the dialog, regardless of screen size.
        var height = getElementHeight(tooltip);
        var inner = d.querySelector('#tt-inner');
        var img = d.querySelector('#tt-inner img');
        for(var i=35; i>10; i--){
            inner.style.fontSize = i+'px';
            if(getElementHeight(inner) < height - 80){
                break;
            }
        }

        tooltip.onclick = function(e){
            e.preventDefault();
            playSound('select');
            tooltip.className = '';
            scrim.className = '';
            setTimeout(function(){
                module.exports.hide();
            },150);
            if(cb){
                cb();
            }
        };
        scrim.onclick = tooltip.onclick;
        tooltip.ontouchstart = tooltip.onclick;
        setTimeout(function(){
            playSound('dialog');
        },10);
    },
    hide: function(){
        tooltip.style.display = 'none';
        scrim.style.display = 'none';
    },
};

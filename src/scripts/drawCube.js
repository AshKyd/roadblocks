var cCache = {};

// Nicked from http://stackoverflow.com/questions/5560248
function shadeColor(color, percent) {
    if(cCache[color+percent]){
        return cCache[color+percent];
    }
    color = color.substr(1);
    var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    cCache['#'+color+percent] = '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    return cCache[color+percent];
}

function drawPoly(ctx, a, b, c, d, e, f, g, h, fill, stroke){
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.lineTo(e, f);
    ctx.lineTo(g, h);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.fill();
}

// Draw a cube to the specified specs
module.exports = function(ctx, x, y, wx, wy, h, color, alpha) {
    ctx.globalAlpha = alpha || 1;
    drawPoly(
        ctx,
        x, // x & y start coords
        y,
        x - wx, // first lineTo x & y
        y - wx * 0.5,
        x - wx, // Second lineTo x & y
        y - h - wx * 0.5,
        x, // Third lineTo x  &y
        y - h * 1,
        color, // fill
        shadeColor(color, -5) //stroke
    );

    drawPoly(
        ctx,
        x,
        y,
        x + wy,
        y - wy * 0.5,
        x + wy,
        y - h - wy * 0.5,
        x,
        y - h * 1,
        shadeColor(color, 10),
        shadeColor(color, 25)
    );

    drawPoly(
        ctx,
        x,
        y - h,
        x - wx,
        y - h - wx * 0.5,
        x - wx + wy,
        y - h - (wx * 0.5 + wy * 0.5),
        x + wy,
        y - h - wy * 0.5,
        shadeColor(color, 20),
        shadeColor(color, 30)
    );
    ctx.globalAlpha = 1;
};

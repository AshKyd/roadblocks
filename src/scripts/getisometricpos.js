module.exports = function(x, y, tileWidth){
    return [
        (x - y) * (tileWidth / 2),
        (x + y) * (tileWidth / 4)
    ];
};

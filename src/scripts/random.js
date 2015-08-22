/**
 * Seeded random function
 * @param  {Number} seed Seed. Increment this yourself.
 * @return {Number}      Randomish value between 0 and 1.
 */
module.exports = function(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

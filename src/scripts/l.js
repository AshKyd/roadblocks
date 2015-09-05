/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
var spriteIndex = Object.keys(require('./sprites').sprites);
// var levels = require('./levels.js');
var levels = require('./.levels.json');


function numberise(a){
    return Number(a);
}

/**
 * Custom base36 decoder.
 * @param {string} input    base36/alphanumeric encoded string from the enc function
 * @return {string}         Original numeric string as passed to the enc function.
 */
function dec(input){
    // Split our string into chunks of 8 bytes (with whatever left over at the end)
    return input.match(/.{8}|.+/g).map(function(chunk){
        // Convert each chunk to base 10.
        // Lop off the first character because it will be a safety 1.
        return String(parseInt(chunk, 36)).substr(1);
    }).join('');
}

Object.keys(levels).map(function(levelType){
    levels[levelType] = levels[levelType].map(function(level){
        var data = level[0].split('-').map(dec);
        var predef = data[3].match(/.{4}/g).map(function(thisBit){
            thisBit = thisBit.match(/(.)(.)(.+)/).map(numberise);
            return [
                thisBit[1],
                thisBit[2],
                spriteIndex[thisBit[3]],
            ];
        });

        var defs = data[0].match(/(.+)(.)(.)(.)(..)(.)$/);
        return {
            seed: numberise(data[1]),
            w: defs[2],
            h: defs[3],
            wMod: defs[4],
            base: spriteIndex[defs[5]],
            strict: !!defs[6],
            dist: data[1] === '0' ? 0 : data[1].split('').map(numberise),
            predef : predef,
            intro: level[1],
            name: data[2],
        };
    });
});

module.exports = levels;

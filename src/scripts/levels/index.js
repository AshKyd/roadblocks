/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
import spritesLib from '../sprites.js';
var spriteIndex = Object.keys(spritesLib.sprites);
// import levels from './levels.js';
import levels from './levels.json';


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
    return input ? input.match(/.{8}|.+/g).map(function(chunk){
        // Convert each chunk to base 10.
        // Lop off the first character because it will be a safety 1.
        return String(parseInt(chunk, 36)).substr(1);
    }).join('') : false;
}

Object.keys(levels).map(function(levelType){
    levels[levelType] = levels[levelType].map(function(level){
        var data = level[1].split('-').map(dec);
        var predef = [];
        if(data[2]){
            predef = data[2].match(/.{4}/g).map(function(thisBit){
                thisBit = thisBit.match(/(.)(.)(.+)/).map(numberise);
                return [
                    thisBit[1],
                    thisBit[2],
                    spriteIndex[thisBit[3]],
                ];
            });
        }

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
            intro: level[2],
            outro: level[3],
            name: level[0],
        };
    });
});

export default levels;

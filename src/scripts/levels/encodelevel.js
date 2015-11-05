
// 3.61 kb - beginning
// 2.75 - after index
// 2.45 after combining predef array
//
var SpriteLib = require('../sprites');
var spriteIndex = Object.keys(SpriteLib.sprites);

/**
 * Pad a number with the specified number zeroes.
 */
function pad(str, num){
    str = String(str);
    while(str.length < num){
        str = '0' + str;
    }
    return str;
}

/**
 * Encode a string using a custom base36 encoding.
 * * Strings are chunked into 8 byte base36 encoded pieces for integer safety.
 * * The final piece may not make up 8 bytes, this is piecked up by the decoder..
 * @param {string} num  string full of numeric digits to encode.
 * @return {string}     base36/alphanumeric encoded string.
 */
 function enc(num){
     // Stringify our number in case it was input as an integer.
     num = String(num);

     // Keep track of our encoded chunks.
     var encodedChunks = [];

     // Continue until we've processed the entire string.
     while(num.length){
         // Start somewhere.
         var splitPosition = 7;

         // Try incrementally larger pieces until we get one that's exectly
         // 8 characters long.
         var encodedNum = '';
         do {
             // toString(36) converts decimal to base36.
             // Add a leading 1 for safety, as any leading zeroes would otherwise
             // be lost.
             encodedNum = Number('1' + num.substr(0, ++splitPosition)).toString(36);
         } while(encodedNum.length < 8 && splitPosition < num.length && splitPosition < 15);

         // Push our chunk onto the list of encoded chunks and remove these
         // digits from our string.
         encodedChunks.push(encodedNum);
         num = num.substr(splitPosition);
     }

     // Return a big ol' string.
     return encodedChunks.join('');
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
        return parseInt(chunk, 36);
    }).join('');
}

var before = 0;
var after = 0;

module.exports = function(level){
    // Flatten
    level.predef = level.predef.map(function(predef){
        var index = spriteIndex.indexOf(predef[2]);
        if(index == -1){
            return predef.join('');
        }
        predef[2] = pad(index, 2);
        return predef.join('');
    }).join('');

    // Encoded payload 1.
    var payload = [
        level.seed,                             // 0
        level.w,                                // 1
        level.h,                                // 2
        level.wMod || level.w,                  // 3
        pad(spriteIndex.indexOf(level.base), 2),// 4
        level.strict ? 1 : 0,                   // 5
    ].join('');

    var dist = 0;
    if(level.dist){
        // Map them back to integers if they're defined as strings.
        dist = level.dist.map(function(tile){
            if(typeof tile === 'string'){
                tile = spriteIndex.indexOf(tile);
            }
            return tile;
        }).join('');
    }

    var entry = [
        level.name,
        [
            enc(payload),
            '-',
            enc(dist),
            '-',
            enc(level.predef),
        ].join('')
    ];

    before += (payload.length + (dist.length || 0) + level.predef.length);
    after += (enc(payload).length + (enc(dist).length || 0) + enc(level.predef).length);
    if(level.intro){
        entry.push(level.intro);
        if(level.outro){
            entry.push(level.outro);
        }
    }
    return entry;
};

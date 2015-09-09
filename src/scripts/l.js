/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
var spriteIndex = Object.keys(require('./sprites').sprites);
// var levels = require('./levels.js');
var levels = {"Puzzle":[["Roads 101","i76c67-255s-1knunumjd",["Connect from left to right by dragging tiles from the top.","Left to right","roady-base"]],["Town planning","i76c67-65184-1p97t4hl2u15",["Now you've got the hang of it, give it a go with all the tiles.","Your turn","roadx"]],["Reverse the flow","azbmn-1q0ank-1g2hikr6f",["Use the helipad to reverse the order of your tiles.","Stack tiles for later","helipad"]],["The Block Forest","1v2s8v-1qj324h32y-1q6ak2ac1xh4cznx3p",["Building road past special tiles like forests or the helipad gives you extra points.","Bonus points","forest"]],["★ Bulldozer Beach","i7b1xa-1q2p0rg4a-1gzj2ngl1pkgajre1jbq4o181xumsg041xxuxo8u1uup921p1l2ks6zg1ouj8oml2bh9tx",["Long press to bulldoze a tile you no longer need.","Bulldoze","dump"],["Congratulations. You've unlocked <b>Free Map</b> mode from the main menu.","Free Map","dump"]],["Palm Island","1vo7ux-gq8p29-1gzk9imq1sdea13u1kz9p2ka1ou7c1b81yeb9toa1tc4t3m1qvtx"],["Loopy Lagoon","juufym-23tbv4l816u-1gzkuybk1kz2judm1jbq4o181xumsg041xxuxo8u1uuph0c55kucn4l"],["Mini Monaco","lj1jeg-1bhgx297at7-1ztkxtp01f53i2vw1dpysny21opahvwp1xhbz7hg1v6adci81l9iuyio1b1oewh41ntzxghi34o8"],["Dual Carriageway","n5zga6-o04u8y-22kz99uk1hatzygi1l5e01zw1k8szvjg1plhv9je1tiqqs261l67rhqd1fgoxwyr"],["Little condo by the sea","1wed7t-1ahr1tavxbe5-1r3foqhe1sde83nn1kzfn8fs22lx2t6o1f3q5hvo1sywaee81l1l2z8n1fo32lgc281qh6l61vv32wmm1l2qqjt01tfxkw0o1a1sx1ai1tpd1b821l8p2xtc1sqlgat51mfusy7k2ppd"]],"Free":[[null,"6exf2-a-"]]};


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

module.exports = levels;

/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
var spriteIndex = Object.keys(require('./sprites').sprites);
var levels = require('./levels');
// var levels = {"Puzzle":[["i76c67-255s-1knunumgh",["Connect from left to right by dragging tiles from the top.","Left to right","roady-base"]],["i76c67-65184-1p97t4hi3ovj",["Now you've got the hang of it, give it a go with all the tiles.","Your turn","roadx"]],["azbmn-1q0ank-1g2hikr6f",["Use the helipad to reverse the order of your tiles.","Stack tiles for later","helipad"]],["1v2s8v-1qj324h32y-1q6ak2ac1xgovpxp2z",["Building road past special tiles like forests or the helipad gives you extra points.","Bonus points","forest"]],["i7b1xa-1q2p0rg4a-1gzj2ngi27xz9dai1jbq4o181xumsg041xxuxo8u1uup921p1l2ks6zg1ouj8oml2bh9tx",["Long press to bulldoze a tile you no longer need.","Bulldoze","dump"]],["1vo7ux-gq8p29-1gzk9imq1sdea13u1kz9p2ka1ou7c1b81yeb9toa1tc4t3m1qvtx"],["1wed7t-1ahr1tavxbe5-1r3foqhe1sde83nn1kzfn8fs22lx2t6o1f3q5hvo1sywaee81l1l2z8n1fo32lgc281qh6l61vv32wmm1l2qqjt01tfxkw0o1a1sx1ai1tpd1b821l8p2xtc1sqsipj21jmbt7c6f",["There are several ways to finish this level. See if you can build past the helipad.","Many ways","sand"]],["juufym-23tbv4l816u-1gzkuybk1kz2judm1jbq4o181xumsg041xxuxo8u1uuph0c55kucn4l"],["lj1jeg-1bhgx297at7-1ztkxtp01f53i2vw1dpysny21opahvwp1xhbz7hg1v6adci81l9iuyio1b1oewh41ntzxghi34o8"],["n5zga6-a-22kz99uk1cpg992q1l5e01zw1k8szvjg1plhv9je1tiqqs261l67rhq3v4"]],"Casual":[]};

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
        var predef = data[2].match(/.{4}/g).map(function(thisBit){
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
        };
    });
});

module.exports = levels;

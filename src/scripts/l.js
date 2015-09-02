/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
var spriteIndex = Object.keys(require('./sprites').sprites);
var levels = {
    "Puzzle": [
        [100, 4, 4, 4, "C", "23R20R127", 1, "00000", ["Connect from left to right by dragging tiles from the top.", "New game", "roady-base"]],
        [100, 4, 4, 4, "C", "33R10R227237", 1, "0312564", ["Now you've got the hang of it, give it a go with all the tiles.", "Your turn", "roadx"]],
        [8, 4, 4, 4, "C", "13R30R00I", 1, "04150000", ["The helipad can stack tiles for later. Use this to reverse the order of your tiles.", "Helipad", "helipad"]],
        [12, 6, 6, 4, "C", "35R10R33723712713I", 1, "3611450013506", ["Building road past special tiles like forests or the helipad gives you extra points.", "Bonus points", "forest"]],
        [13, 6, 6, 4, "D", "15R30R43H21I52E22H12H02H53H33H23H13H03H10H11H01H00H", 1, "011534561", ["Long press to bulldoze a tile you no longer need.", "Bulldoze", "dump"]],
        [14, 8, 8, 4, "D", "37R50R66I31F21722F34H64H60H40H30H20H10H00H54H44H24H14H04H77H76H75H74H73H72H71H70H17H16H15H13H12H11H07H06H05H03H02H01H", 1, "01205346711554413", ["There may be multiple ways to complete a level. Build a road past the heliport for extra points.", "Many ways", "sand"]]
    ],
    "Casual": [
        [200, 6, 6, 6, "C", "15R40R44D45D55H54H53H52H51H50H43D42D41D11F", 0, 0, 0],
        [100, 6, 6, 4, "C", "15R10R40D33H53H43D23H13H03H55H54H52H51H50H45D44D42D41D057", 0, 0, 0],
        [301, 7, 7, 4, "D", "56R02160H50H40H30H20H10H00H66H65H64H63H62H61H51H52I03F41E", 0, 0, 0],
        [400, 7, 7, 4, "C", "62S04S31D30D41D40H50H51D60H61D", 0, 0, 0]
    ]
};

function numberise(a){
    return Number(a);
}

function dec(char){
    return String(char).charCodeAt(0)-48;
}


Object.keys(levels).map(function(levelType){
    levels[levelType] = levels[levelType].map(function(level){
        level[5] = level[5].split('');
        var predef = [];
        while(level[5].length){
            var thisBit = level[5].splice(0,3);
            thisBit[0] = numberise(thisBit[0]);
            thisBit[1] = numberise(thisBit[1]);
            thisBit[2] = spriteIndex[dec(thisBit[2])];
            predef.push(thisBit);
        }
        return {
            seed: level[0],
            w: level[1],
            h: level[2],
            wMod: level[3],
            base: spriteIndex[dec(level[4])],
            predef : predef,
            strict: level[6],
            dist: level[7] ? level[7].split('').map(numberise) : undefined,
            intro: level[8],
        };
    });
});

console.log(JSON.stringify(levels, null, 2));

module.exports = levels;

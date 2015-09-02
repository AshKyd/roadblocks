/**
 * Minified levels
 * 12054 bytes without.
 * 12031 bytes with minification
 */
var spriteIndex = Object.keys(require('./sprites').sprites);
var levels = {"Puzzle":[["100-444C100000-23R20R127",["Connect from left to right by dragging tiles from the top.","New game","roady-base"]],["100-444C10312564-33R10R227237",["Now you've got the hang of it, give it a go with all the tiles.","Your turn","roadx"]],["8-444C104150000-13R30R00I",["The helipad can stack tiles for later. Use this to reverse the order of your tiles.","Helipad","helipad"]],["12-664C13611450013506-35R10R33723712713I",["Building road past special tiles like forests or the helipad gives you extra points.","Bonus points","forest"]],["13-664D1011534561-15R30R43H21I52E22H12H02H53H33H23H13H03H10H11H01H00H",["Long press to bulldoze a tile you no longer need.","Bulldoze","dump"]],["14-884D101205346711554413-37R50R66I31F21722F34H64H60H40H30H20H10H00H54H44H24H14H04H77H76H75H74H73H72H71H70H17H16H15H13H12H11H07H06H05H03H02H01H",["There may be multiple ways to complete a level. Build a road past the heliport for extra points.","Many ways","sand"]]],"Casual":[["200-666C00-15R40R44D45D55H54H53H52H51H50H43D42D41D11F"],["100-664C00-15R10R40D33H53H43D23H13H03H55H54H52H51H50H45D44D42D41D057"],["301-774D00-56R02160H50H40H30H20H10H00H66H65H64H63H62H61H51H52I03F41E"],["400-774C00-62S04S31D30D41D40H50H51D60H61D"]]};

function numberise(a){
    return Number(a);
}

function dec(char){
    return char.charCodeAt(0)-48;
}

Object.keys(levels).map(function(levelType){
    levels[levelType] = levels[levelType].map(function(level){
        var data = level[0].match(/^(.+)-(.)(.)(.)(.)(.)(.+)-(.+)$/);
        var predef = data[8].match(/.{3}|.{1,2}/g).map(function(thisBit){
            thisBit.split('');
            return [
                numberise(thisBit[0]),
                numberise(thisBit[1]),
                spriteIndex[dec(thisBit[2])]
            ];
        });
        return {
            seed: data[1],
            w: data[2],
            h: data[3],
            wMod: data[4],
            base: spriteIndex[dec(data[5])],
            strict: data[6],
            dist: data[7] ? data[7].split('').map(numberise) : 0,
            predef : predef,
            intro: level[1],
        };
    });
});

module.exports = levels;

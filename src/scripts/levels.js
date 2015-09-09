// FIXME: shim for loading spriteLib in nodejs
if(typeof window === 'undefined'){
    global.innerWidth = 0;
}
var SpriteLib = require('./sprites');

function addRow(a, x, max, type){
    for(var i=0;i<max;i++){
        a.push([x,i,type]);
    }
}
function addCol(a, y, max, type){
    for(var i=0;i<max;i++){
        a.push([i,y,type]);
    }
}

var roadBase = 'roady-base';
var forest = 'forest2';
var water = 'water';

var levels = {
    Puzzle: [
        { // intro level. 0
            seed: 100,
            w: 4,
            h: 4,
            strict: 1,
            base: 'grass',
            dist: [0,0,0,0,0],
            predef: [
                [2,3,roadBase],
                [2,0,roadBase],
                [1,2,forest],
            ],
            name: 'Roads 101',
            intro: ['Connect from left to right by dragging tiles from the top.', 'Left to right', roadBase],
        },
        { // introduction to intersections 1
            seed: 100,
            w: 4,
            h: 4,
            strict: 1,
            base: 'grass',
            dist: [0,3,1,2,5,6,4],
            predef: [
                [3,3,roadBase],
                [1,0,roadBase],
                [2,3,forest],
                [2,2,forest],
            ],
            name: 'Town planning',
            intro: ['Now you\'ve got the hang of it, give it a go with all the tiles.', 'Your turn', 'roadx'],
        },
        { // intro to helipads 2
            seed: 8,
            w: 4,
            h: 4,
            base: 'grass',
            strict: true,
            dist: [0,4,1,5,0,0,0,0],
            predef: [
                [1,3,roadBase],
                [3,0,roadBase],
                [0,0,'helipad'],
            ],
            name: 'Reverse the flow',
            intro: ['Use the helipad to reverse the order of your tiles.', 'Stack tiles for later', 'helipad']
        },
        { // first open level 3
            seed: 12,
            w: 6,
            h: 6,
            wMod:4,
            base: 'grass',
            strict: true,
            dist: [3, 6, 1, 1, 4, 5, 0,0,
                1,3,5,0,6 // Filler to prevent the level ending
            ],
            // dist: [2,3,4,5,6],
            predef: [
                [3,5,roadBase],
                [1,0,roadBase],
                [1,3,'helipad'],
                [1,2,forest],
                [2,3,'forest'],
                [3,3,forest],
            ],
            name: 'The Block Forest',
            intro: ['Building road past special tiles like forests or the helipad gives you extra points.', 'Bonus points', 'forest']
        },
        { // 4
            seed: 100,
            w:6,
            h:6,
            wMod:4,
            base: 'grass',
            dist: [
                'roadx2yl',
                'roady2xl',
                'roadx',
                'roadxy',
                'roadx2yl',
                'roadx2yr',
                'roady2xr',
                'roadx2yl',
                'roadx',
                'roady2xl',
                'roady2xr',
                'roady',
            ],
            predef: (function(){
                var a = [
                    [1,5,roadBase],
                    [1,0,roadBase],
                    [0,5,forest],
                ];
                addRow(a, 4, 6, 'sand');
                addRow(a, 5, 6, 'water');
                addCol(a, 3, 6, 'water');
                a.push([3,3,'broady']);
                a.push([4,0,'palm']);
                a.push([4,0,'palm']);
                return a;
            })(),
            name: '★ Bulldozer Beach',
            intro: ['Long press to bulldoze a tile you no longer need.', 'Bulldoze', 'dump'],
            outro: ['Congratulations. You\'ve unlocked <b>Free Map</b> mode from the main menu.', 'Free Map', 'dump'],
        },
        {
            seed:13,
            w:6,
            h: 6,
            wMod: 4,
            base: 'sand',
            strict: 1,
            dist: [0,1,1,5,3,4,5,6,1],
            predef: (function(){
                var a = [
                    [1,5,roadBase],
                    [3,0,roadBase],
                    [0,0,water],
                    [0,1,water],
                    [1,1,water],
                    [1,0,water],
                ];
                addCol(a, 3, 6, water);
                addCol(a, 2, 3, water);
                a.push([5,2,'palm']);
                a.push([2,1,'helipad']);
                a.push([4,3,'broady']);
                return a;
            })(),
            name: 'Palm Island',
        },

            { // 4
                seed: 200,
                w: 6,
                h:6,
                base:'grass',
                dist: [
                    'roady2xr',
                    'roady2xl',
                    'roady',
                    'roadx2yl',
                    'roadxy',
                    'roadx',
                    'roadxy',
                    'roadxy',
                    'roadx2yl',
                    'roady2xr',
                    'roadx2yr',
                    'roady2xl',
                    'roadx2yr',
                    'roadxy',
                ],
                predef: (function(){
                    var end = [4,0,'roady-base'];
                    var a = [
                        [1,5,'roady-base'],
                        end,
                        [1,1,'building'],
                    ];
                    addRow(a, 4, 6, 'sand');
                    addRow(a, 5, 6, 'water');
                    a.push(end); // double up, addBeach overwrote this
                    a.push([4,5,'palm']);
                    a.push([4,4,'palm']);
                    a.push([3,5,'helipad']);
                    return a;
                })(),
                name: 'Loopy Lagoon',
            },
            { // 6
                seed: 301,
                w:7,
                h:7,
                wMod: 4,
                base: 'sand',
                dist: [
                    'roady',
                    'roadx2yl',
                    'roadx2yl',
                    'roady2xr',
                    'roady2xl',
                    'roadx',
                    'roadx',
                    'roadx',
                    'roadxy',
                    'roadx',
                    'roadx',
                    'roadx2yr',
                    'roady',
                    'roadx',
                    'roadx',
                ],
                predef: (function(){
                    var a = [
                        [5,6,roadBase],
                        [0,2,'roadx-base'],
                        [4,1,'palm'],
                        [1,3,'water'],
                        [1,1,'water'],
                        [1,2,'broadx'],
                        [2,3,'water'],
                        [3,3,'palm'],
                        [0,3,'palm'],
                        [3,6,'building'],
                        [5,2,'helipad'],
                        [5,1,water],
                    ];
                    addRow(a, 6, 7, 'water');
                    addCol(a, 0, 7, 'water');
                    return a;
                })(),
                name: 'Mini Monaco',
            },
            { // 7
                seed: 400,
                w:7,
                h:7,
                wMod: 4,
                base:'grass',
                dist: [
                    'roadx2yr',
                    'roady2xl',
                    'roadx',
                    'roadx2yr',
                    'roadx',
                    'roadx2yr',
                    'roady',
                    'roady2xl',
                    'roady',
                ],
                predef: (function(){
                    var a = [
                        [6,2,'roadx-base'],
                        [0,4,'roadx-base'],
                        [6,1,'palm'],
                        [6,0,'water'],
                        [5,1,'sand'],
                        [5,0,'water'],
                        [4,0,'water'],
                        [4,1,'water'],
                        [4,2,'water'],
                        [3,2,'water'],
                        [3,3,'broadx'],
                        [3,4,'broadx'],
                        [3,5,'water'],
                        [3,6,'water'],
                        [2,6,'water'],
                        [1,6,'water'],
                        [4,6,'water'],
                        [4,5,'water'],
                        [3,0,'palm'],
                        [3,1,'sand'],
                        [2,5,'helipad'],
                        [1,1,'forest'],
                    ];
                    return a;
                })(),
                name: 'Dual Carriageway'
            },
            {
                seed: 14,
                w:8,
                h:8,
                wMod:4,
                base: 'sand',
                strict: 1,
                dist:[0,1,2,0,5,3,4,6,7,1,1,5,5,4,4,1,3],
                predef: (function(){
                    var a = [
                        [3,7,roadBase],
                        [5,0,roadBase],
                    ];
                    addRow(a,0,8,water);
                    addRow(a,1,8,water);
                    addRow(a,7,8,water);
                    addCol(a,4,7,water);
                    addCol(a,0,7,water);
                    a.push([5,0,'broady']);
                    a.push([6,4,'broady']);
                    a.push([2,2,'building']);
                    a.push([2,5,'palm']);
                    a.push([2,7,'palm']);
                    a.push([2,1,'forest']);
                    a.push([3,1,'building']);
                    a.push([6,6,'helipad']);

                    return a;
                })(),
                name: 'Little condo by the sea',
            },
    ],
    Free: [
        {
            seed:0,
            w:7,
            h:7,
            wMod: 4,
            base: 'grass',
            dist: 0,
            predef: [],
        }
    ]
};

// 3.61 kb - beginning
// 2.75 - after index
// 2.45 after combining predef array
//
var spriteIndex = Object.keys(SpriteLib.sprites);
var emergency = 0;

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

Object.keys(levels).forEach(function(key){
    levels[key] = levels[key].map(function(level, levelId){

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
    });
});
console.log(JSON.stringify(levels));
module.exports = levels;

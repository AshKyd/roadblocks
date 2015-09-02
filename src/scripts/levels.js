// FIXME: shim for loading spriteLib in nodejs
global.innerWidth = 0;
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
var forest = 'forest';
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
            intro: ['Connect from left to right by dragging tiles from the top.', 'New game', roadBase],
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
            intro: ['The helipad can stack tiles for later. Use this to reverse the order of your tiles.', 'Helipad', 'helipad']
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
                [2,3,forest],
                [3,3,forest],
            ],
            intro: ['Building road past special tiles like forests or the helipad gives you extra points.', 'Bonus points', 'forest']
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
            intro: ['Long press to bulldoze a tile you no longer need.', 'Bulldoze', 'dump'],
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
                a.push([3,4,'broady']);
                a.push([2,2,'building']);
                a.push([2,1,'forest']);
                a.push([3,1,'building']);
                a.push([6,6,'helipad']);

                return a;
            })(),
            intro: ['There may be multiple ways to complete a level. Build a road past the heliport for extra points.', 'Many ways', 'sand']
        }
    ],
    Casual: [
        { // 4
            seed: 200,
            w: 6,
            h:6,
            base:'grass',
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
                return a;
            })(),
        },
        { // 5
            seed: 100,
            w:6,
            h:6,
            wMod:4,
            base: 'grass',
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
                return a;
            })(),
        },
        { // 6
            seed: 301,
            w:7,
            h:7,
            wMod: 4,
            base: 'sand',
            predef: (function(){
                var a = [
                    [5,6,roadBase],
                    [0,2,'roadx'],
                    [4,1,'palm'],
                    [0,3,'building'],
                    [5,2,'helipad'],
                    [5,1,water],
                ];
                addRow(a, 6, 7, 'water');
                addCol(a, 0, 7, 'water');
                return a;
            })(),
        },
        { // 7
            seed: 400,
            w:7,
            h:7,
            wMod: 4,
            base:'grass',
            predef: (function(){
                var a = [
                    [6,2,'roadx-base'],
                    [0,4,'roadx-base'],
                    [6,1,'sand'],
                    [6,0,water],
                    [5,1,'sand'],
                    [5,0,water],
                    [4,0,water],
                    [4,1,'sand'],
                    [3,0,'sand'],
                    [3,1,'sand'],
                ];
                return a;
            })(),
        }
    ]
};

// 3.61 kb - beginning
// 2.75 - after index
// 2.45 after combining predef array
//
var spriteIndex = Object.keys(SpriteLib.sprites);
function enc(num){
    return String.fromCharCode(num+48);
}

Object.keys(levels).forEach(function(key){
    levels[key] = levels[key].map(function(level, levelId){

        // Remove duplicates.
        // * Keep only the latest instance of
        var exists = {};
        for(var i=level.predef.length-1; i>1; i--){
            var tile = level.predef[i];
            if(
                i > 1 &&
                (tile[0] !== level.predef[0][0] || tile[1] !== level.predef[0][1]) &&
                (tile[0] !== level.predef[1][0] || tile[1] !== level.predef[1][1])
            ){
                exists[tile[0]+'-'+tile[1]] = tile;
            } else {
                if(i>1){
                    console.log('skipping duplicate tile', tile, exists[tile[0]+'-'+tile[1]]);
                }
            }
        }
        var existsArr = Object.keys(exists).map(function(key){
            return exists[key];
        });

        existsArr.unshift(level.predef[1]);
        existsArr.unshift(level.predef[0]);

        console.log('Saved ',(level.predef.length - existsArr.length) * 3,'bytes');

        level.predef = existsArr;

        // Flatten
        level.predef = level.predef.map(function(predef){
            var index = spriteIndex.indexOf(predef[2]);
            predef[2] = enc(index);
            return predef.join('');
        }).join('');

        var entry = [
            level.seed,
            [
                level.w,
                level.h,
                level.wMod || level.w,
                enc(spriteIndex.indexOf(level.base)),
            ].join('') + level.predef,
            level.strict ? 1 : 0,
            level.dist ? level.dist.join('') : 0,
            level.intro ? level.intro : 0
        ];
        return entry;
    });
});
console.log(JSON.stringify(levels));

module.exports = levels;

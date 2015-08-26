function addBeach(a, x){
    for(var i=0;i<6;i++){
        a.push([x+1,i,'water']);
        a.push([x,i,'sand']);
    }
}

var roadBase = 'roady-base';
var forest = 'forest';

module.exports = [
    { // intro level. 0
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,0,0,0,0],
        bulldozers: 99,
        predef: [
            [2,3,roadBase],
            [2,0,roadBase],
            [1,3,forest],
        ],
        intro: ['Connect the roads by dragging tiles from the top.', 'New game', roadBase],
    },
    { // introduction to intersections 1
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,3,1,2,5,6,4],
        bulldozers: 99,
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
        bulldozers: 99,
        predef: [
            [1,3,roadBase],
            [3,0,roadBase],
            [0,0,'helipad'],
        ],
        intro: ['The helipad can stack tiles for later.', 'Helipad', 'helipad']
    },
    { // first open level 3
        seed: 12,
        w: 6,
        h: 6,
        wMod:4,
        base: 'grass',
        bulldozers: 99,
        predef: [
            [3,5,roadBase],
            [1,0,roadBase],
            [0,0,'helipad'],
            [1,2,'forest'],
            [2,3,'forest'],
            [3,3,'forest'],
        ],
    },
    { // 4
        seed: 200,
        w: 6,
        h:6,
        base:'grass',
        bulldozers: 99,
        predef: (function(){
            var end = [4,0,'roady-base'];
            var a = [
                [1,5,'roady-base'],
                end,
                [1,1,'building'],
            ];
            addBeach(a, 4);
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
        bulldozers: 99,
        predef: (function(){
            var a = [
                [1,5,roadBase],
                [1,0,roadBase],
                [0,5,forest],
            ];
            addBeach(a, 4);
            for(var i=0;i<6;i++){
                a.push([i,3,'water']);
            }
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
        bulldozers: 99,
        predef: (function(){
            var a = [
                [5,6,roadBase],
                [0,2,'roadx'],
                [4,1,'palm'],
                [0,3,'building'],
                [5,2,'helipad'],
                [5,1,'water'],
            ];
            for(var i=0; i<7; i++){
                a.push([i,0,'water']);
                a.push([6,i,'water']);
            }
            return a;
        })(),
    },
    { // 7
        seed: 400,
        w:7,
        h:7,
        wMod: 4,
        base:'grass',
        bulldozers: 99,
        predef: (function(){
            var a = [
                [6,2,'roadx'],
                [0,4,'roadx'],
                [6,1,'sand'],
                [6,0,'water'],
                [5,1,'sand'],
                [5,0,'water'],
                [4,0,'water'],
                [4,1,'sand'],
                [3,0,'sand'],
                [3,1,'sand'],
            ];
            return a;
        })(),
    }
];

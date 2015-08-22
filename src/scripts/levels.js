module.exports = [
    { // intro level.
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,0,0,0,0],
        bulldozers: 99,
        predef: [
            [2,3,'roady'],
            [2,0,'roady'],
            [1,3,'forest'],
        ],
        intro: ['Connect the roads by dragging tiles from the top.', 'New game', 'roady'],
    },
    { // introduction to intersections
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,3,1,2,5,6,4],
        bulldozers: 99,
        predef: [
            [3,3,'roady'],
            [1,0,'roady'],
            [2,3,'forest'],
            [2,2,'forest'],
        ],
        intro: ['Now you\'ve got the hang of it, give it a go with all the tiles.', 'Your turn', 'roadx'],
    },
    { // intro to helipads
        seed: 6,
        w: 4,
        h: 4,
        base: 'grass',
        bulldozers: 99,
        predef: [
            [1,3,'roady'],
            [3,0,'roady'],
            [0,0,'helipad'],
        ],
        intro: ['The helipad can stack tiles for later.', 'Helipad', 'helipad']
    },
    { // first open level
        seed: 7,
        w: 6,
        h: 6,
        base: 'grass',
        bulldozers: 99,
        predef: [
            [3,5,'roady'],
            [1,0,'roady'],
        ],
    },
    {
        seed: 100,
        w:6,
        h:6,
        base: 'grass',
        bulldozers: 99,
        predef: (function(){
            var a = [
                [1,5,'roady'],
                [1,0,'roady'],
            ];
            for(var i=0;i<6;i++){
                a.push([5,i,'water']);
                a.push([4,i,'sand']);
                a.push([i,3,'water']);
            }
            a.push([3,3,'broady']);
            return a;
        })(),
    },
];

module.exports = [
    {
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,0,0,0,0],
        bulldozers: 0,
        predef: [
            [2,3,'roady'],
            [2,0,'roady'],
            [1,3,'forest'],
            [0,0,'helipad'],
        ],
        intro: ['Connect the roads using the tiles provided.', 'New game', 'roady'],
    },
    {
        seed: 100,
        w: 4,
        h: 4,
        base: 'grass',
        dist: [0,3,1,2,5,7,6,4],
        bulldozers: 2,
        predef: [
            [3,3,'roady'],
            [1,0,'roady'],
            [2,3,'forest']
        ],
        intro: ['Now you\'ve got the hang of it, give it a go with all the tiles.', 'Your turn', 'roadx'],
    },
    {
        seed: 6,
        w: 4,
        h: 4,
        base: 'grass',
        bulldozers: 8,
        predef: [
            [1,3,'roady'],
            [3,0,'roady'],
        ],
    },
    {
        seed: 7,
        w: 6,
        h: 6,
        base: 'grass',
        bulldozers: 16,
        predef: [
            [3,5,'roady'],
            [1,0,'roady']
        ],
    }
];

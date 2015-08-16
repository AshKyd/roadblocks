/**
 * Sprites!
 *
 * There are several formats for these. They include:
 *
 * Regular box sprite:
 * z (vertical position),
 * x (x pos/top left to bottom right),
 * y (y pos top left to bottom left),
 * wx (width on the x axis),
 * wy (width on the y axis),
 * h (height on the x axis),
 * color (colour to show.)
 *
 * Sprite by reference:
 * ref (reference to another named sprite)
 * x (z position)
 * x (x position)
 * y (y position)
 */

var roadColor = '#444444';

module.exports = {
    sprites: {
        ground: [
            [-1,0, 0, 1, 1, 0.75, '#ae907a'],
        ],
        grassSurface: [
            [-0.25,0, 0, 1, 1, 0.25, '#66aa66'],
        ],
        grass: [
            ['ground',0,0,0],
            ['grassSurface',0,0,0],
        ],
        roady: [
            ['ground',0,0,0],
            [-0.25,.9, 0, 0.1, 1, 0.25, '#aaaaaa'],
            [-0.25,.1, 0, .8, 1, 0.2, roadColor],
            [-0.25,0, 0, 0.1, 1, 0.25, '#aaaaaa'],
        ],
        roadx: [
            ['ground',0,0,0],
            [-0.25, 0, .9, 1, 0.1, 0.25, '#aaaaaa'],
            [-0.25, 0, .1, 1, 0.8, 0.2, roadColor],
            [-0.25, 0, 0, 1, 0.1, 0.25, '#aaaaaa'],
        ],
        r1: [ // Top left road piece
            [-0.25, .9, .1, .1, .8, .2, roadColor],
        ],
        r2: [ // top right road piece
            [-0.25, .1, .9, .8, .1, .2, roadColor],
        ],
        r3: [ // bottom left road piece
            [-0.25, .1, 0, .8, .1, .2, roadColor],
        ],
        r4: [ /// bottom right road piece
            [-0.25, 0, .1, .1, .8, .2, roadColor],
        ],
        rc: [ // Road center piece
            [-0.25,.1,.1,.8,.8,.2,roadColor],
        ],
        roadxy: [
            [-0.25,0.9,0.9,0.1,.1,.25,'#aaaaaa'], // top
            ['r1', 0, 0, 0],
            [-0.25,0.9,0,0.1,.1,.25,'#aaaaaa'], //left
            ['r2', 0, 0, 0],
            ['rc', 0, 0, 0],
            ['r3', 0, 0, 0],
            [-0.25,0,0.9,0.1,.1,.25,'#aaaaaa'], //right
            ['r4', 0, 0, 0],
            [-0.25,0,0,0.1,.1,.25,'#aaaaaa'], // bottom
        ],
        roadx2yl: [
            [-0.25,.1,.9, .9, .1, .25, '#aaaaaa'],
            ['r1', 0, 0, 0],
            [-0.25,0.9,0,0.1,.1,.25,'#aaaaaa'], //left
            [-0.25,0,0.9,0.1,.1,.25,'#aaaaaa'], //right
            ['rc', 0, 0, 0],
            ['r3', 0, 0, 0],
            [-0.25,0,0, .1, .9, .25, '#aaaaaa'],
        ],
        roadx2yr: [
            [-0.25,0.9,0.9,0.1,.1,.25,'#aaaaaa'], // top
            ['r2', 0, 0, 0], // top right
            ['r1', 0, 0, 0], // top left
            ['rc', 0, 0, 0], // center
            [-.25,.1,0,.9,.1,.25,'#aaaaaa'],
            [-.25,0,.1,.1,.9,.25,'#aaaaaa'],
            [-0.25,0,0,0.1,.1,.25,'#aaaaaa'], // bottom
        ],
        roady2xl: [
            [-0.25,0.9,0.9,0.1,.1,.25,'#aaaaaa'], // top
            [-0.25,0,.9,.9,.1,.25,'#aaaaaa'], // top right
            [-0.25,.9,0,.1,.9,.25,'#aaaaaa'], // top right
            ['rc',0,0,0], //road center
            ['r3', 0,0,0], //bottom left
            ['r4',0,0,0], //bottom right
            [-0.25,0,0,0.1,.1,.25,'#aaaaaa'], // bottom
        ],
        roady2xr: [
            [-0.25,0.9,.1,0.1,.9,.25, '#aaaaaa'],
            ['r2', 0, 0, 0], // top right
            ['rc',0,0,0], //center
            [-0.25,0.9,0,0.1,.1,.25,'#aaaaaa'], //left
            [-0.25,0,0.9,0.1,.1,.25,'#aaaaaa'], //right
            ['r4',0,0,0], //bottom right
            [-0.25,0,0,.9,.1,.25,'#aaaaaa'],

        ],
        test: [
            [-1,0,0,1,1,1,'#aaaaaa'],
            [0,0,0,0.1,.1,.1,'#FF8888'],
            [0,0.9,0,0.1,.1,.1,'#FF8888'],
            [0,0,0.9,0.1,.1,.1,'#FF8888'],
            [0,0.9,0.9,0.1,.1,.1,'#FF8888'],
        ],
        test2: [
            [-1,0,0,1,1,1,'#aaaaaa'],
            [0,0.3,0,0.7,1,1,'#cccccc'],
            [1,0,0,1,1,0.1,'#FF8888'],
            [0,0.3,.4,0,0.2,0.5,'#FF8888'],
        ],
        water: [
            [-1, 0, 0, 1, 1, .05, '#ffff99'],
            [-0.25, 0, 0, 1, 1, 0, '#55bbff', .3],
        ],
        forest: [
            ['ground',0,0,0],
            ['grassSurface',0,0,0],
            ['tree', 0, .3,.8],
            ['tree', 0, .6,.5],
            ['tree', 0, .4,.2],
        ],
        tree: [
            [0, -.05, -.05, .1, .1, .2, '#C8AF9E'],
            [.2, -0.15, -0.15, .3, .3, .05, '#9EC8A0'],
            [.3, -0.13, -0.13, .26, .26, .05, '#9EC8A0'],
            [.4, -0.11, -0.11, .22, .22, .05, '#9EC8A0'],
            [.5, -0.08, -0.08, .16, .16, .05, '#9EC8A0'],
            [.6, -0.05, -0.05, .1, .1, .05, '#9EC8A0'],
        ]
    }
};

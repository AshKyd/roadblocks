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
var elkColor = '#AE907A';
var grey1 = '#aaaaaa';
var red1 = '#DC6969';

function canPlaceIfDefaultTile(existing){
    return ['grass'].indexOf(existing) !== -1;
}

module.exports = {
    sprites: {
        roady: [
            [-0.25,.9, 0, 0.1, 1, 0.25, grey1],
            [-0.25,.1, 0, .8, 1, 0.2, roadColor],
            [-0.25,0, 0, 0.1, 1, 0.25, grey1],
            ['car',0,.3,.2],
        ],
        roadx: [
            [-0.25, 0, .9, 1, 0.1, 0.25, grey1],
            [-0.25, 0, .1, 1, 0.8, 0.2, roadColor],
            [-0.25, 0, 0, 1, 0.1, 0.25, grey1],
        ],
        roadxy: [
            [-0.25,0.9,0.9,0.1,.1,.25,grey1], // top
            ['r1', 0, 0, 0],
            [-0.25,0.9,0,0.1,.1,.25,grey1], //left
            ['r2', 0, 0, 0],
            ['rc', 0, 0, 0],
            ['r3', 0, 0, 0],
            [-0.25,0,0.9,0.1,.1,.25,grey1], //right
            ['r4', 0, 0, 0],
            [-0.25,0,0,0.1,.1,.25,grey1], // bottom
        ],
        roadx2yl: [
            [-0.25,.1,.9, .9, .1, .25, grey1],
            ['r1', 0, 0, 0],
            [-0.25,0.9,0,0.1,.1,.25,grey1], //left
            [-0.25,0,0.9,0.1,.1,.25,grey1], //right
            ['rc', 0, 0, 0],
            ['r3', 0, 0, 0],
            [-0.25,0,0, .1, .9, .25, grey1],
        ],
        roadx2yr: [
            [-0.25,0.9,0.9,0.1,.1,.25,grey1], // top
            ['r2', 0, 0, 0], // top right
            ['r1', 0, 0, 0], // top left
            ['rc', 0, 0, 0], // center
            [-.25,.1,0,.9,.1,.25,grey1],
            [-.25,0,.1,.1,.9,.25,grey1],
            [-0.25,0,0,0.1,.1,.25,grey1], // bottom
        ],
        roady2xl: [
            [-0.25,0.9,0.9,0.1,.1,.25,grey1], // top
            [-0.25,0,.9,.9,.1,.25,grey1], // top right
            [-0.25,.9,0,.1,.9,.25,grey1], // top right
            ['rc',0,0,0], //road center
            ['r3', 0,0,0], //bottom left
            ['r4',0,0,0], //bottom right
            [-0.25,0,0,0.1,.1,.25,grey1], // bottom
        ],
        roady2xr: [
            [-0.25,0.9,.1,0.1,.9,.25, grey1],
            ['r2', 0, 0, 0], // top right
            ['rc',0,0,0], //center
            [-0.25,0.9,0,0.1,.1,.25,grey1], //left
            [-0.25,0,0.9,0.1,.1,.25,grey1], //right
            ['r4',0,0,0], //bottom right
            [-0.25,0,0,.9,.1,.25,grey1],

        ],
        forest: [
            ['ground',0,0,0],
            ['grassSurface',0,0,0],
            ['tree', 0, .3,.8],
            ['tree', 0, .6,.5],
            ['tree', 0, .4,.2],
            ['elk', 0, .1,.1],
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
        ground: [
            [-1,0, 0, 1, 1, 0.75, '#ae907a'],
        ],
        grassSurface: [
            [-0.25,0, 0, 1, 1, 0.25, '#66aa66'],
        ],
        concreteSurface: [
            [-0.25,0, 0, 1, 1, 0.25, grey1],
        ],
        grass: [
            ['ground',0,0,0],
            ['grassSurface',0,0,0],
        ],
        test: [
            [-1,0,0,1,1,1,grey1],
            [0,0,0,0.1,.1,.1,red1],
            [0,0.9,0,0.1,.1,.1,red1],
            [0,0,0.9,0.1,.1,.1,red1],
            [0,0.9,0.9,0.1,.1,.1,red1],
        ],
        test2: [
            [-1,0,0,1,1,1,grey1],
            [0,0.3,0,0.7,1,1,'#cccccc'],
            [1,0,0,1,1,0.1,red1],
            [0,0.3,.4,0,0.2,0.5,red1],
        ],
        water: [
            [-1, 0, 0, 1, 1, .05, '#ffff99'],
            [-0.25, 0, 0, 1, 1, 0, '#55bbff', .3],
        ],
        helipad: [
            ['ground',0,0,0],
            ['concreteSurface',0,0,0],
            [0, .05, .05, .9, .9, 0.05, grey1],
            [0.05, .2, .2, .6, .1, 0, red1],
            [0.05, .2, .7, .6, .1, 0, red1],
            [0.05, .45, .3, .1, .4, 0, red1]
        ],
        tree: function(){
            var sin = Math.sin(new Date()/300);
            var sin2 = Math.sin(new Date()/150);
            var a = [
                [0, -.05, -.05, .1, .1, .2, '#C8AF9E'] // trunk
            ];

            for(var i=5; i>0; i--){
                a.push([
                    .6 - i/11 + sin2*(5-i)/500,
                    -0.15 + sin*(5-i)/300,
                    -0.15 + 0-sin*(5-i)/300,
                    (i)/25,
                    (i)/25,
                    0.05,
                    '#9EC8A0'
                ]);
            }
            return a;
        },
        car: function(){
            var sin = Math.sin(new Date() / 25)+1;
            var startHeight = sin/200 + 0.05;
            var color = '#A47BAF';
            var a = [
                [0, -.11, -0.14, .1, .1, .1, '#222222'],
                [0, -.11, 0.08, .1, .1, .1, '#222222'],
                [startHeight, -0.13, -0.2, 0.26, 0.4, 0.1, color],
                [startHeight+0.1, -0.13, -0.13, 0.26, 0.26, 0.1, '#D4ECF1'],
                [startHeight+0.2, -0.13, -0.13, 0.26, 0.26, 0.01, color],
            ];
            return a;
        },
        elk: function(){
            var sin = Math.sin(new Date()/1000);
            var headHeight = sin > 0 ? 0.05 : 0.15;
            return [
                // tail
                [.15, .09, 0, .02, .02, .05, elkColor],

                // legs
                [0, -.05, -.05, .02, .02, .1, elkColor],
                [0, -.05, .03, .02, .02, .1, elkColor],
                [0, .05, -.05, .02, .02, .1, elkColor],

                // body
                [.1, -.08, -.05, .16, .1, .1, elkColor],

                // Head
                [headHeight, -.08, 0.02, 0.04, 0.04, 0.04, elkColor],

                // Antlers 1
                [headHeight+0.04, -.08, 0, .01, .01, .1, elkColor],
                [headHeight+0.09, -.08, -0.04, .01, .02, .02, elkColor],
                [headHeight+0.10, -.08, -0.04, .01, .01, .05, elkColor],

                // Antlers 2
                [headHeight+0.09, -.08, 0.06, .01, .02, .02, elkColor],
                [headHeight+0.1, -.08, 0.08, .01, .01, .05, elkColor],
                [headHeight+0.04, -.08, 0.04, .01, .01, .1, elkColor],
            ];
        }
    },
    placeable: {
    	roady: {
            c: [0,1,0,1], // Connections,,
            p: canPlaceIfDefaultTile, // Is placeable?
        },
    	roadx: {
            c: [1,0,1,0],
            p: canPlaceIfDefaultTile,
        },
    	roadxy: {
            c: [1,1,1,1],
            p: canPlaceIfDefaultTile,
            firstrun: 'Cars will travel straight through intersections without making turns. You can double back over road you\'ve already placed.',
            title: 'Intersection'
        },
    	roadx2yl: {
            c: [1,0,0,1],
            p: canPlaceIfDefaultTile,
        },
    	roadx2yr: {
            c: [1,1,0,0],
            p: canPlaceIfDefaultTile,
        },
    	roady2xl: {
            c: [0,0,1,1],
            p: canPlaceIfDefaultTile,
        },
    	roady2xr: {
            c: [0,1,1,0],
            p: canPlaceIfDefaultTile,
        },
    	forest: {
            p: function(){return true;}, // Forests can be placed anywhere.
            title: 'Forests',
            firstrun: "Forest tiles can be placed on top of any square on the map, including ones you've already placed."
        },
        test: {
            p: canPlaceIfDefaultTile,
            title: 'Buildings',
            firstrun: "Place buildings alongside roads for extra points."
        }
    }
};

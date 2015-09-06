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
 * opacity (0-1, optional)
 *
 * Sprite by reference:
 * ref (reference to another named sprite)
 * x (z position)
 * x (x position)
 * y (y position)
 */

var exaggeration = innerWidth < 800 ? 2 : 1;

var random = require('./random');
var roadColor = '#444444';
var elkColor = '#AE907A';
var grey1 = '#aaaaaa';
var red1 = '#DC6969';
var glass = '#D4ECF1';
var yellow = '#FAB41D';
var black = '#000000';
var green1 = '#66aa66'; // Grass et al
var greenTree = '#9EC8A0'; // trees
var yellowSand = '#D6D38C';
var brown1 = '#C8AF9E'; // tree trunk

var sprites =  {
    roady: [
        [-0.25,.9, 0, 0.1, 1, 0.25, grey1],
        [-0.25,.1, 0, .8, 1, 0.2, roadColor],
        [-0.25,0, 0, 0.1, 1, 0.25, grey1],
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
    broadx: [ // bridge x
        ['water',0,0,0],
        ['roadx',0,0,0],
        [0,0,0,1,0,.1,grey1],
        [0,0,1,1,0,.1,grey1],
    ],
    broady: [ // bridge y
        ['water',0,0,0],
        ['roady',0,0,0],
        [0,0,0,0,1,.1,grey1],
        [0,1,0,0,1,.1,grey1],
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
        [-0.25,0, 0, 1, 1, 0.25, green1],
    ],
    sandSurface: [
        [-0.25,0, 0, 1, 1, 0.25, yellowSand],
    ],
    concreteSurface: [
        [-0.25,0, 0, 1, 1, 0.25, grey1],
    ],
    grass: [
        ['ground',0,0,0],
        ['grassSurface',0,0,0],
    ],
    sand: [
        ['ground',0,0,0],
        ['sandSurface',0,0,0],
    ],
    palm: [
        ['ground',0,0,0],
        ['sandSurface',0,0,0],
        ['treePalm', 0, .8, .8],
        ['treePalm', 0, .4, .4],
    ],
    building: [
        ['ground',0,0,0],
        ['grassSurface',0,0,0],

        // house
        [0,.2,.4,.8,.6,.8,brown1],

        // garage
        [0,.3,0,.7,.4,.4,brown1],

        //garage door
        [0,.3,.05,0,.3,.35,grey1],

        // windows
        [.05,.2,.75,0,.2,.28,glass], //bottom
        [.4,.2,.75,0,.2,.28,glass], // top
        [0,.2,.5,0,.2,.68,glass], // tall window
    ],
    test2: [],
    water: [
            [-1, 0, 0, 1, 1, .1, '#ffff99'],
            [-0.25, 0, 0, 1, 1, 0, '#55bbff', .3],
    ],
    helipad: [
        ['ground',0,0,0],
        ['concreteSurface',0,0,0],

        // rear red light
        [0,0.95,0.95,0.05,.05,.1,red1],

        [0, .05, .05, .9, .9, 0.05, grey1],
        [0.05, .2, .2, .6, .1, 0, red1],
        [0.05, .2, .7, .6, .1, 0, red1],
        [0.05, .45, .3, .1, .4, 0, red1],

        [0,0,0,0.05,.05,.1,red1],
        [0,0.95,0,0.05,.05,.1,green1],
        [0,0,0.95,0.05,.05,.1,green1],
    ],
    dump: [
        ['ground',0,0,0],
        [-0.25,0, 0, 1, 1, 0.25, brown1],
        ['bulldozer',0,.5,.5],
        [0,.1,.2,.1,.1,.1,brown1],
        [0,.35,.25,.1,.1,.1,brown1],
        [0,.3,.4,.1,.1,.1,brown1],
    ],
    ok: [
        [0,0,0,1,1,0,'#00ff00',.5]
    ],
    notok: [
        [0,0,0,1,1,0,red1,.5]
    ],
    tree: function(){
        var sin = Math.sin(new Date()/300);
        var sin2 = Math.sin(new Date()/150);
        var a = [
            [0, -.05, -.05, .1, .1, .2, brown1] // trunk
        ];

        for(var i=5; i>0; i--){
            a.push([
                .6 - i/11 + sin2*(5-i)/500,
                -0.15 + sin*(5-i)/300,
                -0.15 + 0-sin*(5-i)/300,
                (i)/25,
                (i)/25,
                0.05,
                greenTree
            ]);
        }
        return a;
    },
    treePalm: function(){
        var sin = Math.sin(new Date()/300)/150;
        var a = [];
        var pos,height;
        for(var i=0; i<6; i++){
            a.push([height=5*i/50, pos=0-sin*i*exaggeration, 0, .03, .03, .1, brown1]);
        }

        // treetop
        a.push([height,.05+pos,0,.02,.15,.02,greenTree]);
        a.push([height,0+pos,0,.2,.08,.05,greenTree]);
        a.push([height-0.05,-.2+pos,0,.2,.05,.05,greenTree]);
        a.push([height,0+pos,0,.05,.25,.02,greenTree]);
        a.push([height,0+pos,-.2,.05,.2,.02,greenTree]);
        a.push([height,-.05+pos,-.15,.02,.15,.02,greenTree]);
        return a;
    },

    // Aw, car! You'll be missed.
    // car: function(){
    //     var sin = Math.sin(new Date() / 25)+1;
    //     var startHeight = sin/200 + 0.05;
    //     var color = '#A47BAF';
    //     var a = [
    //         [0, -.11, -0.14, .1, .1, .1, '#222222'],
    //         [0, -.11, 0.08, .1, .1, .1, '#222222'],
    //         [startHeight, -0.13, -0.2, 0.26, 0.4, 0.1, color],
    //         [startHeight+0.1, -0.13, -0.13, 0.26, 0.26, 0.1, glass],
    //         [startHeight+0.2, -0.13, -0.13, 0.26, 0.26, 0.01, color],
    //     ];
    //     return a;
    // },
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
    },
    bulldozer: function(){
        var sin = Math.sin(new Date()/500);
        var headHeight = 0-Math.min(0,sin) * 0.1;
        return [
            [0,0,.1,.3,.3,.1, grey1], // track
            [0.02,0,.12,0,.06,.06, black],
            [0.02,0,.22,0,.06,.06, black],
            [0.02,0,.32,0,.06,.06, black],
            [0.04,0,.1,0,.3,.02,yellow],
            [0.04,0,.1,.3,0,.02,black],

            [.12,0,.1,.3,.3,.25, '#FAB41D'], // cabin
            [.15,0,.12,0,.1,.2, glass], // door
            [.2,0,.25, 0, .13, .15, glass], // right window
            [.2,.03,.1, .25, 0, .15, glass],

            // bucket
            [headHeight,0,.07,.3,.01,.1, grey1], // back
            [headHeight,.29,0,.01,.08, .1,grey1], // far side
            [headHeight,0,0,.3,.08,.01,grey1], //bottom
            [headHeight,0,0,.01,.08, .1, yellow], // near side

            // Tray
            [headHeight/2+0.01,.05,.1,0,.1,.05,yellow],
            [headHeight/4+0.025,.05,.2,0,.1,.05,yellow],
        ]
    }
};
Object.keys(sprites).map(function(spriteName){
    if(spriteName.indexOf('road') === 0){
        sprites[spriteName+'-base'] = sprites.ground.concat(sprites[spriteName]);
    }
});


function canPlaceIfDefaultTile(existing){
    return ['grass', 'sand'].indexOf(existing) !== -1;
}

var tileLogic = {
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
        p: function(tile){
            if(tile !== 'water'){
                return true;
            }
        }, // Forests can be placed anywhere.
        title: 'Forests',
        firstrun: "Forest tiles can be placed on top of any square on the map, including ones you've already placed.",
        points: 50
    },
    building: {
        p: canPlaceIfDefaultTile,
        title: 'Buildings',
        firstrun: "Place buildings alongside roads for extra points.",
        points: 100
    },
    dump: 1,
    helipad: 1,
    water: 1,
    sand: 1,
    palm: 1,
    broadx: 1,
    broady: 1,
};

// Get a list of placeables
var placeable = Object.keys(tileLogic);

// Copy over the logic for bridges & road tiles with bases.
placeable.map(function(spriteName){
    if(spriteName.indexOf('road') === 0){
        tileLogic[spriteName+'-base'] = tileLogic[spriteName];
        tileLogic['b'+spriteName] = tileLogic[spriteName];
    }
});

tileLogic.helipad = {
    points: 500
};

// These tiles are animated, no others.
// Note: doesn't seem to affect render speed that much.
var animated = {
    forest: 1,
    sand: 1,
    helipad: 1,
    tree: 1,
    elk: 1,
    palm: 1,
    dump: 1,
};

module.exports = {
    sprites: sprites,
    placeable: placeable,
    tileLogic: tileLogic,
    animated: animated,
};

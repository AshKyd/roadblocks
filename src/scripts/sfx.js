var ac = window.AudioContext || window.webkitAudioContext;
if(!ac){
    module.exports = function(){};
    return;
}
var context = new ac();

var jsfxr = require('./jsfxr');
var audioCache = {};
[
    ['select', [2,,0.11015387261286379,0.4,0.12941028638742866,0.25,,0,,0,,0,,0,,0,,0,1,,0,0.1,,1]],
    ['place', [3,,0.30,0.25,,0.08,,-0.3,,0,,0,,0,,0,,0,1,,0,,0,0.35]],
    ['ping', [2,,0.1,0.4,0.09,0.44,,0,,0,,0,,0,,0,,0,1,,0,0.1,,0.5]],
    ['dialog', [2,,0.04,0.4,0.28,0.35,,0.2,,0.15,0.25,,0,0.33,,0.62,,0,1,,0,,0,0.5]],
    ['win', [2,,0.14,0.4,0.5,0.56,,0,,0,,0,,0.08,,0,,0,1,,0,0.1,,0.35]],
    ['boom', [3,,0.39,0.73,0.38,0.06,,0.14,,0,,0,,0,,0,,0,1,,0,,0,0.3]],
    // ['…',[2,,0.2561,,0.4667,0.3152,,0.1037,,0.2768,0.1347,,,0.236,,,,,1,,,,,0.8]],
    ['error',[1,,0.15,,,0.1,,,,,,,,,,,,,1,,,0.1,,0.4]],
    ['thud', [3,,0.11,0.47,0.15,0.09,,-0.30,,0,,0,,0,,0,,0,1,,0,,0,0.35]],
    ['bloop',[2,,0.25,0.4,0.15,0.2,,0.24,,0.04,0.3,,0,,0,,0,,1,,0,,0,.5]],
].forEach(function(sound){
    context.decodeAudioData(base64ToArrayBuffer(jsfxr(sound[1])), function(buffer){
        audioCache[sound[0]] = buffer;
    });
});

function base64ToArrayBuffer(base64) {
    var binary_string = atob(base64.substr(base64.indexOf(',')+1));
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

module.exports = function(soundName, delay){
    if(audioCache[soundName]){
        var source = context.createBufferSource();
        source.buffer = audioCache[soundName];
        source.connect(context.destination);
        delay = context.currentTime + (delay||0);
        source.start(delay);
    }
};

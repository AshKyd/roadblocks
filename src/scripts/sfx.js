var context = new (window.AudioContext || webkitAudioContext)();
//
// function getSound(url, cb){
//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.responseType = 'arraybuffer';
//
//     // Decode asynchronously
//     request.onload = function() {
//         context.decodeAudioData(request.response, cb, function(){});
//     };
//     request.send();
// }
//
// module.exports = function(soundName){
//     getSound('sfx/'+soundName+'.mp3', function(buffer){
//         var source = context.createBufferSource();
//         source.buffer = buffer;
//         source.connect(context.destination);
//         source.start();
//     });
// };


var jsfxr = require('./jsfxr');
var audioCache = {};
[
    ['select', [2,,0.11015387261286379,0.4,0.12941028638742866,0.25,,0,,0,,0,,0,,0,,0,1,,0,0.1,,1]],
    ['place', [3,,0.29958691908977925,0.24998479099012913,,0.08092102555013424,,-0.2992503706365824,,0,,0,,0,,0,,0,1,,0,,0,0.35]],
    ['ping', [2,,0.1,0.4,0.09,0.44,,0,,0,,0,,0,,0,,0,1,,0,0.1,,0.5]],
    ['dialog', [2,,0.03907810496166349,0.4,0.2762778065167367,0.35,,0.2,,0.15,0.25,,0,0.33162839636206626,,0.6155771245248616,,0,1,,0,,0,0.5]],
    ['win', [2,,0.1393102065427229,0.4,0.5,0.5621204397641122,,0,,0,,0,,0.0826912431512028,,0,,0,1,,0,0.1,,0.35]],
    ['boom', [3,,0.39187858989462254,0.7338953506201507,0.38468894083052874,0.06417770449007988,,0.1376365752890706,,0,,0,,0,,0,,0,1,,0,,0,0.3]]
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
    } else {
        console.log('sound missing', soundName);
    }
};

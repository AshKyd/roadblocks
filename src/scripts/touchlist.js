module.exports = function(e){
    var originalTouch = e.touches || [e];
    return {
        clientX: originalTouch[0].clientX,
        clientY: originalTouch[0].clientY,
        is: e.touches
    };
};

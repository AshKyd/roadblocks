var Stats = require('stats.js');
var statsTypes = [0];

module.exports = function(){
    var _this = this;
    this.counters = [];
    statsTypes.forEach(function(i){
        var stats = new Stats();
        stats.setMode(i);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = (i * 90) + 'px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        _this.counters[i] = stats;
    });
};

module.exports.prototype = {
    begin: function(){
        var _this = this;
        statsTypes.forEach(function(i){
            _this.counters[i].begin();
        });
    },
    end: function(){
        var _this = this;
        statsTypes.forEach(function(i){
            _this.counters[i].end();
        });
    }
};

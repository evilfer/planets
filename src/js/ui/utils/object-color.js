module.exports = function () {
    var THREE = require('three');

    return function (obj, l) {
        return new THREE.Color().setHSL(obj.ui.color.h / 255, obj.ui.color.s / 255, l);
    };

}();

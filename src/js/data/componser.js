module.exports = function () {
    'use strict';

    var fs = require('fs'),
        base = require('../../../data/objects.json'),


        compose = function () {
            fs.readFile('./data/objects.json', function (err, data) {
                if (err) {
                    throw err;
                }

                var objects = JSON.parse(data.toString());

                for (var id in objects) {
                    if (objects.hasOwnProperty(id) && objects[id].parent) {
                        load(objects, id);
                    }
                }
            });
        };

    return {
        compose: compose
    };

}();

var fs = require('fs'),

    parser = require('../src/js/data/parser'),

    load = function (objects, id) {
        var data = fs.readFileSync('./data/ephemerides/' + id + '.txt'),
            txt = data.toString();

       objects[id].points = parser.encoded(txt);
    },

    compose = function () {
        var json = fs.readFileSync('./data/base.json'),
            data = JSON.parse(json),
            objects = data.objects;

        for (var id in objects) {
            if (objects.hasOwnProperty(id) && objects[id].parent) {
                load(objects, id);
            }
        }

        fs.writeFileSync('./data/data.json', JSON.stringify(data));
    };

compose();

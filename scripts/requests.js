var fs = require('fs'),

    parser = require('../src/js/data/parser'),
    dates = require('../src/js/maths/dates'),

    makeRequest = function (t0, t1, object, id) {
        var gap = object.gap,
            totalTime = t1 - t0,
            end = t0 + gap * (Math.floor(totalTime / gap) + 1);

            txtGap = gap < 0 ? (gap * 24) + ' h' : gap + ' d',

            start = dates.mjd2date(t0),
            end = date.mjd2date(t1),
            txt = data.toString();

        objects[id].points = parser.parse(txt);

        fs.writeFileSync('./build/dev/data.json', JSON.stringify(data));
    },

    makeRequests = function () {
        var json = fs.readFileSync('./data/base.json'),
            data = JSON.parse(json),
            objects = data.objects;

        for (var id in objects) {
            if (objects.hasOwnProperty(id) && objects[id].parent) {
                makeRequest(objects[id], id);
            }
        }
    };

compose();

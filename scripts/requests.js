var fs = require('fs'),

    parser = require('../src/js/data/parser'),
    dates = require('../src/js/maths/dates'),

    makeRequest = function (t0, t1, object, id) {

        var gap = object.step,
            totalTime = t1 - t0,
            sd = dates.mjd2date(t0),
            end = t0 + gap * Math.floor(totalTime / gap) + Math.max(gap, 1),
            ed = dates.mjd2date(end),

            txtGap = gap < 1 ? (gap * 24) + ' h' : gap + ' d',

            txt = "!$$SOF\n" +
                "COMMAND= '" + id + "'\n" +
                "CENTER= '500@0'\n" +
                "MAKE_EPHEM= 'YES'\n" +
                "TABLE_TYPE= 'VECTORS'\n" +
                "START_TIME= '" + sd.year + "-" + sd.month + "-" + sd.day + "'\n" +
                "STOP_TIME= '" + ed.year + "-" + ed.month + "-" + ed.day + "'\n" +
                "STEP_SIZE= '" + txtGap + "'\n" +
                "OUT_UNITS= 'KM-S'\n" +
                "VECT_TABLE= '2'\n" +
                "REF_PLANE= 'ECLIPTIC'\n" +
                "REF_SYSTEM= 'J2000'\n" +
                "VECT_CORR= 'NONE'\n" +
                "VEC_LABELS= 'NO'\n" +
                "CSV_FORMAT= 'NO'\n" +
                "OBJ_DATA= 'NO'\n" +
                "!$$EOF\n";

        fs.writeFileSync('./data/requests/' + id + '.txt', txt);
    },

    makeRequests = function () {
        var json = fs.readFileSync('./data/base.json'),
            data = JSON.parse(json),
            objects = data.objects;

        for (var id in objects) {
            if (objects.hasOwnProperty(id) && objects[id].parent) {
                makeRequest(data.t0, data.t1, objects[id], id);
            }
        }
    };

makeRequests();

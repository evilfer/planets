(function () {
    'use strict';

    var express = require('express'),
        logger = require('morgan'),

        server,
        app = express();


    app.use(logger('dev'));
    app.use(express.static('./build/dev/'));

    server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });

})();


!function () {
    'use strict';

    var React = require('react'),
        SceneManager = require('./ui/components/3d/scene-manager.jsx'),
        data = require('../../data/data.json');

    React.render(
        <SceneManager ephemerides={data}/>,
        document.getElementById('content')
    );

}();

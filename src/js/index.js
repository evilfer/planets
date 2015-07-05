!function () {
    'use strict';

    var React = require('react'),
        SceneManager = require('./ui/components/3d/scene-manager.jsx');

    React.render(
        <SceneManager />,
        document.getElementById('content')
    );

}();

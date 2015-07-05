module.exports = function () {
    'use strict';

    var React = require('react'),
        THREE = require('three'),
        ReactTHREE = require('react-three'),
        Mesh = ReactTHREE.Mesh,
        Scene = ReactTHREE.Scene,
        OnResize = require("react-window-mixins").OnResize,

        PlanetsCamera = require('./planets-camera.jsx'),
        PlanetSphere = require('./planet-sphere.jsx'),
        Orbit = require('./orbit.jsx');

    return React.createClass({
        mixins: [OnResize],

        render: function () {
            var name = 'scene',
                window = this.state.window;

            var sphereGeometry = new THREE.SphereGeometry(1, 32, 32),
                imageMaterial = new THREE.MeshBasicMaterial({
                    color: 'red'
                }),
                position = THREE.Vector3(0, 0, 0);


            return (
                <Scene camera={name} width={window.width} height={window.height}>
                    <PlanetsCamera name={name} window={window}/>
                    <PlanetSphere />
                    <Orbit />
                </Scene>
            );
        }
    });
}();


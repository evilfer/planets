module.exports = function () {
    'use strict';

    var React = require('react'),
        THREE = require('three'),
        PerspectiveCamera = require('react-three').PerspectiveCamera;

    return React.createClass({

        render: function () {

            var lookAt = new THREE.Vector3(0, 0, 0),
                pos = new THREE.Vector3(0, 0, 10),
                up = new THREE.Vector3(0, 1, 0);

            return (
                <PerspectiveCamera name={this.props.name}
                                   aspect={this.props.window.width/this.props.window.height}
                                   near={1} far={1000}
                                   position={pos} lookat={lookAt} up={up}/>
            );
        }
    });
}();
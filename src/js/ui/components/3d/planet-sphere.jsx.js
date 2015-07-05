module.exports = function () {
    'use strict';

    var React = require('react'),
        ReactTHREE = require('react-three'),
        THREE = require('three'),
        Mesh = ReactTHREE.Mesh;

    return React.createClass({

        render: function () {
            var sphereGeometry = new THREE.SphereGeometry(.1, 32, 32),
                material = new THREE.MeshBasicMaterial({
                    color: 'red'
                }),
                position = THREE.Vector3(0, 0, 0);


            return (
                <Mesh geometry={sphereGeometry}
                      material={material}
                      position={position}/>
            );
        }

    });
}();
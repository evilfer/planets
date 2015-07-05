module.exports = function () {
    'use strict';

    var React = require('react'),
        ReactTHREE = require('react-three'),
        THREE = require('three'),
        Line = ReactTHREE.Line;

    return React.createClass({

        render: function () {
            var lan = -Math.PI / 2,
                inc = Math.PI / 3,
                arg = 0,//Math.PI / 2,

                material = new THREE.LineBasicMaterial({color: 'blue'}),
                ellipse = new THREE.EllipseCurve(0, 1, 1, 2, 0, 2.0 * Math.PI, false),
                ellipsePath = new THREE.CurvePath(),
                position = new THREE.Vector3(0, 0, 0),
                quaternion = new THREE.Quaternion(),
                quaternion2 = new THREE.Quaternion(),
                ellipseGeometry;

            quaternion.setFromEuler(new THREE.Euler(inc, 0, lan, 'ZXY'));
            quaternion2.setFromEuler(new THREE.Euler(0, 0, arg, 'XYZ'));

            quaternion.multiply(quaternion2);

            ellipsePath.add(ellipse);
            ellipseGeometry = ellipsePath.createPointsGeometry(100);
            ellipseGeometry.computeTangents();


            return (
                <Line geometry={ellipseGeometry}
                      material={material}
                      position={position}
                      quaternion={quaternion}
                    />
            );
        }
    });
}();
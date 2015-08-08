/**
 * Copyright 2015 Eloy Villasclaras-Fernandez <eloy.villasclaras@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function () {
    'use strict';


    var React = require('react'),

        THREE = require('three'),
        ReactTHREE = require('react-three'),
        PointCloud = ReactTHREE.PointCloud,

        stars = require('../../../../../../data/stars.json'),

        components = function () {
            var geometry = new THREE.Geometry(),
                material = new THREE.PointCloudMaterial({
                    size: 5e8,
                    vertexColors: THREE.VertexColors,
                    transparent: false
                }),
                r = 1e11;

            for (var i = 0; i < stars.length; i++) {
                var star = stars[i],
                    mag = star[0],
                    ra = star[1],
                    dec = star[2],
                    lum = (6 - mag) / 7.5,
                    color = new THREE.Color();

                color.setHSL(0, 0, lum);

                geometry.vertices.push(new THREE.Vector3(
                    r * Math.cos(ra) * Math.cos(dec),
                    r * Math.sin(ra) * Math.cos(dec),
                    r * Math.sin(dec)
                ));
                geometry.colors.push(color);
            }

            return {
                material: material,
                geometry: geometry
            };
        }();

    return React.createClass({
        render: function () {
            return <PointCloud material={components.material}
                               geometry={components.geometry}
                               position={this.props.perspective.pos}/>;
        }
    });

}();


/*


 var sphereGeometry = new THREE.SphereGeometry(100, 32, 32);

 var imageMaterial =  new THREE.MeshBasicMaterial({
 map: THREE.ImageUtils.loadTexture('/examples/assets/spherePanorama.jpg')
 });

 var SpherePanoramaScene = React.createClass({
 displayName: 'SpherePanoramaScene',
 render: function() {
 var sceneProps = {
 width: this.props.width,
 height: this.props.height,
 camera: 'maincamera',
 };

 var cameraAngle = this.props.cameraAngle || 0;
 var cameraLookAt = new THREE.Vector3(
 Math.cos(cameraAngle),
 0,
 Math.sin(cameraAngle)
 );

 var mainCamera = React.createElement(
 ReactTHREE.PerspectiveCamera,
 {
 name: 'maincamera',
 aspect: this.props.width / this.props.height,
 near: 1,
 far: 5000,
 position: new THREE.Vector3(0, 0, 0),
 lookat: cameraLookAt,
 }
 );

 var sphere = React.createElement(
 ReactTHREE.Mesh,
 {
 geometry: sphereGeometry,
 material: imageMaterial,
 position: new THREE.Vector3(0, 0, 0),
 scale: new THREE.Vector3(1, 1, -1),
 quaternion: new THREE.Quaternion(),
 }
 );

 return React.createElement(
 ReactTHREE.Scene,
 sceneProps,
 mainCamera,
 sphere
 );
 }
 });


 function spherepanoramaexamplestart() {
 var renderelement = document.getElementById("three-box");
 var appState = {
 width: window.innerWidth,
 height: window.innerHeight,
 cameraAngle: 0,
 };

 var reactInstance = React.render(
 React.createElement(SpherePanoramaScene, appState),
 renderelement
 );

 var start = Date.now();
 var PERIOD = 30;

 function animate(time) {
 var dt = time - start;
 var newAngle = (2 * dt / (PERIOD * 1000)) * Math.PI;
 appState.cameraAngle = newAngle;
 reactInstance.setProps(appState);
 requestAnimationFrame(animate);
 }

 animate(start);
 }

 */
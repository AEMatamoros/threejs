import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);Hidden use it for example

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

// Object Position
// Objects transformation can be all aplied at the same time(position, scale, rotation)
// U can move the object before the render
// U can Do it on the camera or on the mesh
//Unit used dosent matter
mesh.position.x = 0.8;
mesh.position.y = 0;
mesh.position.z = -1;
// Mesh can use vector3 methods, since they are created from vectors
console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));
//Normalice the lengh of the vector to one
mesh.position.normalize();
console.log(mesh.position.length());
// Pass al cordinates to position
mesh.position.set(0.8, 0, -1);

// Axes Helper(Helps to position Objects) SOmetimes will need to move the camera to see al the axes
const axesHelper = new THREE.AxesHelper(3, 3, 3); //x,y,z Length of the axes
scene.add(axesHelper);

// Scale Objects(Default value = 1)
mesh.scale.x = 2;
mesh.scale.y = 2;
mesh.scale.z = 0.5;
// Set all values from set
mesh.scale.set(2, 2, 0.5);

// Rotate an object
//Pi value its 180deg
//Axes position will change on rotation, reorder will apply the order of rotation in the axes
// Always do it before rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 2;
mesh.rotation.y = Math.PI * 2;
mesh.rotation.z = Math.PI * 0.25;

// Quaternian is a representation of rotation in a more matematical way
// When update quaterninan or rotation they get affected eachoder

//Look At something make objects looo at other object in the center
// camera.lookAt(new THREE.Vector3(0,0,0));
// Since mesh.position is a vector
camera.lookAt(mesh.position);

// U can Create groups to add object transformations to all the objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "teal" })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "tomato" })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "gray" })
);
camera.position.x = 0;
camera.position.z = 4;
cube2.position.x = 2;
cube3.position.x = -2;
group.add(cube1);
group.add(cube2);
group.add(cube3);

group.rotation.x = 2;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// console.log(OrbitControls)
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
//Camera is an abstract classs dont use it, the other camera clases extends from it
// Array Camera View object from diferents points of view
// Stereo Camera is used to render the scene from two cameras
// Cube Camera do 6 renders one on every direction surrounding
// Ortographic camera creates a render of the scene without perspective
// Perspective camera
//Field of view(Vertical field of view like zoom), Aspect Ration(Width/ Height), Near, Far
//In case u neeed to see all the objects in scene u can use very small value on the near and a very big value on Far
// 0.0001, 9999999 Do not uyse values like this, to avoid z-fighting(Objects with a glitsh that are on the same z value)
// 0.1 , 100 can be a good value
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)

// Ortographic Camera
// const aspectRatio = sizes.width/ sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100); //left right top bottom
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
//Controls
const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.y = 2;
// controls.update();
controls.enableDamping = true;
controls.update()
// Animate
const clock = new THREE.Clock();
//Camera Movement
let cursor = {
    x: 0,
    y: 0
}
document.addEventListener("mousemove", event => {
    // console.log(event.clientX, event.clientY)
    //This makes de x and y value dont be more than the values of the container size the -0.5 makes the camera goe to left an right
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height);
})
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update the camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(mesh.position)
    controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
// Controls
// Device Orientatio(Used on smarthphones to make it inmersive, IOS stops device orientation support)
// Flight Control
// First Person Control its like flight control but cant change the go up axis
// Pointer Lock Controls Mouse movement updates the camera
// Orbit controls 
// Trackball controls its like orbt control but without limit
// Transform Controls moves objects in axes
import * as THREE from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Request Animation Frame
// The porpouse of requestAnimationFrame is to call the funcion provided the nest freame, whe will call the same funcion on each frame

// // Animation using Time
// let time = Date.now();

// const tick = () => {
//   console.log("Tick");
//   //Update object
//   //   mesh.position.x += 0.01;
//   //   mesh.position.y += 0.01;
//   //   mesh.rotation.y += 0.01;
//   //Use Time to get the same frame rate on every screen
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//   mesh.rotation.y += 0.001 * deltaTime;
//   // Renderer
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// // Animation using ThreejsClock
// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   // mesh.rotation.y = elapsedTime;
//   // One Revolution per second
//   //   mesh.rotation.y = elapsedTime * Math.PI * 2;

//   mesh.position.y = Math.sin(elapsedTime);
//   mesh.position.x = Math.cos(elapsedTime);
//   camera.lookAt(mesh.position);
//   // Renderer
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// Animation using GSAP Library
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 }); //Element to AnimationEffect, options
const tick = () => {
  // Renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

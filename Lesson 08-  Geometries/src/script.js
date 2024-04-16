import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// Geometry ios created from vertices
// Can be used to created a mesh but also to create perticles, each vertice has its own position or cordinates
// Position
// UV
// Normal

// Built In Geometry
// THREE.BoxGeometry
// THREE.PlaneGeometry
// THREE.CircleGeometry
// THREE.ConeGeometry
// THREE.CylinderGeometry
// THREE.RingGeometry
// THREE.TorusGeometry
// THREE.TorusKnotGeometry
// THREE.DodecahedronGeometry
// const geometry = new THREE.PlaneGeometry(2,2)
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2) //width, height, segments(Segments controls the amount of triangles to create the element)
// Option 1
// const positionsArray = new Float32Array(9)
// // Vertex 1 (x,y,z)
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0
// // Vertex 2
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0
// // Vertex 3
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0
// Create a Triangle
// const positionsArray = new Float32Array([
//     0,0,0, //x,y,z
//     0,1,0,
//     1,0,0
// ])

// const positionAtribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()
// Set Triangle
// geometry.setAttribute("position", positionAtribute) //Position its going to be the name of the object used in shaders

// Create multiple Triangles
const count = 50;
let positionArray = new Float32Array(count * 3 * 3)//Number of Triangles, Number of vertices, Number of cordinates values

for (let index = 0; index < count * 3 * 3; index++) {
    positionArray[index] = (Math.random() - 0.5) * 4    ;

}

const positionAtribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute("position", positionAtribute)
// Geometry Test
// const sphere = new THREE.SphereGeometry(1)'
const ring = new THREE.TorusGeometry(3,0.5,30,30)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(ring, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
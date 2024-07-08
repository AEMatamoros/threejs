import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from "lil-gui"

// Debug
const gui = new GUI({
    width:450,
    title:"Debugger PRO"
})
const debug = {
    color:"#370037",
    spin:()=>{
        gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2, duration:2})
    },
    wireframe: true,
    subdivision: 2
}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debug.color, wireframe:debug.wireframe })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Object Properties
gui.add(mesh.position, "y").min(-3).max(3).step(0.1).name("Elevation") //Min Value, Max Value, Interval
gui.add(mesh.position, "x", -3, 3, 0.1)
gui.add(mesh.position, "z", -3, 3, 0.1)
//
gui.add(mesh, "visible")
gui.add(mesh.material, "wireframe")
// Variables
gui.add(sizes, "width").name("Width")
// gui.add(geometry, "wireframe")
// Option 1
// gui.addColor(material, "color").onChange((e)=>{
//     console.log(e.getHexString())
// })
// Option 2(Needs a debugObject Savin The color)
// This one is better color will match the object color
gui.addColor(debug, "color").onChange(()=>{
    material.color.set(debug.color)
})
// Add Functions and Create folder
const animationFolders = gui.addFolder("Animation")
animationFolders.add(debug, "spin")
animationFolders.close()

//Add Object Properties
gui.add(debug, "subdivision").min(2).max(6).name("Sub Division").step(2).onFinishChange(()=>{
    mesh.geometry.dispose()//Removes Geometry from the GPU
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debug.subdivision, debug.subdivision, debug.subdivision)
})
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = elapsedTime
    // mesh.position.y = Math.cos(elapsedTime)
    // mesh.position.x = Math.sin(elapsedTime)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
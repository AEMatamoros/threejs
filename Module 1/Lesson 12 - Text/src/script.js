import * as THREE from 'three'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("/textures/matcaps/8.png")
console.log(matcapTexture)
/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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


//Texts
const loader = new FontLoader();
const font = loader.load(
	// resource URL
	'/fonts/nunito.json',

	// onLoad callback
	function ( font ) {
		// do something with the font
		// console.log( font );
        const textGeometry = new TextGeometry(
            'Alexis Matamoros',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox() //Container
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x /2,
        //     - textGeometry.boundingBox.max.y /2,
        //     - textGeometry.boundingBox.max.z /2,
        // )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        // const torusGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
        const torusMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})  
        const planeGeometry = new THREE.PlaneGeometry(1,1, 90, 90)
        const planeMaterial = new THREE.MeshPhysicalMaterial()
        planeMaterial.side = THREE.DoubleSide
        torusMaterial.side = THREE.DoubleSide
        planeMaterial.metalness = 0
        planeMaterial.roughness = 0.01
        for(let i=0; i<100 ;i++){
             
            const torus = new THREE.Mesh(planeGeometry, torusMaterial)
            torus.position.x = (Math.random()-0.5) * 10 
            torus.position.y = (Math.random()-0.5) * 10 
            torus.position.z = (Math.random()-0.5) * 10 

            torus.rotation.x = Math.random() * Math.PI
            torus.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            torus.scale.set(scale, scale, scale)
            scene.add(torus)
        }
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
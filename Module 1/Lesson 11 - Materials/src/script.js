import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

const   doorColorTexture = textureLoader.load("./textures/door/color.jpg")
const   doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg")
const   doorAmbientOclusionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg")
const   doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
const   doorNormalTexture = textureLoader.load("./textures/door/normal.jpg")
const   doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const   doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
const   matCapTexture = textureLoader.load("./textures/matcaps/1.png")
const   gradientTexture = textureLoader.load("./textures/gradients/3.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matCapTexture.colorSpace = THREE.SRGBColorSpace
//Objects
//Mesh Basic Material
// const material = new THREE.MeshBasicMaterial({map:matCapTexture})
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000)
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture

// const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular  = new THREE.Color(0x1188f)
// Standard Material
// const material = new THREE.MeshStandardMaterial()
// material.side = THREE.DoubleSide
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOclusionTexture
// // Texture will be difined by the amount of triangles used to generate the objectDirection, if u want more defaultBuildStages, change the amount of triangles
// material.displacementMap = doorHeightTexture //Use if not using normal maps
// material.displacementScale = 0.1//Use if not using normal maps
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// // Normal Maps adds really god Textures, with low triangles
// material.normalMap = doorNormalTexture
// Phisics Material
const material = new THREE.MeshPhysicalMaterial()
material.side = THREE.DoubleSide
material.metalness = 0
material.roughness = 0.01
// material.map = doorColorTexture
// material.aoMap = doorAmbientOclusionTexture
// // Texture will be difined by the amount of triangles used to generate the objectDirection, if u want more defaultBuildStages, change the amount of triangles
// material.displacementMap = doorHeightTexture //Use if not using normal maps
// material.displacementScale = 0.1//Use if not using normal maps
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// // Normal Maps adds really god Textures, with low triangles
// material.normalMap = doorNormalTexture

//Phisics
// clearCoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)
// iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100,800]
material.transmission = 1
material.ior= 1.5
material.thickness = 0.5

//Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
)
sphere.position.x = -1.5;
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1, 90, 90),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,30,90),
    material
)

torus.position.x = 1.5;
scene.add(sphere,plane,torus)
//Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Enviroment MAP
 */
const rgbLoader = new RGBELoader()
rgbLoader.load("./textures/environmentMap/2k.hdr", (enviromentMap)=>{
    enviromentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = enviromentMap
    scene.environment = enviromentMap
})
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
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***********
 ** SCENE ** 
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(-2, 3, -5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
// testSphere
// testTorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1.5,0.4)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const testTorusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

scene.add(testTorusKnot)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 1

}

// plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// TorusKnow UI
const torusKnotFolder = ui.addFolder('TorusKnot')

torusKnotFolder
    .add(uiObject, 'speed')
    .min(0.5)
    .max(10)
    .step(0.5)
    .name('Torus Knot Speed')

torusKnotFolderFolder
    .add(uiObject, 'distance')
    .min(0.5)
    .max(10)
    .step(0.5)
    .name('Torus Knot Distance')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate TorusKnot Position
    testTorusKnot.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    testTorusKnot.rotation.x += uiObject.rotationSpeed
    testTorusKnot.roation.y += uiObject.roationSpeed
    testTorusKnot.roation.z += uiObject.rotationSpeed


    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
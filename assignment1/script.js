import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE ** 
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('pink')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)


// Objects
const ringGeometry = new THREE.RingGeometry(1, 0.2)
const ringMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const ring = new THREE.Mesh(ringGeometry, ringMaterial)
ring.position.set(10, 2.5, 0)
ring.castShadow = true
scene.add(ring)

const torusGeometry = new THREE.TorusGeometry(1,0.2)
const torusMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide})
const Torus = new THREE.Mesh(torusGeometry, torusMaterial)
Torus.position.set(10,2.5,0)
Torus.castShadow = true
scene.add(Torus)



/*************
 ** LIGHTS **
 ************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white')
//)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******
** UI **
********/
// UI
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')
*/

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

     // part-one
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(25, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        ring.rotation.y = elapsedTime
        Torus.castShadow = false
    }

    // second-change
    if(domObject.secondChange)
    {
        ring.rotation.x = elapsedTime
        Torus.castShadow = true
        ring.castShadow = false
    }

    // third-change
    if(domObject.thirdChange)
    {
        ring.position.y = (Math.sin(elapsedTime) + 1) * 2
    }

    // fourth-change
    if(domObject.fourthChange)
    {
        ring.position.z = Math.sin(elapsedTime)
    }

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
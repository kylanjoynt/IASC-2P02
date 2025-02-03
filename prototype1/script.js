import * as THREE from "three"

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
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/***********
** MESHES **
************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

// testTorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1.5,0.4)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const testTorusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

scene.add(testTorusKnot)


/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)

     // Animation torusKnot

    testTorusKnot.position.z = Math.sin(elapsedTime)

    // Animation Speed and Distance torusKnot

    const speed = 2
    const distance = 3
    testTorusKnot.position.y = Math.sin(elapsedTime * speed) * distance

    // Rotation torusKnot

    const rotationSpeed = 2
    testTorusKnot.rotation.x = elapsedTime * rotationSpeed  
    testTorusKnot.rotation.y = elapsedTime * rotationSpeed
    testTorusKnot.rotation.z = elapsedTime * rotationSpeed
    
    // Scale torusKnot

    testTorusKnot.scale.x = Math.sin(elapsedTime)
    testTorusKnot.scale.y = Math.sin(elapsedTime)
    testTorusKnot.scale.z = Math.sin(elapsedTime)

    // Renderer

    renderer.render(scene, camera)
        
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}



animation()
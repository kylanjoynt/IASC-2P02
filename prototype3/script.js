import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "OrbitControls";

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
};

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
);
scene.add(camera);
camera.position.set(10, 2, 7.5);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/***********
** MESHES **
************/

// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5);
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
});
const cave = new THREE.Mesh(caveGeometry, caveMaterial);
cave.rotation.y = Math.PI * 0.5;
cave.receiveShadow = true;
scene.add(cave);

// Smiley Face Shadow Caster
const smileyShadow = new THREE.Group();

// Smiley Face : Eyes
const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.5, 0.5, 0);
rightEye.position.set(0.5, 0.5, 0);
leftEye.castShadow = true;
rightEye.castShadow = true;
smileyShadow.add(leftEye, rightEye);

// Smiley Face Mouth 
const mouthGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 100, Math.PI);
const mouthMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(0, -0.4, 0);
mouth.rotation.x = Math.PI * -0.9; 
mouth.castShadow = true;
smileyShadow.add(mouth);

// Smiley Shadow Position
smileyShadow.position.set(6, 1, -0.5);
scene.add(smileyShadow);

/*************
 ** LIGHTS **
 ************/

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    1
);
scene.add(directionalLight);
directionalLight.position.set(20, 4.1, 0);
directionalLight.target = cave;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);

/*******
** UI **
********/
const ui = new dat.GUI();

const lightPositionFolder = ui.addFolder('Light Position');
lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y');
lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z');

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock();

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime();

    // Animate shadow caster
    smileyShadow.rotation.y = elapsedTime * 0.5;

    // Update directionalLightHelper
    directionalLightHelper.update();

    // Update OrbitControls
    controls.update();
    
    // Renderer
    renderer.render(scene, camera);

    // Request next frame
    window.requestAnimationFrame(animation);
};

animation();

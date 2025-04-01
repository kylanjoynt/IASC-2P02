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

// Resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 12, -20)

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
** LIGHTS **
***********/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Octagonal Prism Geometry (Luke - 3D Octagons)
const octagonGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);

// Sphere Geometry (Obi-Wan - Circles)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

// Octahedron Geometry (Vader - Sharp Diamonds)
const diamondGeometry = new THREE.OctahedronGeometry(0.5);

const drawLuke = (height, color) => {
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });
    const octagon = new THREE.Mesh(octagonGeometry, material);
    octagon.position.set((Math.random() - 0.5) * 10, height - 10, (Math.random() - 0.5) * 10);
    scene.add(octagon);
};

const drawVader = (height, color) => {
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });
    const diamond = new THREE.Mesh(diamondGeometry, material);
    diamond.position.set((Math.random() - 0.5) * 10, height - 10, (Math.random() - 0.5) * 10);
    scene.add(diamond);
};

const drawObi = (height, color) => {
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });
    const circle = new THREE.Mesh(sphereGeometry, material);
    circle.position.set((Math.random() - 0.5) * 10, height - 10, (Math.random() - 0.5) * 10);
    scene.add(circle);
};
//drawCube(0, 'red')
//drawCube(1, 'green')
//drawCube(2, 'yellow')
//drawCube(3, 'blue')

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

let preset = {}

const uiObj = {
    sourceText: "The quick brown fox jumped over the lazy dog.",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'luke',
    color1: '#0ac93d',
    term2: 'vader',
    color2: '#f20c0c',
    term3: 'obi',
    color3: '#28c5fa',
    saveTerms() {
        saveTerms()
    }
}

// UI Functions
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
}

const saveTerms = () =>
{
    // UI
    preset = ui.save
    visualizeFolder.hide()

    // Testing
    //console.log(uiObj.term1)
    //console.log(uiObj.color1)
    //console.log(uiObj.term2)
    //console.log(uiObj.color2)
    //console.log(uiObj.term3)
    //console.log(uiObj.color3)

    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1, drawLuke)
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2, drawVader)
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3, drawObi)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

// Terms and Visualize Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj, 'color1')
    .name("Term 1 Color")

termsFolder
    .add(uiObj, 'term2')
    .name("Term 2")

termsFolder
    .addColor(uiObj, 'color2')
    .name("Term 2 Color")

termsFolder
    .add(uiObj, 'term3')
    .name("Term 3")

termsFolder
    .addColor(uiObj, 'color3')
    .name("Term 3 Color")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

// Terms and Visualize folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()

/******************
** TEXT ANALYSIS **
******************/
// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color, con) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            // call drawCube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            {
                con(height, color)
            }
        }
    }
}

//findSearchTermInTokenizedText("little", "yellow")
//findSearchTermInTokenizedText("dog", "pink")
//findSearchTermInTokenizedText("dogs", "pink")

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
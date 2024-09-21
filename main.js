import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import GUI from lil-gui
import GUI from 'lil-gui';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
// Get the canvas element
const canvas = document.querySelector('canvas');

// Create a renderer

const renderer = new THREE.WebGLRenderer({canvas : canvas, antialias: true}); //antialias true ley jagged line hatauxa.

renderer.setSize(window.innerWidth, window.innerHeight);

// Now we can initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Initialize GUI
const gui = new GUI();



const geometry = new THREE.BoxGeometry( 3, 2, 2 );
//const geometry = new THREE.SphereGeometry( 1, 10, 10 );
//const geometry = new THREE.CylinderGeometry( 2, 2, 5,50 );





// Add a high-intensity directional light
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 1.5);
highIntensityLight.position.set(10, 10, 10);
scene.add(highIntensityLight);

//adding lighting for mesh standard material
// Add ambient light for overall illumination
const ambientLight = new THREE.AmbientLight("cyan", 0.5);
scene.add(ambientLight);

// Helper for ambient light
// Since AmbientLight doesn't have a built-in helper, we'll create a custom one
const ambientLightHelper = new THREE.PointLightHelper(new THREE.PointLight(ambientLight.color, 0.5), 0.5);
ambientLightHelper.position.set(0, 0, 0);
scene.add(ambientLightHelper);




// Add directional light for shadows and highlights
const directionalLight = new THREE.DirectionalLight("blue", 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
// Helper for directional light
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

// Add point light for additional depth
const pointLight = new THREE.PointLight("green", 0.5);
pointLight.position.set(-5, 3, -1.3);
scene.add(pointLight);
// Helper for point light
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.9);
scene.add(pointLightHelper);

//>>>>>>>>>>>lighting code end<<<<<<<<<<<




// Add light helpers for all lights

// Helper for high-intensity directional light
// const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5);
// scene.add(highIntensityLightHelper);

// // Helper for directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);

// // Helper for point light
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// Helper for ambient light (Note: AmbientLight doesn't have a helper as it's non-directional)
// We can add a custom helper to visualize its presence
// const ambientLightHelper = new THREE.PointLightHelper(new THREE.PointLight(ambientLight.color, 0.1), 0.5);
// ambientLightHelper.position.set(0, 0, 0);
// scene.add(ambientLightHelper);



let loader =new THREE.TextureLoader()
let color = loader.load("./textures/color.jpg")
let roughness = loader.load("./textures/roughness.jpg")
let normal = loader.load("./textures/normal.png")
let height = loader.load("./textures/height.png")


const material = new THREE.MeshStandardMaterial({map: color, roughnessMap: roughness, normalMap: normal, displacementMap: height, displacementScale: 0.02});

// const material = new THREE.MeshBasicMaterial( { color: "red", wireframe: true  } );//this wire frame is for see the shape of cube.

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

renderer.setSize( window.innerWidth, window.innerHeight );



//LIL-GUI START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

// Create GUI folders for material and mesh settings
const materialFolder = gui.addFolder('Material Settings');
const meshFolder = gui.addFolder('Mesh Settings');

// Material Settings
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'transparent');
materialFolder.add(material, 'opacity', 0, 1);
materialFolder.add(material, 'metalness', 0, 1);
materialFolder.add(material, 'roughness', 0, 1);
materialFolder.add(material.color, 'r', 0, 1).name('Red');
materialFolder.add(material.color, 'g', 0, 1).name('Green');
materialFolder.add(material.color, 'b', 0, 1).name('Blue');
materialFolder.add(material, 'displacementScale', 0, 0.1).step(0.001);

// Mesh Settings
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
meshFolder.add(cube.position, 'x', -5, 5);
meshFolder.add(cube.position, 'y', -5, 5);
meshFolder.add(cube.position, 'z', -5, 5);
meshFolder.add(cube.scale, 'x', 0.1, 2).name('Scale X');
meshFolder.add(cube.scale, 'y', 0.1, 2).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0.1, 2).name('Scale Z');

// Open folders by default
materialFolder.open();
meshFolder.open();


// Create GUI folders for lights
const lightsFolder = gui.addFolder('Lights');

// Directional Light Settings
const directionalLightFolder = lightsFolder.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity', 0, 2).name('Intensity');
directionalLightFolder.add(directionalLight.position, 'x', -10, 10).name('Position X');
directionalLightFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y');
directionalLightFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z');

// Ambient Light Settings
const ambientLightFolder = lightsFolder.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 2).name('Intensity');

// Point Light Settings
const pointLightFolder = lightsFolder.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 2).name('Intensity');
pointLightFolder.add(pointLight.position, 'x', -10, 10).name('Position X');
pointLightFolder.add(pointLight.position, 'y', -10, 10).name('Position Y');
pointLightFolder.add(pointLight.position, 'z', -10, 10).name('Position Z');

// Open folders by default
lightsFolder.open();
directionalLightFolder.open();
ambientLightFolder.open();
pointLightFolder.open();


//LIL-GUI END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.



//for responsive:
window.addEventListener('resize', () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //this line prevent cube from being squished.
});
controls.enableDamping = true;//this line is for smooth rotation of cube




//orbit controls(first import the from three js website then copy the code and paste in top)


// controls.autoRotate = true;//this line is for auto rotate of cube:::::::we can use this line instead of cube.rotation.x += 0.01;
//cube.rotation.y += 0.01; in funtion animate.

//controls.autoRotateSpeed = 0.5;//this line is for auto rotate speed of cube

//controls.enableZoom = false;//this line is for disable zoom of cube

//controls.enablePan = false;//this line is for disable pan of cube

//controls.enableRotate = false;//this line is for disable rotate of cube



function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  //this line is for orbit controls.
  controls.update();
// Move the OrbitControls initialization to the top of the file, after importing Three.js and OrbitControls


// Remove the duplicate controls initialization from here
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;

// The rest of your controls-related code can stay in this section
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.enableRotate = false;
}

animate();
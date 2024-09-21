import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const geometry = new THREE.SphereGeometry( 1, 10, 10 );
//const geometry = new THREE.CylinderGeometry( 2, 2, 5,50 );





// Add a high-intensity directional light
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 1.5);
highIntensityLight.position.set(10, 10, 10);
scene.add(highIntensityLight);



//adding lighting for mesh standard material
// Add ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light for shadows and highlights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add point light for additional depth
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-5, 3, -5);
scene.add(pointLight);
//>>>>>>>>>>>lighting code end<<<<<<<<<<<




// Add light helpers for all lights

// Helper for high-intensity directional light
const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5);
scene.add(highIntensityLightHelper);

// Helper for directional light
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

// Helper for point light
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

// Helper for ambient light (Note: AmbientLight doesn't have a helper as it's non-directional)
// We can add a custom helper to visualize its presence
// const ambientLightHelper = new THREE.PointLightHelper(new THREE.PointLight(ambientLight.color, 0.1), 0.5);
// ambientLightHelper.position.set(0, 0, 0);
// scene.add(ambientLightHelper);






const material = new THREE.MeshStandardMaterial({color: "red"});

// const material = new THREE.MeshBasicMaterial( { color: "red", wireframe: true  } );//this wire frame is for see the shape of cube.

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas : canvas, antialias: true}); //antialias true ley jagged line hatauxa.
renderer.setSize( window.innerWidth, window.innerHeight );



//for responsive:
window.addEventListener('resize', () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //this line prevent cube from being squished.
});


//orbit controls(first import the from three js website then copy the code and paste in top)
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;//this line is for smooth rotation of cube


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
}

animate();
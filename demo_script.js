const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({canvas : canvas, antialias : true});
renderer.setSize( window.innerWidth, window.innerHeight );

let clock = new THREE.Clock();
function animate() {
    window.requestAnimationFrame(animate);
	renderer.render( scene, camera );

    cube.rotation.x = clock.getElapsedTime();
    cube.rotation.y = clock.getElapsedTime();

}
animate();
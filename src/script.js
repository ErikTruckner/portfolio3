import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Base
 */
// Debug
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */

let mixer = null;

gltfLoader.load("/models/reactLogoAnimated.gltf", (gltf) => {
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
  const action1 = mixer.clipAction(gltf.animations[1]);
  action1.play();
  const action2 = mixer.clipAction(gltf.animations[2]);
  action2.play();
  const action3 = mixer.clipAction(gltf.animations[3]);
  action3.play();

  //gltf.scene.color.set(0xffff00);

  var model = gltf.scene;
  var newMaterial = new THREE.MeshPhongMaterial({
    color: 0x11b2f7,
    emissive: 0x0000ff,

    reflectivity: 1,

    specular: 0xffff00,
    shininess: 100,
  });
  model.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
  });

  model.scale.set(1, 1, 1);
  model.translateY(3);
  scene.add(model);
});

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -2.25);
scene.add(directionalLight);

//STARS

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVerticies = [];
for (let i = 0; i < 100000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVerticies.push(x, y, z);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVerticies, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 2, 16);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
let frame = 0;
function animateStars() {
  requestAnimationFrame(animateStars);
  renderer.render(scene, camera);
  frame += 0.01;
  stars.rotation.x += 0.00009;
}

//Pushes STARS away from SCENE so they don't interfere
stars.scale.z = 2;

animateStars();

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //update Mixer

  if (mixer !== null) {
    mixer.update(deltaTime);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// REACT MODAL

// Get the modal
var reactModal = document.getElementById("reactModalContainer");

// Get the button that opens the modal
var reactModalBtn = document.getElementById("reactModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
reactModalBtn.onclick = function () {
  reactModal.style.display = "block";
};

// When the user clicks on <span> (x), close the reactModal
span.onclick = function () {
  reactModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == reactModal) {
    reactModal.style.display = "none";
  }
};
// Contact MODAL

// Get the modal
var contactModal = document.getElementById("contactModalContainer");

// Get the button that opens the modal
var contactModalBtn = document.getElementById("contactModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal
contactModalBtn.onclick = function () {
  contactModal.style.display = "block";
};

// When the user clicks on <span> (x), close the contactModal
span.onclick = function () {
  contactModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == contactModal) {
    contactModal.style.display = "none";
  }
};

//MODAL TEMPLATE

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

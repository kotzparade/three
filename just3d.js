// Simple three.js example

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

//Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

//gsap
let tl = gsap.timeline();

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// 3D Loader
const mesh = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://unpkg.com/three@0.127.0/examples/js/libs/draco/"
);
mesh.setDRACOLoader(dracoLoader);

mesh.load("loewe_fixed.glb", function (gltf) {
  gltf.scene.rotation.set(0, 0, 0);
  scene.add(gltf.scene);

  //Intro GSAP Animation
  tl.to(gltf.scene.rotation, { y: 6.3, duration: 2 });
  //tl.to(gltf.scene.scale, { x: 1, y: 1, z: 1, duration: 1 }, "-=2");
  tl.to(gltf.scene.position, { x: 0, y: -1, z: 0, duration: 2 }, "-=2");
});

//Traverse
// scene.traverse((el) => {
//   console.log(el.children);
// });

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
  100,
  sizes.width / sizes.height,
  0.001,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

// ambient
// scene.add(new THREE.AmbientLight(0xffffff, 5));

// light
var light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10, 10, 10);
scene.add(light);

// var spotlight = new THREE.SpotLight(0xffffff, 5);
// spotlight.position.set(0, 10, 10);
// scene.add(spotlight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;
// controls.autoRotate = true;
controls.enableZoom = true;
controls.enablePan = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 100;
controls.minDistance = 1;

//Raycast for detecting Objects on the model
function raycast(e) {
  raycaster.setFromCamera(pointer, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);

  for (var i = 0; i < intersects.length; i++) {
    let object = intersects[i].object;
    console.log(object.name);
    if (object == "0bject784") {
      object.visible = false;
    }
  }
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  renderer.domElement.addEventListener("click", raycast, true);
  window.requestAnimationFrame(tick);
};

tick();

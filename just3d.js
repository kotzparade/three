// Simple three.js example

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/RenderPass.js";

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
  // // Update sizes
  // sizes.width = window.innerWidth;
  // sizes.height = window.innerHeight;
  // // Update camera
  // camera.aspect = sizes.width / sizes.height;
  // camera.updateProjectionMatrix();
  // // Update renderer
  // renderer.setSize(sizes.width, sizes.height);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  let rect = this.renderer.domElement.getBoundingClientRect();
  console.log(rect);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.01,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

// AmbientLight
// scene.add(new THREE.AmbientLight(0xffffff, 5));

// DirectionalLight
var light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(10, 10, 10);
scene.add(light);

//Spotlight
// var spotlight = new THREE.SpotLight(0xffffff, 5);
// spotlight.position.set(0, 10, 10);
// scene.add(spotlight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;
controls.autoRotate = true;
controls.enableZoom = false;
controls.enablePan = false;
// controls.dampingFactor = 0.05;
// controls.maxDistance = 100;
controls.minDistance = 3;

//Raycast for detecting Objects on the model
function raycast(e) {
  raycaster.setFromCamera(pointer, camera);
  var intersects = raycaster.intersectObjects(scene.children, true);

  // for (var i = 0; i < intersects.length; i++) {
  //   intersects[i].object.material.color.set(0xff0000);
  //   console.log(intersects[i].object);
  // }
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

//Effeccomposer
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();
  // Render
  composer.render(scene, camera);

  // Call tick again on the next frame
  renderer.domElement.addEventListener("click", raycast, true);
  window.requestAnimationFrame(tick);
};

tick();

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

let tl = gsap.timeline();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// 3D Loader
const mesh = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://unpkg.com/three@0.126.1/examples/js/libs/draco/"
);
mesh.setDRACOLoader(dracoLoader);

mesh.load("loewe_fixed.glb", function (gltf) {
  gltf.scene.rotation.set(0, 0, 0);
  scene.add(gltf.scene);
});

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
  10,
  sizes.width / sizes.height,
  0.001,
  5000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;
controls.autoRotate = true;
// controls.enableZoom = false
controls.enablePan = false;
controls.dampingFactor = 0.05;
controls.maxDistance = 1000;
controls.minDistance = 30;

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
 * Animation GSAP
 */

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  scrub: 3,
  ease: "none",
});
const sections = document.querySelectorAll(".section");
gsap.from(mesh.position, {
  y: 1,
  duration: 1,
  ease: "expo",
});
gsap.from("h1", {
  yPercent: 100,
  autoAlpha: 0,
  ease: "back",
  delay: 0.3,
});
gsap.to(mesh.rotation, {
  x: Math.PI * 2,
  scrollTrigger: {
    trigger: sections[1],
  },
});
gsap.to(mesh.scale, {
  x: 2,
  y: 2,
  scrollTrigger: {
    trigger: sections[2],
  },
});
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  scrollTrigger: {
    trigger: sections[3],
  },
});

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //mesh.rotation.x += 0.01 * Math.sin(1);
  //mesh.rotation.y += 0.01 * Math.sin(1)
  //mesh.rotation.z += 0.01 * Math.sin(1)

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
/*------------------------------
 MouseMove
 ------------------------------*/
function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, 1, -1, x),
    x: gsap.utils.mapRange(0, window.innerHeight, 1, -1, y),
  });
}
window.addEventListener("mousemove", onMouseMove);

tick();

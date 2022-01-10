// Simple three.js example

import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";

var mesh, renderer, scene, camera, controls;

init();
animate();

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(20, 20, 20);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  // ambient
  // scene.add(new THREE.AmbientLight(0x222222));

  // light
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(20, 20, 0);
  scene.add(light);

  // axes
  //scene.add(new THREE.AxesHelper(20));

  // geometry
  var geometry = new THREE.SphereGeometry(14, 24, 24);

  // material

  // mesh

  const loader = new GLTFLoader();

  loader.load(
    "book.gltf",
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  //controls.update();

  renderer.render(scene, camera);
}

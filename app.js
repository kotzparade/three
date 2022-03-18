// Simple three.js example

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

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
  scene.background = new THREE.Color(0xffffff);

  // camera
  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 10);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  // ambient
  scene.add(new THREE.AmbientLight(0xffffff));

  // light
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(20, 20, 0);
  scene.add(light);

  // axes
  //scene.add(new THREE.AxesHelper(20));

  // geometry
  //var geometry = new THREE.SphereGeometry(14, 24, 24);

  // material

  // mesh

  // 3D Loader
  const loader = new GLTFLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://unpkg.com/three@0.126.1/examples/js/libs/draco/"
  );
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    "loewe_fixed.glb",
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

  controls.update();

  renderer.render(scene, camera);
}

// Simple three.js example

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

var mesh, renderer, scene, camera, controls;

let tl = gsap.timeline();

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
    1,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 200);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  // ambient
  scene.add(new THREE.AmbientLight(0xffffff));

  // light
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 100, 10);
  scene.add(light);

  // axes
  // scene.add(new THREE.AxesHelper(20));

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
      gltf.scene.rotation.set(0, 0, 0);
      scene.add(gltf.scene);
      tl.to(gltf.scene.rotation, { y: 6, duration: 2 });
      tl.to(gltf.scene.scale, { x: 1, y: 1, z: 1, duration: 1 }, "-=2");
      tl.to(gltf.scene.position, { x: 0, y: -1, z: 0, duration: 2 }, "-=2");

      /**
       * Animation GSAP
       */

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.defaults({
        scrub: 1,
        ease: "none",
      });
      const sections = document.querySelectorAll(".section");

      gsap.from("h1", {
        yPercent: 100,
        autoAlpha: 0,
        ease: "back",
        delay: 0.3,
      });
      gsap.to(gltf.scene.rotation, {
        x: Math.PI * 2,
        scrollTrigger: {
          trigger: sections[1],
        },
      });
      gsap.to(gltf.scene.scale, {
        x: 2,
        y: 2,
        scrollTrigger: {
          trigger: sections[2],
        },
      });
      gsap.to(gltf.scene.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: sections[3],
        },
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

//Animate Loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

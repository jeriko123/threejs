import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 6, 6, 6);

// const geometry = new THREE.Geometry();

// for (let i = 0; i < 200000; i++) {
//   for (let j = 0; j < 3; j++) {
//     geometry.vertices.push(
//       new THREE.Vector3(
//         (Math.random() - 0.5) * 5,
//         (Math.random() - 0.5) * 5,
//         (Math.random() - 0.5) * 5
//       )
//     );
//   }

//   let ver = i * 3;
//   geometry.faces.push(new THREE.Face3(ver, ver + 1, ver + 2));
// }

const geometry = new THREE.BufferGeometry();

let count = 800;
let positionsArray = new Float32Array(count * 3 * 3);

positionsArray.forEach((el, id) => {
  positionsArray[id] = (Math.random() - 0.5) * 10;
});

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
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

// Double click event

window.addEventListener("dblclick", (event) => {
  const fullScreen =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullScreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webKitRequestFullscreen) {
      canvas.webKitRequestFullscreen;
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webExitFullscreen) {
      document.webExitFullscreen();
    }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 0.5;
scene.add(camera);

/**
 * Controls
 */

const cameraControls = new OrbitControls(camera, canvas);
cameraControls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  cameraControls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

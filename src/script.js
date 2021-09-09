import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const groupe = new THREE.Group();
groupe.scale.set(1, 0.5, 0.5);

scene.add(groupe);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
  new THREE.MeshBasicMaterial({ color: 0xff54a3, wireframe: true })
);
groupe.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 5),
  new THREE.MeshBasicMaterial({ color: 0x00ff33, wireframe: true })
);
cube2.position.x = 2;
groupe.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 4, 2, 5),
  new THREE.MeshBasicMaterial({ color: 0x4315f0, wireframe: true })
);
cube3.position.x = -2;
groupe.add(cube3);
/**Helpers Axes */
const axes = new THREE.AxesHelper();
scene.add(axes);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update Render
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Controls
 */

const cameraControls = new OrbitControls(camera, canvas);
cameraControls.enableDamping = true;
cameraControls.autoRotate = true;

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
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from "lil-gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

let loader = new THREE.TextureLoader();
let color = loader.load("texture/color.jpg");
let roughness = loader.load("texture/roughness.jpg");
let normal = loader.load("texture/normal.png");

const geometry = new THREE.BoxGeometry(3, 1.8, 2);
const material = new THREE.MeshStandardMaterial({
  //   color: "red",
  map: color,
  //   roughness: 0.8,
  roughnessMap: roughness,
  normalMap: normal,
  metalness: 0.5,
  //   wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const gui = new lil.GUI();
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "metalness", 0, 1);
materialFolder.add(material, "roughness", 0, 1);
materialFolder.open();

const lightFolder = gui.addFolder("Lights");
lightFolder.add(ambientLight, "intensity", 0, 2);
lightFolder.add(directionalLight, "intensity", 0, 2);
lightFolder.open();

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 7.0;

function animate() {
  renderer.render(scene, camera);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  controls.update();
}
renderer.setAnimationLoop(animate);

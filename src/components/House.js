import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import * as dat from "lil-gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import doorColorImage from "../assets/static/textures/door/color.jpg";
import doorAlphaImage from "../assets/static/textures/door/alpha.jpg";
import doorAmbientOcclusionImage from "../assets/static/textures/door/ambientOcclusion.jpg";
import doorHeightImage from "../assets/static/textures/door/height.jpg";
import doorMetalnessImage from "../assets/static/textures/door/metalness.jpg";
import doorNormalImage from "../assets/static/textures/door/normal.jpg";
import doorRoughnessImage from "../assets/static/textures/door/roughness.jpg";

import bricksColorImage from "../assets/static/textures/bricks/color.jpg";
import bricksAmbientOcclusionImage from "../assets/static/textures/bricks/ambientOcclusion.jpg";
import bricksNormalImage from "../assets/static/textures/bricks/normal.jpg";
import bricksRoughnessImage from "../assets/static/textures/bricks/roughness.jpg";

import grasAambientOcclusionImage from "../assets/static/textures/grass/ambientOcclusion.jpg";
import grassColorImage from "../assets/static/textures/grass/color.jpg";
import grassNormalImage from "../assets/static/textures/grass/normal.jpg";
import grassRoughnessImage from "../assets/static/textures/grass/roughness.jpg";

const House = () => {
  const canvasElement = useRef();

  const [theCanvas, setTheCanvas] = useState({});
  const [sizes, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setTheCanvas(canvasElement);
  }, [canvasElement]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      // Update sizes
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }, []);

  // Debug
  const gui = new dat.GUI();

  // Scene
  const scene = new THREE.Scene();

  const fog = new THREE.Fog("#262837", 0, 15);
  scene.fog = fog;

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const doorColorTexture = textureLoader.load(doorColorImage);
  const doorAlphaTexture = textureLoader.load(doorAlphaImage);
  const doorAmbientOcclusionTexture = textureLoader.load(
    doorAmbientOcclusionImage
  );
  const doorHeightTexture = textureLoader.load(doorHeightImage);
  const doorMetalnessTexture = textureLoader.load(doorMetalnessImage);
  const doorNormalTexture = textureLoader.load(doorNormalImage);
  const doorRoughnessTexture = textureLoader.load(doorRoughnessImage);

  const bricksColorTexture = textureLoader.load(bricksColorImage);
  const bricksAmbientOcclusionTexture = textureLoader.load(
    bricksAmbientOcclusionImage
  );
  const bricksNormalTexture = textureLoader.load(bricksNormalImage);
  const bricksRoughnessTexture = textureLoader.load(bricksRoughnessImage);

  const grasAambientOcclusionTexture = textureLoader.load(
    grasAambientOcclusionImage
  );
  const grassColorTexture = textureLoader.load(grassColorImage);
  const grassNormalTexture = textureLoader.load(grassNormalImage);
  const grassRoughnessTexture = textureLoader.load(grassRoughnessImage);

  grassColorTexture.repeat.set(8, 8);
  grasAambientOcclusionTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grasAambientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grasAambientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
  /**
   * House
   */
  const house = new THREE.Group();
  scene.add(house);

  // walls
  const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  );
  walls.geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  );
  walls.position.y = 1.25;
  house.add(walls);

  //   roof
  const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: "red" })
  );
  roof.position.y = 3;
  roof.rotation.y = Math.PI / 4;
  house.add(roof);

  //   door
  const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),

    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture,
    })
  );
  door.geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  );
  door.position.y = 1;
  door.position.z = 2 + 0.01;
  house.add(door);

  const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);
  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);
  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);
  house.add(bush1, bush2, bush3);
  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1, 0.05, 2.6);
  house.add(bush1, bush2, bush3, bush4);
  // graves

  const graves = new THREE.Group();
  scene.add(graves);

  const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    graves.add(grave);
  }

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grasAambientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture,
    })
  );
  floor.geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = 0;
  scene.add(floor);
  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#ffffff", 0.12);
  gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
  scene.add(ambientLight);

  // Directional light
  const moonLight = new THREE.DirectionalLight("#ffffff", 0.12);
  moonLight.position.set(4, 5, -2);
  gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
  gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
  gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
  scene.add(moonLight);

  //   door light
  const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
  doorLight.position.set(0, 2.2, 2.7);
  house.add(doorLight);

  const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
  scene.add(ghost1);
  const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
  scene.add(ghost2);
  const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
  scene.add(ghost3);

  /**
   * end House
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 4;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: theCanvas.current,
  });
  renderer.setSize(sizes.width, sizes.height);
  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#262837");

  //   shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  moonLight.castShadow = true;
  doorLight.castShadow = true;
  ghost1.castShadow = true;
  ghost2.castShadow = true;
  ghost3.castShadow = true;

  walls.castShadow = true;
  bush1.castShadow = true;
  bush2.castShadow = true;
  bush3.castShadow = true;
  bush4.castShadow = true;

  floor.receiveShadow = true;

  doorLight.shadow.mapSize.width = 256;
  doorLight.shadow.mapSize.height = 256;
  doorLight.shadow.camera.far = 7;

  ghost1.shadow.mapSize.width = 256;
  ghost1.shadow.mapSize.height = 256;
  ghost1.shadow.camera.far = 7;

  ghost2.shadow.mapSize.width = 256;
  ghost2.shadow.mapSize.height = 256;
  ghost2.shadow.camera.far = 7;

  ghost3.shadow.mapSize.width = 256;
  ghost3.shadow.mapSize.height = 256;
  ghost3.shadow.camera.far = 7;

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 3;
    const ghost2Angle = elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 4 + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = elapsedTime * 0.18;
    ghost3.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.y =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) + Math.sin(elapsedTime * 2);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
  return <canvas className="webgl" ref={canvasElement}></canvas>;
};

export default House;

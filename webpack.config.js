import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const gridSize = 50;
let haveRenderRequest = false;

const ThreeScene = () => {
  const container = useRef(null);
  const mouse = new THREE.Vector2();
  const [cubes, setCubes] = useState<THREE.Mesh[]>([]);
  const [scene] = useState<THREE.Scene>(new THREE.Scene());
  const [camera] = useState<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const [renderer] = useState<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const [raycaster] = useState<THREE.Raycaster>(new THREE.Raycaster());
  const init = () => {
    if (!container.current) {
      return;
    }
    // 设置背景色
    scene.background = new THREE.Color(0x000000);
    // 设置相机位置
    camera.position.set(10, 10, 10);
    // 设置渲染器尺寸并添加到 DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    (container.current as HTMLElement).appendChild(renderer.domElement);

    raycaster.setFromCamera(mouse, camera);
  
    addAxesHelper();
    addGridHelper();
    initOrbitControls();
  };

  const initOrbitControls = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('change', () => {
      requestAnimationFrame(() => {
        if (!haveRenderRequest) {
          haveRenderRequest = true;
          render();
        }
      });
    });
  };

  const render = () => {
    haveRenderRequest = false;
    renderer.render(scene, camera);
  };

  const addAxesHelper = () => {
    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.renderOrder = 1;
    scene.add(axesHelper);
  };

  const addGridHelper = () => {
    const gridHelper = new THREE.GridHelper(gridSize, gridSize);
    gridHelper.renderOrder = 0;
    scene.add(gridHelper);
  };

  useEffect(() => {

    init();
    render();

    // 清理函数：组件卸载时释放资源
    return () => {
      renderer.dispose();
    };
  }, []);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    mouse.copy(calculateMousePosition(event));
    raycaster.setFromCamera(mouse, camera);

    let newCubePosition = getCubeIntersectionPosition(raycaster, cubes);

    if (!newCubePosition) {
      newCubePosition = getPlaneIntersectionPosition(raycaster);
    }

    if (newCubePosition) {
      const cube = createCube(newCubePosition);
      scene.add(cube);
      setCubes([...cubes, cube]);
      render();
    }

  };

  return (
    <div
      ref={container}
      style={{ width: '100%', height: '100vh' }}
      onClick={onClick}
    />
  );
};

export default ThreeScene;

function calculateMousePosition(event: React.MouseEvent<HTMLDivElement>) {
  return {
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  };
}

function getCubeIntersectionPosition(raycaster: THREE.Raycaster, cubes: THREE.Mesh[]) {
  const result = raycaster.intersectObjects(cubes);
  if (result.length) {
    const intersectObject = result[0];
    const { face, object } = intersectObject;
    if (face) {
      const { normal } = face;
      const { position } = object;
      return position.clone().add(normal);
    }
  }
  return undefined;
}

function getPlaneIntersectionPosition(raycaster: THREE.Raycaster) {
  const intersectPoint = raycaster.ray.intersectPlane(
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    new THREE.Vector3()
  );
  if (intersectPoint) {
    const {x, z} = intersectPoint;
    return new THREE.Vector3(Math.floor(x) + 0.5, 0.5, Math.floor(z) + 0.5);
  }
  return undefined;
}

function createCube(position: THREE.Vector3) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); 
  const cube = new THREE.Mesh( geometry, material );
  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;
  return cube;
}

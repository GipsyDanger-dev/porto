import { createElement } from 'react';
import { createRoot, extend } from '@react-three/fiber';
import { AmbientLight, DirectionalLight, PointLight, Mesh, Group, TorusGeometry, MeshStandardMaterial, Points, BufferGeometry, BufferAttribute, PointsMaterial, IcosahedronGeometry } from 'three';
import HeroSceneContent from './HeroSceneContent';

extend({ AmbientLight, DirectionalLight, PointLight, Mesh, Group, TorusGeometry, MeshStandardMaterial, Points, BufferGeometry, BufferAttribute, PointsMaterial, IcosahedronGeometry });

let root;
let store;
let active = true;
let ready = false;
let latestSize;
const size = data => ({ width: data.width, height: data.height, top: 0, left: 0, updateStyle: false });
const dpr = data => Math.min(1.5, Math.max(1, data.dpr));
const updateLoop = () => store?.getState().setFrameloop(ready && active ? 'always' : 'never');
const fail = error => self.postMessage({ type: 'error', message: String(error?.message || error) });

const onReady = () => {
  ready = true;
  updateLoop();
  self.postMessage({ type: 'ready' });
};

self.addEventListener('message', async ({ data }) => {
  try {
    if (data.type === 'active') {
      active = data.active;
      updateLoop();
    } else if (data.type === 'resize') {
      latestSize = data;
      if (store) await root.configure({ size: size(data), dpr: dpr(data) });
    } else if (data.type === 'init') {
      if (typeof self.requestAnimationFrame !== 'function') throw new Error('Worker animation frames are unavailable.');
      active = data.active;
      root = createRoot(data.canvas);
      await root.configure({
        camera: { position: [0, 0, 5], fov: 45 },
        gl: { antialias: true, alpha: true },
        size: size(data), dpr: dpr(data), frameloop: 'never',
      });
      store = root.render(createElement(HeroSceneContent, { onReady }));
      if (latestSize) await root.configure({ size: size(latestSize), dpr: dpr(latestSize) });
    }
  } catch (error) {
    fail(error);
  }
});
self.addEventListener('unhandledrejection', event => {
  event.preventDefault();
  fail(event.reason);
});

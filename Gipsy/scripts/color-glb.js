import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

const glbPath = process.argv[2] || 'public/models/react.glb';
const outputPath = process.argv[3] || glbPath.replace('.glb', '-colored.glb');

// Color mapping based on filename or custom
const colorMap = {
  'react': 0x61dafb,
  'javascript': 0xf7df1e,
  'python': 0x3776ab,
  'nodejs': 0x339933,
  'tailwind': 0x06b6d4,
  'typescript': 0x3178c6,
  'laravel': 0xff2d20,
  'threejs': 0xffffff,
  'tensorflow': 0xff6f00,
  'git': 0xf05032,
  'docker': 0x2496ed,
  'supabase': 0x3ecf8e,
  'n8n': 0xea4b71,
  'ai': 0xff640f,
  'default': 0xf2640f,
};

function getColor(filename) {
  const lower = filename.toLowerCase();
  for (const [key, color] of Object.entries(colorMap)) {
    if (lower.includes(key)) return color;
  }
  return colorMap.default;
}

async function processGLB() {
  console.log(`Loading: ${glbPath}`);

  const loader = new GLTFLoader();
  const data = fs.readFileSync(glbPath);
  const blob = new Blob([data]);

  return new Promise((resolve, reject) => {
    loader.load(
      URL.createObjectURL(blob),
      (gltf) => {
        const scene = gltf.scene;
        const color = getColor(path.basename(glbPath));

        console.log(`Applying color: #${color.toString(16).padStart(6, '0')}`);

        let meshCount = 0;
        scene.traverse((child) => {
          if (child.isMesh) {
            meshCount++;

            // Create new material with color
            child.material = new THREE.MeshStandardMaterial({
              color: color,
              metalness: 0.3,
              roughness: 0.4,
              emissive: color,
              emissiveIntensity: 0.1,
            });

            // Compute normals for better lighting
            child.geometry.computeVertexNormals();
          }
        });

        console.log(`Processed ${meshCount} meshes`);

        // Export
        const exporter = new GLTFExporter();
        exporter.parse(
          scene,
          (result) => {
            const output = Buffer.from(result);
            fs.writeFileSync(outputPath, output);
            console.log(`Saved: ${outputPath} (${(output.length / 1024 / 1024).toFixed(2)} MB)`);
            resolve();
          },
          (error) => reject(error),
          { binary: true }
        );
      },
      undefined,
      reject
    );
  });
}

processGLB().catch(console.error);

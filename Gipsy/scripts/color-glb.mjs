import { NodeIO } from '@gltf-transform/core';

const glbPath = process.argv[2] || 'public/models/react.glb';
const outputPath = process.argv[3] || glbPath.replace('.glb', '-colored.glb');

// Color hex to linear RGB
function hexToLinear(hex) {
  const r = ((hex >> 16) & 255) / 255;
  const g = ((hex >> 8) & 255) / 255;
  const b = (hex & 255) / 255;
  // sRGB to linear
  const toLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return [toLinear(r), toLinear(g), toLinear(b)];
}

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
  const io = new NodeIO();
  const doc = await io.read(glbPath);
  const color = getColor(glbPath);
  const [r, g, b] = hexToLinear(color);

  console.log(`File: ${glbPath}`);
  console.log(`Color: #${color.toString(16).padStart(6, '0')} -> [${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}]`);

  const materials = doc.getRoot().listMaterials();
  console.log(`Materials found: ${materials.length}`);

  for (const mat of materials) {
    console.log(`  - ${mat.getName() || 'unnamed'}`);

    // Set base color
    mat.setBaseColorFactor([r, g, b, 1.0]);

    // Set metallic-roughness
    mat.setMetallicFactor(0.2);
    mat.setRoughnessFactor(0.5);

    // Set emissive for glow effect
    mat.setEmissiveFactor([r * 0.15, g * 0.15, b * 0.15]);
  }

  // If no materials exist, create one
  if (materials.length === 0) {
    console.log('No materials found - GLB might use vertex colors or no mesh');
  }

  await io.write(outputPath, doc);
  console.log(`Saved: ${outputPath}`);
}

processGLB().catch(console.error);

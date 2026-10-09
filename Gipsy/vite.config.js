import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // React Refresh depends on window, which is unavailable inside a worker.
  plugins: [react({ exclude: /(?:hero-scene\.worker|HeroSceneContent)\.jsx$/ }), tailwindcss()],
  esbuild: { jsx: 'automatic' },
  appType: 'mpa',
  base: "./",
  worker: { format: 'es' },
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          // Keep shared runtimes out of the lazy 3D bundle.
          if (id.includes('commonjsHelpers') || /node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return 'vendor-react';
          if (/node_modules[/\\]gsap[/\\]/.test(id)) return 'vendor-gsap';
          if (/node_modules[/\\](three[/\\]|@react-three[/\\])/.test(id)) return 'vendor-three';
        },
      },
    },
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  root: 'www',
  publicDir: '../public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'bundled',
    // ADD THIS SECTION: It stops Vite from breaking the 3D classes
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

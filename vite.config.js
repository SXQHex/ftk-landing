import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2017', // modern tarayıcılar için daha küçük bundle
    minify: 'esbuild',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  server: {
    port: 5173,
    open: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
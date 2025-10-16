import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: [
        '@rollup/rollup-linux-x64-gnu'
      ],
      output: {
        manualChunks: undefined,
      },
    },
  },
})
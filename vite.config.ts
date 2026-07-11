import { defineConfig } from 'vite';

export default defineConfig({
  // Serve on all interfaces so the dev build can be opened on a phone
  // over the local network for real-device testing.
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    // Babylon.js is large by nature; raise the warning threshold so CI
    // noise doesn't hide real regressions in our own code size.
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the engine vendor bundle separate from game code so
          // browsers can cache it across app updates.
          babylon: ['@babylonjs/core'],
        },
      },
    },
  },
});

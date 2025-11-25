import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // This fixes path issues on Firebase
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Add this for better chunking
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000
  }
})

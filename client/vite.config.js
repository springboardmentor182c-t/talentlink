import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with '/api' to your Django server
      '/api': {
        target: 'http://localhost:8000', // Your Django server address
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ''), // Often unnecessary for Django paths
      },
    },
  },
})
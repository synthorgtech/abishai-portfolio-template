import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build a static SPA into dist/ for trivial hosting (Vercel/Netlify/any static host).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist', sourcemap: false },
})

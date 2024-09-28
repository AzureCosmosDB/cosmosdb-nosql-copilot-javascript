import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mkcert from 'vite-plugin-mkcert'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), mkcert(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})

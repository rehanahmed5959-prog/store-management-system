import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serve/build with relative asset paths so deploys to subpaths (GitHub Pages, Netlify subfolders)
  base: './',
  // Only scan the primary index.html entry and treat .js files as JSX during dep scan
  optimizeDeps: {
    entries: ["index.html"],
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  // Do not serve the legacy CRA `public` folder
  publicDir: false,
})

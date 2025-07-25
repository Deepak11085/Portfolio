// C:\Users\Deepak\OneDrive\Documents\Portfolio\vite.config.ts

import { defineConfig } from 'vite'
import path from 'path' // Keep path import if you use path.resolve for input

export default defineConfig({
  // **CRUCIAL ADDITION**: Defines the base public path when served in production.
  // './' ensures all asset paths in your built HTML/CSS/JS are relative to the current directory.
  // This is often ideal for GitHub Pages or if you're not deploying to the absolute root of a domain.
  base: './', 

  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clear output directory on build
    rollupOptions: {
      // Explicitly define index.html as the main entry point
      input: path.resolve(__dirname, 'index.html')
    }
  }
})
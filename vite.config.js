import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-version-to-assets',
      transformIndexHtml(html) {
        const version = Date.now();
        // Add ?v=version to any script or link referencing /assets/
        return html.replace(
          /(src|href)="\/(assets\/[^"]+)"/g,
          `$1="/$2?v=${version}"`
        );
      }
    }
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
})

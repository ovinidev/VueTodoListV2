import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@styles': path.resolve('./src/styles'),
      '@composables': path.resolve('./src/composables'),
      '@components': path.resolve('./src/components')
    }
  }
})

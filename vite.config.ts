import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vue Todo List V2',
        short_name: 'TodoList',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b883',
        icons: [
          {
            src: '/vue.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/vue.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@styles': path.resolve('./src/styles'),
      '@components': path.resolve('./src/components'),
      '@composables': path.resolve('./src/composables'),
      '@constants': path.resolve('./src/constants'),
      '@pages': path.resolve('./src/pages'),
      '@router': path.resolve('./src/router'),
      '@store': path.resolve('./src/store')
    }
  }
})

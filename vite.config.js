import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Gurukul MI Assessment',
        short_name: 'Gurukul MI',
        description: 'Multiple Intelligences Assessment Platform by Gurukul IAS',
        theme_color: '#0a0a0a',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/assets/images/gurukul_ias.jpeg',
            sizes: '192x192 512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jpeg,jpg}']
      }
    })
  ],
})

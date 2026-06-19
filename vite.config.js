import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        guideGratuit: resolve(__dirname, 'guide-gratuit.html'),
        guidePro: resolve(__dirname, 'guide-pro.html'),
        deco: resolve(__dirname, 'deco/index.html'),
      }
    }
  }
})

import path from 'path'
import { defineConfig } from 'vite'
// Plugins
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/exports.js'),
      name: 'Cullendar',
      fileName: 'cullendar'
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: { globals: { vue: 'Vue' } }
    }
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    extensions: ['.js', '.vue', '.json']
  }
})

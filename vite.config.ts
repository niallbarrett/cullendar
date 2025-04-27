import { resolve } from 'path'
import { defineConfig } from 'vite'
// Plugins
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Cullendar',
      fileName: 'cullendar'
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  }
})

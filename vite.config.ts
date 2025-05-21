import { resolve } from 'path'
import { defineConfig } from 'vite'
// Plugins
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: './tsconfig.app.json',
    rollupTypes: true
  })],
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
    alias: { '~': resolve(__dirname, './src') },
    extensions: ['.js', '.ts', '.vue']
  }
})

import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  resolve: {
    alias: { '~': resolve(__dirname, './src') },
    extensions: ['.js', '.ts', '.vue']
  }
})

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    setupFiles: ['./src/Tests/setupTests.tsx'],
    alias: {
      'welcome-ui/Text': path.resolve(__dirname, './src/Tests/welcome-uimock.tsx'),
      'welcome-ui/Button': path.resolve(__dirname, './src/Tests/welcome-uimock.tsx'),
      'welcome-ui/Loader': path.resolve(__dirname, './src/Tests/welcome-uimock.tsx'),
      'welcome-ui/Field': path.resolve(__dirname, './src/Tests/welcome-uimock.tsx'),
      'welcome-ui/InputText': path.resolve(__dirname, './src/Tests/welcome-uimock.tsx'),
    },
  },
})
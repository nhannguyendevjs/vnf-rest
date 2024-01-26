import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['html'],
    outputFile: {
      html: './dist/test-result/index.html',
    },
    coverage: {
      reporter: ['html'],
      reportsDirectory: './dist/test-coverage/unit/coverage',
    },
  },
})

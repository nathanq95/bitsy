module.exports = {
  coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: -10,
        },
      },
      verbose: true,
  setupFiles: ['./database/index.js'],
  setupFilesAfterEnv: ['./test-framework-config.js'],
};

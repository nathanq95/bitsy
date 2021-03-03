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
  setupFilesAfterEnv: ['./setup.js'],
  clearMocks: true
};

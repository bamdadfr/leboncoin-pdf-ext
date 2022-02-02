export default {
  verbose: true,
  testRegex: '\\.test\\.ts$',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  setupFiles: [
    'jest-webextension-mock',
    'jest-canvas-mock',
  ],
};

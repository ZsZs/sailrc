/* eslint-disable */
export default {
  displayName: 'sail-rc',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  testPathIgnorePatterns: ['<rootDir>/src/environments', '<rootDir>/src/assets'],
  collectCoverage: true,
  coverageReporters: ['html', 'json', 'text', 'cobertura', ['lcov', { projectRoot: '/' }]],
  reporters: ['default', 'jest-junit'],
  coveragePathIgnorePatterns: ['node_modules', 'test-config', 'interfaces', 'jestGlobalMocks.ts', '.module.ts', '<rootDir>/src/app/main.ts', '.mock.ts', 'index.ts'],
  coverageDirectory: '../../coverage/apps/sail-rc',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
};

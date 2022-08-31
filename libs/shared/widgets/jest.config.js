
module.exports = {
  displayName: 'shared-widgets',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    }
  },
  coverageDirectory: '../../../coverage/libs/shared/widgets',
  coverageReporters: ['html', 'json', 'text', 'cobertura', ['lcov', { projectRoot: '/' }]],
  coveragePathIgnorePatterns: ['node_modules', 'test-config', 'interfaces', 'jestGlobalMocks.ts', '.module.ts', '<rootDir>/src/app/main.ts', '.mock.ts', 'index.ts'],
  reporters: ['default', 'jest-junit'],
};

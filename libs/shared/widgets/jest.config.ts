/* eslint-disable */
import type {Config} from 'jest';

export default async (): Promise<Config> => {
  return {
    displayName: 'shared-widgets',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: [
      '<rootDir>/src/test-setup.ts',
      'jest-canvas-mock',
    ],
    coverageDirectory: '../../../coverage/libs/shared/widgets',
    coverageReporters: [ 'html', 'json', 'text', 'cobertura', [ 'lcov', { projectRoot: '/' } ] ],
    coveragePathIgnorePatterns: [ 'node_modules', 'test-config', 'interfaces', 'jestGlobalMocks.ts', '.module.ts', '<rootDir>/src/app/main.ts', '.mock.ts', 'index.ts' ],
    reporters: [ 'default', 'jest-junit' ],
    transform: {
      '^.+\\.(ts|mjs|js|html)$': [
        'jest-preset-angular',
        { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' },
      ],
    },
    transformIgnorePatterns: [ 'node_modules/(?!.*\\.mjs$)' ],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment'
    ],
  }
};
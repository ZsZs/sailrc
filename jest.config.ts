import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  collectCoverage: true,
  coverageReporters: ['html', 'json', 'text', 'cobertura', ['lcov', { projectRoot: '/' }]],
  reporters: ['default', 'jest-junit'],
  coveragePathIgnorePatterns: ['node_modules', 'test-config', 'interfaces', 'jestGlobalMocks.ts', '.module.ts', '<rootDir>/src/app/main.ts', '.mock.ts', 'index.ts']
};

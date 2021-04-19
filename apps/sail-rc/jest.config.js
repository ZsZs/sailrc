module.exports = {
  displayName: 'sail-rc',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
    },
  },
  collectCoverage: true,
  coverageDirectory: '../../coverage/apps/sail-rc',
  coverageReporters: ['html','json','text','cobertura',['lcov', {"projectRoot": "../"}]],
  reporters: [ 'default', 'jest-junit' ],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  testPathIgnorePatterns: ["<rootDir>/src/environments", "<rootDir>/src/assets"]
};

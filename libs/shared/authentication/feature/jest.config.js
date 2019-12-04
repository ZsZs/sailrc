module.exports = {
  name: 'shared-authentication-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/authentication/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

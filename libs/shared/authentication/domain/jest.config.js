module.exports = {
  name: 'shared-authentication-domain',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/authentication/domain',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

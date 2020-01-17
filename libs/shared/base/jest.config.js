module.exports = {
  name: 'shared-base',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/base',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

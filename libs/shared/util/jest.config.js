module.exports = {
  name: 'shared-util',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

module.exports = {
  name: 'shared-widgets',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/widgets',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

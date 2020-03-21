module.exports = {
  name: 'boat-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/boat/domain',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

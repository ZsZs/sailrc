module.exports = {
  name: 'boat-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/boat/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

module.exports = {
  name: 'boat-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/boat/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

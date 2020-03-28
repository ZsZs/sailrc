module.exports = {
  name: 'sailor-domain-sailor-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/sailor/domain/sailor-domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

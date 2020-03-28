module.exports = {
  name: 'sail-rc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sail-rc',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

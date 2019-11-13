module.exports = {
  name: 'sail-rc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sail-rc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

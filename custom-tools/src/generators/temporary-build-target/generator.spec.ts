import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { temporaryBuildTargetGenerator } from './generator';
import { TemporaryBuildTargetGeneratorSchema } from './schema';

describe('temporaryBuildTarget generator', () => {
  let tree: Tree;
  const options: TemporaryBuildTargetGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await temporaryBuildTargetGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

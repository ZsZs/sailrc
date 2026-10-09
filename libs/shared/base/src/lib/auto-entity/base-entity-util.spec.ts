import { getEntityInfo } from './base-entity-util';
import { TestEntity } from '../../test-setup';
import { makeEntity } from '@briebug/ngrx-auto-entity';

describe( 'base-entity-util', () => {
  it( 'getEntityInfo', () => {
    const entityInfo = getEntityInfo( TestEntity );
    expect( entityInfo.modelName ).toEqual('TestEntity');
    expect( entityInfo.uriName ).toEqual( 'testEntity' );
    expect( entityInfo.pluralName ).toEqual( 'testEntities' );
    expect( entityInfo.modelType ).toBeInstanceOf( Function );
    expect( makeEntity( entityInfo.modelType )).toBeInstanceOf( Function );
  });
});

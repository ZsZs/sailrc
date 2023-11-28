import { BaseFirestoreRepository } from './base-firestore-repository';
import { TestEntity } from '../../test-setup';
import { Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot, DocumentSnapshotExists } from '@angular/fire/compat/firestore';
import { MockService } from 'ng-mocks';
import { getEntityInfo } from '../auto-entity/base-entity-util';
import { Observable, of } from 'rxjs';
import { any, JestMockExtended, mock } from 'jest-mock-extended';
import { cold, hot } from 'jest-marbles';
import { TestScheduler } from 'rxjs/testing';

describe('BaseFirestoreRepository', () => {
  class TestRepository extends BaseFirestoreRepository<TestEntity> {
    constructor( protected firestore: AngularFirestore ) {
      super( firestore);
    }
  }
  const entity: TestEntity = { id: '1' };
  const entityInfo = getEntityInfo( TestEntity );

  let documentSnapshotAction: Action<DocumentSnapshot<TestEntity>>;
  let angularFirestoreDocument: AngularFirestoreDocument<any>;
  let angularFirestoreCollection: AngularFirestoreCollection<TestEntity>;
  let mockFirestore: AngularFirestore;
  let testRepository: TestRepository;
  let expectedEntities: Observable<TestEntity[]>;
  let scheduler: TestScheduler;

  beforeAll( () => {
    JestMockExtended.configure({ ignoreProps: ['schedule '] });
  });

  afterAll( () => {
    JestMockExtended.configure(JestMockExtended.DEFAULT_CONFIG);
  })

  beforeEach( async () => {
    scheduler = new TestScheduler( (actual, expected ) => {
      expect( actual ).toEqual( expected );
    })
  });

  beforeEach( async () => {
    const entities = hot('^-a-b-c', {a: entity, b: entity, c: entity });
    expectedEntities = cold('--a-b-c', {a: [entity], b: [entity], c: [entity] });
  });

  it( 'load() provides Observable by ID', done => {
    configureAngularFirestoreStub( entity );
    jest.spyOn( angularFirestoreCollection, 'doc');

//    const response = testRepository.load( entityInfo, {id: '1'});
    of( documentSnapshotAction ).subscribe( (docu) => {
      expect( docu ).toBeTruthy();
      done();
    })
//    expect( angularFirestoreCollection.doc ).toHaveBeenCalledWith( '1' );
  });

  it.skip( 'loadAll() provides Observable by IEntityInfo', async () => {
    scheduler.run(({expectObservable}) => {
      expectObservable( testRepository.loadAll( entityInfo )).toBe( '--a-b-c', expectedEntities );
    });
  });

  // region helper methods
  function configureAngularFirestoreStub( input: TestEntity ) {
    const documentSnapshot = mock<DocumentSnapshotExists<TestEntity>>();
    documentSnapshot.data.calledWith( any() ).mockReturnValue(  input );
    // const documentSnapshotAction = mock<Action<DocumentSnapshot<TestEntity>>>();
    // documentSnapshotAction.payload = documentSnapshot;
    documentSnapshotAction = mock<Action<DocumentSnapshot<TestEntity>>>();
    documentSnapshotAction.payload = documentSnapshot;

    angularFirestoreDocument = MockService( AngularFirestoreDocument, { snapshotChanges: () => hot( '-a', {a: documentSnapshotAction })});
    angularFirestoreCollection = MockService( AngularFirestoreCollection, {doc: () => angularFirestoreDocument } );
    mockFirestore = MockService( AngularFirestore,  { collection: () => angularFirestoreCollection });
    testRepository = new TestRepository( mockFirestore );
  }
  // endregion
})

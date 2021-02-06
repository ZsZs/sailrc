import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { EditEntity } from '../auto-entity-form/actions';
import { IBaseEntityFacade } from '../auto-entity/i-base-entity.facade';
import { IEntityFormState } from '../auto-entity-form/form-state';
import { filter, first, tap } from 'rxjs/operators';
import { makeEntity } from '@briebug/ngrx-auto-entity';

export abstract class BaseResolver<T extends BaseEntityInterface> implements Resolve<T> {
  protected parameterName: string;

  protected constructor( protected entityFacade: IBaseEntityFacade<T>, protected store: Store<any>
  ) {
    this.parameterName = this.entityFacade.entityIdPathVariable;
  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<T> {
    const idParameter = this.resolveParameter( route, this.parameterName );
    let entity: Observable<T>;
    if ( idParameter === 'new' ) {
      entity = this.resolveNewEntity( route );
    } else {
      entity = this.resolveEntity( idParameter );
    }

    return entity;
  }

  // region protected, private helper methods
  protected resolveNewEntity( route: ActivatedRouteSnapshot ): Observable<T> {
    const entity = makeEntity<T>( this.entityFacade.entityInfo.modelType ) as any;
    this.store.dispatch( new EditEntity<T>( this.entityFacade.entityInfo.modelType, entity ));
    return from( [entity]);
  }

  protected resolveEntity( entityId: string ): Observable<T> {
    return this.store.pipe(
      select( this.entityFacade.getEntityById( entityId )),
      tap( entity => {
        if( !entity ) this.entityFacade.load({ id: entityId });
      }),
      filter( entity => !! entity ),
      first(),
      tap( entity => this.entityFacade.select( entity )),
      tap( entity => this.store.dispatch( new EditEntity( this.entityFacade.entityInfo.modelType, entity )))
    );
  }

  protected resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
  // endregion
}

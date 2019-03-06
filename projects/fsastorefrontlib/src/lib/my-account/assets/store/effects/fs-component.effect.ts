import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as componentActions from '@spartacus/core';
import { OccCmsService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';


@Injectable()
export class FSComponentEffects {

  constructor(
    private actions$: Actions,
    private occCmsService: OccCmsService,
    private routingService: RoutingService
  ) {
  }

  @Effect()
  loadComponent$: Observable<any> = this.actions$.pipe(
    ofType(componentActions.LOAD_COMPONENT),
    map((action: componentActions.LoadComponent) => action.payload),
    mergeMap(uid => {
      return this.routingService.getRouterState().pipe(
        filter(routerState => routerState !== undefined),
        map(routerState => routerState.state.context),
        take(1),
        mergeMap(pageContext =>
          this.occCmsService.loadComponent(uid, pageContext).pipe(
            map(data => new componentActions.LoadComponentSuccess(data)),
            catchError(error =>
              of(new componentActions.LoadComponentFail(uid))
            )
          )
        )
      );
    })
  );
}

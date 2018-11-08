import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import * as fromAction from '../actions/card-types.action';

@Injectable()
export class CardTypesEffects {
  @Effect()
  loadCardTypes$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.LOAD_CARD_TYPES),
    switchMap(() => {
      return this.occMiscsService.loadCardTypes().pipe(
        map(data => new fromAction.LoadCardTypesSuccess(data.cardTypes)),
        catchError(error => of(new fromAction.LoadCardTypesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}

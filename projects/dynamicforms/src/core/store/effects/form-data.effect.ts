import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { FormConnector } from '../../connectors/form.connector';
import { FormDataStorageService } from '../../services/storage/form-data-storage.service';
import * as fromActions from '../actions';

@Injectable()
export class FormDataEffects {
  
  loadFormData$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.LOAD_FORM_DATA),
    map((action: fromActions.LoadFormData) => action.payload),
    mergeMap(payload => {
      return this.formConnector
        .getFormData(payload.formDataId, payload.userId)
        .pipe(
          map((formData: any) => {
            return new fromActions.LoadFormDataSuccess(formData);
          }),
          catchError(error => {
            return of(new fromActions.LoadFormDataFail(JSON.stringify(error)));
          })
        );
    })
  ));

  
  saveFormData$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SAVE_FORM_DATA),
    map((action: fromActions.SaveFormData) => action.payload),
    mergeMap(payload => {
      return this.formConnector
        .saveFormData(payload.formData, payload.userId)
        .pipe(
          map((formData: any) => {
            return new fromActions.SaveFormDataSuccess(formData);
          }),
          catchError(error => {
            return of(new fromActions.SaveFormDataFail(JSON.stringify(error)));
          })
        );
    })
  ));

  
  clearFormData$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(_ => {
      sessionStorage.removeItem('quoteCodes');
      this.formDataStorageService.clearFormDataLocalStorage();
    })
  ), { dispatch: false });

  constructor(
    private formDataStorageService: FormDataStorageService,
    private actions$: Actions,
    private formConnector: FormConnector
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { FormConnector } from '../../connectors/form-connector';

@Injectable()
export class FormDefinitionEffects {
  @Effect()
  loadFormDefinition$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_FORM_DEFINITION),
    map((action: fromActions.LoadFormDefinition) => action.payload),
    mergeMap(payload => {
      return this.formConnector
        .getFormDefinition(payload.applicationId, 'payload.formDefinitionId')
        .pipe(
          map((formDefinition: any) => {
            return new fromActions.LoadFormDefinitionSuccess(formDefinition);
          }),
          catchError(error => {
            this.showGlobalMessage('forms.definitionLoadError');
            return of(
              new fromActions.LoadFormDefinitionFail(JSON.stringify(error))
            );
          })
        );
    })
  );

  private showGlobalMessage(text: string) {
    this.globalMessageService.add(
      { key: text },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private formConnector: FormConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}

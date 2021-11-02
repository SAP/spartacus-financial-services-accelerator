import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FormConnector } from '../../connectors/form.connector';
import * as fromActions from '../actions';

@Injectable()
export class FormDefinitionEffects {
  loadFormDefinition$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_FORM_DEFINITION),
      map((action: fromActions.LoadFormDefinition) => action.payload),
      mergeMap(payload => {
        if (payload.formDefinitionId) {
          return this.formConnector
            .getFormDefinition(payload.applicationId, payload.formDefinitionId)
            .pipe(
              map((formDefinition: any) => {
                return new fromActions.LoadFormDefinitionSuccess(
                  formDefinition
                );
              }),
              catchError(error => {
                this.showGlobalMessage('dynamicforms.definitionLoadError');
                return of(
                  new fromActions.LoadFormDefinitionFail(JSON.stringify(error))
                );
              })
            );
        }
        return this.formConnector
          .getFormDefinitions(payload.categoryCode, payload.formDefinitionType)
          .pipe(
            map((definitions: any) => {
              return new fromActions.LoadFormDefinitionSuccess(
                definitions.formDefinitions[0]
              );
            }),
            catchError(error => {
              this.showGlobalMessage('dynamicforms.definitionLoadError');
              return of(
                new fromActions.LoadFormDefinitionFail(JSON.stringify(error))
              );
            })
          );
      })
    )
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

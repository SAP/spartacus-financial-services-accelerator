import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload.connector';
import * as fromActions from '../actions';

@Injectable()
export class UploadFilesEffects {
  @Effect()
  uploadFiles$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPLOAD_FILES),
    map((action: fromActions.UploadFiles) => action.payload),
    mergeMap(payload => {
      return this.uploadConnector
        .uploadFile(payload.userId, payload.files)
        .pipe(
          map((fileData: any) => {
            return new fromActions.LoadFormDataSuccess(fileData);
          }),
          catchError(error => {
            return of(new fromActions.LoadFormDataFail(JSON.stringify(error)));
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private uploadConnector: UploadConnector
  ) {}
}

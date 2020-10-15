import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload.connector';
import * as fromActions from '../actions';

@Injectable()
export class FilesEffect {
  @Effect()
  removeFile$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.REMOVE_FILE),
    map((action: fromActions.RemoveFile) => action.payload),
    mergeMap(payload => {
      return this.uploadConnector
        .removeFile(payload.user, payload.fileCode)
        .pipe(
          map(() => {
            return new fromActions.RemoveFileSuccess(payload.fileCode);
          }),
          catchError(error => {
            return of(new fromActions.RemoveFileFail(JSON.stringify(error)));
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private uploadConnector: UploadConnector
  ) {}
}

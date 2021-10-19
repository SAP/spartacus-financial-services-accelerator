import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { FileConnector } from '../../connectors/file.connector';

@Injectable()
export class FilesEffect {
  
  removeFile$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.REMOVE_FILE),
    map((action: fromActions.RemoveFile) => action.payload),
    mergeMap(payload => {
      return this.fileConnector.removeFile(payload.user, payload.fileCode).pipe(
        map(() => {
          return new fromActions.RemoveFileSuccess(payload.fileCode);
        }),
        catchError(error => {
          return of(new fromActions.RemoveFileFail(JSON.stringify(error)));
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private fileConnector: FileConnector
  ) {}
}

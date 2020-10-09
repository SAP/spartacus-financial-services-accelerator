import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload.connector';
import * as fromAction from '../../store/actions';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FileUploadService {
  constructor(
    protected authService: AuthService,
    protected uploadConnector: UploadConnector,
    protected store: Store<StateWithForm>
  ) {}

  uploadFile(file: File): Observable<any> {
    return this.authService.getOccUserId().pipe(
      take(1),
      tap(occUserId => {
        this.store.dispatch(
          new fromAction.UploadFile({
            userId: occUserId,
            file: file,
          })
        );
      }),
      switchMap(occUserId => this.uploadConnector.uploadFile(occUserId, file))
    );
  }
}

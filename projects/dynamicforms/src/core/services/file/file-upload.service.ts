import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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
      switchMap(occUserId => {
        this.store.dispatch(
          new fromAction.UploadFile({
            userId: occUserId,
            file: file,
          })
        );
        return this.uploadConnector.uploadFile(occUserId, file);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload.connector';
import * as fromAction from '../../store/actions';
import * as uploadSelector from '../../store/selectors/upload.selector';
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
        return this.uploadConnector.uploadFile(occUserId, file);
      })
    );
  }

  getFileStatus(body: any) {
    this.store.dispatch(
      new fromAction.UploadFileSuccess({
        body,
      })
    );
  }

  getUploadedDocuments(): Observable<any> {
    return this.store.select(uploadSelector.getUploadFiles);
  }

  isFileLoaded(): Observable<boolean> {
    return this.store.select(uploadSelector.getUploadFilesLoaded);
  }
}

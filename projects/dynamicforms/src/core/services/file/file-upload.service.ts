import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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

  uploadFile(file: File) {
    this.authService.getOccUserId().pipe(
      take(1),
      map(occUserId => {
        this.store.dispatch(
          new fromAction.UploadFile({
            userId: occUserId,
            file: file,
          })
        );
      })
    );
  }

  getFileStatus(file: File): Observable<any> {
    return this.uploadConnector.uploadFile(OCC_USER_ID_CURRENT, file);
  }

  getUploadedDocuments(): Observable<any> {
    return this.store.select(uploadSelector.getUploadFiles);
  }

  isFileLoaded(): Observable<boolean> {
    return this.store.select(uploadSelector.getUploadFilesLoaded);
  }
}

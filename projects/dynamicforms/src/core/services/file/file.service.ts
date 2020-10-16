import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FileConnector } from '../../connectors/file.connector';
import * as fromAction from '../../store/actions';
import * as uploadSelector from '../../store/selectors/upload.selector';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FileService {
  constructor(
    protected authService: AuthService,
    protected fileConnector: FileConnector,
    protected store: Store<StateWithForm>
  ) {}

  uploadFile(file: File): Observable<any> {
    return this.authService.getOccUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.fileConnector.uploadFile(occUserId, file);
      })
    );
  }

  resetFiles(): void {
    this.store.dispatch(new fromAction.ResetFileSuccess({}));
  }

  setFileInStore(body: any) {
    this.store.dispatch(
      new fromAction.UploadFileSuccess({
        body,
      })
    );
  }

  getUploadedDocuments(): Observable<any> {
    return this.store.select(uploadSelector.getUploadFiles);
  }

  removeFileForCode(userId: string, fileCode: string) {
    this.store.dispatch(
      new fromAction.RemoveFile({
        user: userId,
        fileCode: fileCode,
      })
    );
  }

  removeAllFiles(userId, fileList) {
    if (fileList?.length > 0) {
      fileList.forEach(file => {
        const fileCode = file?.code;
        this.removeFileForCode(userId, fileCode);
      });
    }
  }
}

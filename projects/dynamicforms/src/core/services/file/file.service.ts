import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { FileConnector } from '../../connectors/file.connector';
import * as fromAction from '../../store/actions';
import * as uploadSelector from '../../store/selectors/upload.selector';
import { StateWithForm } from '../../store/state';
import { saveAs } from 'file-saver';
import { OboCustomerService } from '../../../core/services/obo-customer/obo-customer.service';

@Injectable()
export class FileService {
  constructor(
    protected userIdService: UserIdService,
    protected fileConnector: FileConnector,
    protected store: Store<StateWithForm>,
    protected oboCustomerService: OboCustomerService
  ) {}

  getFile(fileCode: string, fileType: string): Observable<any> {
    return this.userIdService.getUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.fileConnector.getFile(occUserId, fileCode, fileType);
      })
    );
  }

  getFiles(fileCodes?: Array<string>): Observable<any> {
    return this.userIdService.getUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.fileConnector.getFiles(occUserId, fileCodes);
      })
    );
  }

  uploadFile(file: File): Observable<any> {
    return this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(switchMap(userId => this.fileConnector.uploadFile(userId, file)));
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
        if (fileCode) {
          this.removeFileForCode(userId, fileCode);
        }
      });
    }
  }

  getDocument(document) {
    return this.getFile(document.code, document.mime).pipe(
      map(downloadedFile => {
        saveAs(downloadedFile, document.altText);
      })
    );
  }
}

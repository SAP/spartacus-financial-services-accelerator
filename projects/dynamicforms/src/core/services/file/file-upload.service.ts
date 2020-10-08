import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload.connector';
import * as fromAction from '../../store/actions';
import * as fromSelector from '../../store/selectors';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FileUploadService {
  constructor(
    protected authService: AuthService,
    protected uploadConnector: UploadConnector,
    protected store: Store<StateWithForm>
  ) {}

  uploadFile(file: File) {
    this.store.dispatch(
      new fromAction.UploadFiles({
        file: file,
      })
    );
  }

  // getUploadedFiles(file: File): Observable<any> {
  //   return this.authService.getOccUserId().pipe(
  //     take(1),
  //     switchMap(occUserId => {
  //       return this.uploadConnector.uploadFile(occUserId, file);
  //     })
  //   );
  // }

  getUploadedFiles(): Observable<any> {
    return this.store.select(fromSelector.getUploadFilesLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getUploadFiles);
      })
    );
  }
}

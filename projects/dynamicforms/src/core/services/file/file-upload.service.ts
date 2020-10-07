import { Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UploadConnector } from '../../connectors/upload-connector';

@Injectable()
export class FileUploadService {
  constructor(
    protected authService: AuthService,
    protected uploadConnector: UploadConnector
  ) {}

  uploadFile(file: File): Observable<any> {
    return this.authService.getOccUserId().pipe(
      take(1),
      switchMap(occUserId => {
        return this.uploadConnector.uploadFile(occUserId, file);
      })
    );
  }
}

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadAdapter } from '../../../core/connectors/upload.adapter';

const FULL_PARAMS = 'FULL';

@Injectable()
export class OccUploadAdapter implements UploadAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  uploadFiles(userId, file: File): Observable<any> {
    const url = this.occEndpointService.getUrl('uploadFile', {
      userId: userId,
    });
    const params: HttpParams = new HttpParams().set('fields', FULL_PARAMS);
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http
      .post<any>(url, data, {
        reportProgress: true,
        observe: 'events',
        params: params,
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeFile(userId: string, fileCode: string): Observable<any> {
    const url = this.occEndpointService.getUrl('removeFile', {
      userId,
      fileCode,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}

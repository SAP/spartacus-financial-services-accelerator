import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
  User,
} from '@spartacus/core';
import { OccUserAccountAdapter } from '@spartacus/user/account/occ';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccFSUserAdapter extends OccUserAccountAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected occEndpointService: OccEndpointsService
  ) {
    super(http, occEndpoints, converter);
  }

  close(userId: string): Observable<unknown> {
    const url = this.occEndpointService.buildUrl('disableUser', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .delete<User>(url)
      .pipe(catchError(error => throwError(normalizeHttpError(error))));
  }
}

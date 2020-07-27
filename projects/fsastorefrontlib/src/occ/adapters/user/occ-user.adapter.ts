import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  OccUserAdapter,
  User,
} from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class OccFSUserAdapter extends OccUserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {
    super(http, occEndpoints, converter);
  }

  remove(userId: string): Observable<{}> {
    const url = this.occEndpoints.getUrl('disableUser', { userId });
    return this.http.delete<User>(url);
  }
}

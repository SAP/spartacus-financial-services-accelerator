import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService, User } from '@spartacus/core';
import { OccUserAccountAdapter } from '@spartacus/user/account/occ';
import { Observable } from 'rxjs/internal/Observable';

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

  remove(userId: string): Observable<{}> {
    const url = this.occEndpointService.buildUrl('disableUser', {
      urlParams: {
        userId,
      },
    });
    return this.http.delete<User>(url);
  }
}

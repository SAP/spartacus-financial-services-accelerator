import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OccConfig } from '@spartacus/core';

const E2E_CONFIGURATION_ENDPOINT =
  '/e2econfigurationwebservices/e2econfiguration';

@Injectable()
export class OccE2eConfigurationService {
  constructor(private http: HttpClient, private occModuleConfig: OccConfig) {}

  getConfiguration(configurationKey: string): Observable<any> {
    const url = this.getConfigurationEndpoint() + '/' + configurationKey;

    return this.http
      .get(url, { responseType: 'text' })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getConfigurationEndpoint() {
    return this.occModuleConfig.server.baseUrl + E2E_CONFIGURATION_ENDPOINT;
  }
}

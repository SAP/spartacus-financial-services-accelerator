import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccYformService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public saveFormData(
    definitionId: string,
    applicationId: string,
    formDataId: string,
    formContent: any
  ) {
    const url = this.getYFormsEndpoint() + '/data';
    const params = new HttpParams({
      fromString:
        FULL_PARAMS +
        '&definitionId=' +
        definitionId +
        '&applicationId=' +
        applicationId +
        '&formDataId=' +
        formDataId,
    });
    return this.http
      .put(url, formContent, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getYFormsEndpoint() {
    const formsEndpoint = '/forms';
    return this.occEndpointService.getBaseEndpoint() + formsEndpoint;
  }
}

import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class OccYFormService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public getFormDefinition(definitionId: string): Observable<any> {
    const url = this.getFormsEndpoint();
    const formDefitionUrl = url + '/definition/' + definitionId;

    return this.http
      .get(formDefitionUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  protected getFormsEndpoint() {
    const formsEndpoint = '/yforms';
    return this.occEndpointService.getBaseEndpoint() + formsEndpoint;
  }
}
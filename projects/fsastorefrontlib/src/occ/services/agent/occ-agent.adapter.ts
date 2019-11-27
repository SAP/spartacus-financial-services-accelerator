import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AgentAdapter } from './agent.adapter';

@Injectable()
export class OccAgentAdapter implements AgentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public getAgentsByCategory(category: string): Observable<any> {
    const url = this.getAgentsEndpoint();
    const categoryParam = 'categoryCode=' + category + '&fields=DEFAULT';
    const params = new HttpParams({ fromString: categoryParam });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }


  public getAgentsByQuery(searchQuery: string, pageNumber: number) {
    const url = this.getAgentsEndpoint() + '/search';
    const query = '&page=' + pageNumber.toString() + '&fields=DEFAULT';
    let params = new HttpParams({ fromString: query });

    if (searchQuery) {
      params = params.set('queryParam', searchQuery);
    }

    return this.http
      .get<any>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getAgentsEndpoint() {
    const agentsEndpoint = '/agents';
    return this.occEndpointService.getBaseEndpoint() + agentsEndpoint;
  }
}

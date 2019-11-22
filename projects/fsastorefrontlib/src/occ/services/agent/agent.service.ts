import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class OccAgentService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  private PAGE_SIZE = 2;

  public getAgentsByCategory(category: string): Observable<any> {
    const url = this.getAgentsEndpoint();
    const categoryParam = 'categoryCode=' + category + '&fields=DEFAULT';
    const params = new HttpParams({ fromString: categoryParam });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public searchAgents(searhQuery: string, pageNumber: number) {
    const url = this.getAgentsEndpoint() + '/search';
    const queryParam = 'queryParam=' + searhQuery + '&&page=' + pageNumber.toString() + '&pageSize=' + this.PAGE_SIZE + '&fields=DEFAULT';
    const params = new HttpParams({ fromString: queryParam });

    return this.http
      .get<any>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getAgentsEndpoint() {
    const agentsEndpoint = '/agents';
    return this.occEndpointService.getBaseEndpoint() + agentsEndpoint;
  }
}

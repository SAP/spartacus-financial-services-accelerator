import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { FSProductAssignmentAdapter } from '../../../core/product-assignment/connectors';

@Injectable()
export class OccFSProductAssignmentAdapter
  implements FSProductAssignmentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string
  ): Observable<any> {
    // TODO: search config - sorting, pagination, etc
    const url = this.getChangeRequestEndpoint(userId, orgUnitId);
    const params = new HttpParams();
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  protected getChangeRequestEndpoint(userId: string, orgUnitId: string) {
    const productAssignmentsEndpoint =
      '/users/' + userId + '/orgUnits/' + orgUnitId + '/fsProductAssignments';
    return (
      this.occEndpointService.getBaseEndpoint() + productAssignmentsEndpoint
    );
  }
}

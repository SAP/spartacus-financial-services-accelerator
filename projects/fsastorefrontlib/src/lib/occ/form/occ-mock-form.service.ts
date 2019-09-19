import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';


@Injectable()
export class OccMockFormService {

  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
  ) {
  }

  getValues(url: string): Observable<any> {
    return this.http
      .get(this.occEndpointService.getBaseEndpoint() + url);
  }
}

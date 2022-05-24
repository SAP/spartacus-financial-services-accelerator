import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { AppointmentSchedulingAdapter } from '@spartacus/fsa-storefront';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactAgentData } from '../../occ-models';

@Injectable()
export class OccAppointmentSchedulingAdapter implements AppointmentSchedulingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createAppointmentForAgent(
    agentId: string,
    userId: string,
    formData: any
  ) {
    const url = this.occEndpointService.buildUrl('createAppointment', {
      urlParams: {
        userId,
      },
    });
    let params = new HttpParams({});
    if (agentId) {
      params = params.set('agentId', agentId);
    }
    const body = this.createAppointmentSchedulingBody(formData, {});
    return this.http
      .post(url, body, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected createAppointmentSchedulingBody(ticketData: ContactAgentData, body: any) {
    body = {
      subject: 'subject',
      description: 'description',
      consentGiven: true,
      date: '2022-05-29 12:13',
    };
    return body;
  }
}

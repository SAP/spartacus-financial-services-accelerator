import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { AppointmentSchedulingAdapter } from '../../../core/appointment-scheduling/connectors/appointment-scheduling.adapter';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccAppointmentSchedulingAdapter
  implements AppointmentSchedulingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createAppointmentForAgent(agentId: string, userId: string, formData: any) {
    const url = this.occEndpointService.buildUrl('createAppointment', {
      urlParams: {
        userId,
      },
    });
    let params = new HttpParams({});
    if (agentId) {
      params = params.set('agentId', agentId);
    }
    const body = this.createAppointmentSchedulingBody(formData);
    return this.http
      .post(url, body, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected createAppointmentSchedulingBody(formData: any) {
    const {
      subject,
      description,
      consentGiven,
      appointmentDate,
      appointmentTime,
    } = formData;

    return {
      subject,
      description,
      consentGiven,
      date: `${appointmentDate} ${appointmentTime}`,
    };
  }
}

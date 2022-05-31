import { Injectable } from '@angular/core';
import { AppointmentData } from '../../../occ/occ-models/occ.models';
import { Observable } from 'rxjs';
import { AppointmentSchedulingAdapter } from './appointment-scheduling.adapter';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSchedulingConnector {
  constructor(
    protected appointmentSchedulingAdapter: AppointmentSchedulingAdapter
  ) {}

  createAppointmentForAgent(
    agentId: string,
    userId: string,
    appointmentData: AppointmentData
  ): Observable<any> {
    return this.appointmentSchedulingAdapter.createAppointmentForAgent(
      agentId,
      userId,
      appointmentData
    );
  }
}

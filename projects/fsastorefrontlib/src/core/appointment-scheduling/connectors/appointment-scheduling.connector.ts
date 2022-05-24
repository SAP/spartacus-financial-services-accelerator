import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentSchedulingAdapter } from './appointment-scheduling.adapter';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSchedulingConnector {
  constructor(protected appointmentSchedulingAdapter: AppointmentSchedulingAdapter) {}

  createAppointmentForAgent(
    agentId: string,
    userId: string,
    appontmentData: any
  ): Observable<any> {
    return this.appointmentSchedulingAdapter.createAppointmentForAgent(
      agentId,
      userId,
      appontmentData
    );
  }
}

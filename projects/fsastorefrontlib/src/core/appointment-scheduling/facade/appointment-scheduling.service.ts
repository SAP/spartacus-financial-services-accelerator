import { Injectable } from '@angular/core';
import { AppointmentData } from '../../../occ/occ-models/occ.models';
import { AppointmentSchedulingConnector } from '../connectors';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSchedulingService {
  constructor(
    protected appointmentSchedulingConnector: AppointmentSchedulingConnector
  ) {}

  createAppointment(
    agentId: string,
    userId: string,
    appointmentData: AppointmentData
  ) {
    return this.appointmentSchedulingConnector.createAppointmentForAgent(
      agentId,
      userId,
      appointmentData
    );
  }
}

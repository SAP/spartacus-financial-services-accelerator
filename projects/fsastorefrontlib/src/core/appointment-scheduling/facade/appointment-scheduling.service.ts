import { Injectable } from '@angular/core';
import { AppointmentSchedulingConnector } from '../connectors';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSchedulingService {
  constructor(protected appointmentSchedulingConnector: AppointmentSchedulingConnector) {}

  createAppointment(
    agentId: string,
    userId: string,
    appointmentSchedulingData: any
  ) {
    return this.appointmentSchedulingConnector.createAppointmentForAgent(
      agentId,
      userId,
      appointmentSchedulingData
    );
  }
}

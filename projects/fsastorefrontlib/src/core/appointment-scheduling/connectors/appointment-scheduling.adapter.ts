import { AppointmentData } from '../../../occ/occ-models/occ.models';

export abstract class AppointmentSchedulingAdapter {
  /**
   * Abstract method used to create appointment for customer
   *
   * @param agentId The agent id
   * @param userId The user id
   * @param appointmentData The submitted appointment data
   */
  abstract createAppointmentForAgent(
    agentId: string,
    userId: string,
    appointmentData: AppointmentData
  );
}

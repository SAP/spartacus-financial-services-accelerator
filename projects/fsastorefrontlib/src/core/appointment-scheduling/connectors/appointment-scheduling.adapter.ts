
export abstract class AppointmentSchedulingAdapter {
  /**
   * Abstract method used to create appointment for customer
   *
   * @param agentId The agent id
   * @param userId The user id
   * @param appointmentSchedulingData The submitted appointment data
   */
  abstract createAppointmentForAgent(
    agentId: string,
    userId: string,
    appointmentSchedulingData: any
  );
}

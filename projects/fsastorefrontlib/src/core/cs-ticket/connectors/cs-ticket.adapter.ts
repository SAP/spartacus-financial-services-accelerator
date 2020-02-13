import { ContactAgentData } from '../../../../src/occ/occ-models';

export abstract class FSCsTicketAdapter {
  /**
   * Abstract method used to create customer support ticket
   *
   * @param agentId The agent id
   * @param userId The user id
   * @param ticketData The submitted ticket data
   */
  abstract createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketData: ContactAgentData
  );
}

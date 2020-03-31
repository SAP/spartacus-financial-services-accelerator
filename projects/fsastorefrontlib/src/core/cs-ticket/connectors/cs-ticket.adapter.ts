import { ContactAgentData } from './../../../occ/occ-models';

export abstract class CsTicketAdapter {
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

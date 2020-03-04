import { FSCsTicketConnector } from './../connectors/cs-ticket.connector';
import { Injectable } from '@angular/core';
import { ContactAgentData } from '../../../occ/occ-models';

@Injectable({
  providedIn: 'root',
})
export class FSCsTicketService {
  constructor(protected ticketConnector: FSCsTicketConnector) {}

  createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketData: ContactAgentData
  ) {
    return this.ticketConnector.createCsTicketForAgent(
      agentId,
      userId,
      ticketData
    );
  }
}

import { Injectable } from '@angular/core';
import { ContactAgentData } from '../../../occ/occ-models';
import { CsTicketConnector } from './../connectors/cs-ticket.connector';

@Injectable({
  providedIn: 'root',
})
export class CsTicketService {
  constructor(protected ticketConnector: CsTicketConnector) {}

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

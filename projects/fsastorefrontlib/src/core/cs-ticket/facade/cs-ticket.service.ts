import { FSCsTicketConnector } from './../connectors/cs-ticket.connector';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FSCsTicketService {
  constructor(
    protected ticketConnector: FSCsTicketConnector,
  ) {}

  createCsTicketForAgent(agentId: string, userId: string, ticketData: any) {
    return this.ticketConnector.createCsTicketForAgent(
      agentId,
      userId,
      ticketData
    );
  }

}

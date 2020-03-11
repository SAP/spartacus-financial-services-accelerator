import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FSCsTicketAdapter } from './cs-ticket.adapter';
import { ContactAgentData } from '../../../occ/occ-models';

@Injectable({
  providedIn: 'root',
})
export class FSCsTicketConnector {
  constructor(protected csTicketAdapter: FSCsTicketAdapter) {}

  createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketData: ContactAgentData
  ): Observable<any> {
    return this.csTicketAdapter.createCsTicketForAgent(
      agentId,
      userId,
      ticketData
    );
  }
}

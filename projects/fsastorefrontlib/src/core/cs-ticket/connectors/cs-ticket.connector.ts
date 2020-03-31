import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactAgentData } from '../../../occ/occ-models';
import { CsTicketAdapter } from './cs-ticket.adapter';

@Injectable({
  providedIn: 'root',
})
export class CsTicketConnector {
  constructor(protected csTicketAdapter: CsTicketAdapter) {}

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

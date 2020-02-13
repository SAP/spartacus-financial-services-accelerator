import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FSCsTicketAdapter } from './cs-ticket.adapter';

@Injectable({
    providedIn: 'root',
})
export class FSCsTicketConnector {

    constructor(protected csTicketAdapter: FSCsTicketAdapter) { }

    createCsTicketForAgent(agentId: string, userId: string, ticketData: any): Observable<any> {
        return this.csTicketAdapter.createCsTicketForAgent(agentId, userId, ticketData);
    }
}

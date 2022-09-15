import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CsTicketAdapter } from '../../../core/cs-ticket/connectors';
import { ContactAgentData } from '../../occ-models';

@Injectable()
export class OccCsTicketAdapter implements CsTicketAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketData: ContactAgentData
  ) {
    const url = this.occEndpointService.buildUrl('createCsTicket', {
      urlParams: {
        userId,
      },
    });
    let params = new HttpParams({});
    if (agentId) {
      params = params.set('agentId', agentId);
    }
    const ticketBody =
      ticketData !== undefined ? this.createCsTicketBody(ticketData, {}) : {};
    return this.http
      .post(url, ticketBody, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected createCsTicketBody(ticketData: ContactAgentData, ticketBody: any) {
    ticketBody = {
      primaryContactEmail: ticketData.email,
      subject: ticketData.subject,
      message: ticketData.message,
      ticketCategory: ticketData.interest,
      supportedResponseType: ticketData.contactType,
    };
    return ticketBody;
  }
}

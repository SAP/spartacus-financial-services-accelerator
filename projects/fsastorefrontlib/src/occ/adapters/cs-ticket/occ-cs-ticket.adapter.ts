import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FSCsTicketAdapter } from '../../../../src/core';
import { ContactAgentData } from '../../occ-models';

@Injectable()
export class OccFsCsTicketAdapter implements FSCsTicketAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketData: ContactAgentData
  ) {
    const url = this.getCreateCsTicketEndpoint(userId);

    let params = new HttpParams({});
    if (agentId) {
      params = params.append('agentId', agentId);
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

  protected getCreateCsTicketEndpoint(userId: string) {
    const createTicketEndpoint = '/users/' + userId + '/csTickets';
    return this.occEndpointService.getBaseEndpoint() + createTicketEndpoint;
  }
}

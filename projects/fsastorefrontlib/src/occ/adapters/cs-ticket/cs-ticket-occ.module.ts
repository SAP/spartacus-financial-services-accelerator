import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { CsTicketAdapter } from '../../../core/cs-ticket/connectors/cs-ticket.adapter';
import { defaultCsTicketConfig } from '../cs-ticket/deafult-occ-cs-ticket-config';
import { OccCsTicketAdapter } from '../cs-ticket/occ-cs-ticket.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CsTicketAdapter,
      useClass: OccCsTicketAdapter,
    },
    provideConfig(defaultCsTicketConfig),
  ],
})
export class CsTicketOccModule {}

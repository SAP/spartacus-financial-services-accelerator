import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultCsTicketConfig } from '../cs-ticket/deafult-occ-cs-ticket-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [provideConfig(defaultCsTicketConfig)],
})
export class FSUserOccModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig, UserAdapter } from '@spartacus/core';
import { defaultCsTicketConfig } from '../cs-ticket/deafult-occ-cs-ticket-config';
import { OccFSUserAdapter } from './occ-user.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: UserAdapter,
      useClass: OccFSUserAdapter,
    },
    provideConfig(defaultCsTicketConfig),
  ],
})
export class FSUserOccModule {}

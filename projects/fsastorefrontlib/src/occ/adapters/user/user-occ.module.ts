import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultCsTicketConfig } from '../cs-ticket/deafult-occ-cs-ticket-config';
import { OccFSUserAdapter } from './occ-user.adapter';
import { UserProfileAdapter } from '@spartacus/user/profile/core';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: UserProfileAdapter,
      useClass: OccFSUserAdapter,
    },
    provideConfig(defaultCsTicketConfig),
  ],
})
export class FSUserOccModule {}

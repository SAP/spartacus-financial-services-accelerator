import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultOccInboxConfig } from './default-occ-inbox-config';
import { InboxAdapter } from '../../../core/inbox/connectors/inbox.adapter';
import { OccInboxAdapter } from '../inbox/occ-inbox.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: InboxAdapter,
      useClass: OccInboxAdapter,
    },
    provideConfig(defaultOccInboxConfig),
  ],
})
export class InboxOccModule {}

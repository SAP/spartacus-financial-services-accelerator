import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { InboxMessageComponent } from '../../cms-lib/account/inbox/inbox-message/inbox-message.component';
import { InboxTabComponent } from '../../cms-lib/account/inbox/inbox-tab/inbox-tab.component';
import { InboxComponent } from '../../cms-lib/account/inbox/inbox.component';
import { OccInboxService } from '../../occ/inbox/inbox.service';
import { InboxDataService } from './services/inbox-data.service';
import { InboxService } from './services/inbox.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    ComponentsModule,
    CmsModule
  ],
  declarations: [InboxComponent, InboxTabComponent, InboxMessageComponent],
  exports: [InboxComponent, InboxTabComponent, InboxMessageComponent],
  entryComponents: [InboxComponent, InboxTabComponent, InboxMessageComponent],
  providers: [InboxService, InboxDataService, OccInboxService]
})
export class InboxModule {}

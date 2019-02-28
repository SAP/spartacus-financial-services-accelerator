import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule, CmsModule } from '@spartacus/storefront';
import { InboxTabComponent } from '../../cms-lib/account/inbox/inbox-tab/inbox-tab.component';
import { InboxComponent } from '../../cms-lib/account/inbox/inbox.component';
import { OccInboxService } from '../../occ/inbox/inbox.service';
import { InboxDataService } from './services/inbox-data.service';
import { InboxService } from './services/inbox.service';

@NgModule({
  imports: [CommonModule, RouterModule, ComponentsModule, CmsModule],
  declarations: [InboxComponent, InboxTabComponent],
  exports: [InboxComponent, InboxTabComponent],
  entryComponents: [InboxComponent, InboxTabComponent],
  providers: [InboxService, InboxDataService, OccInboxService]
})
export class InboxModule {}

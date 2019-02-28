import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { InboxTabComponent } from '../../cms-lib/account/inbox/inbox-tab/inbox-tab.component';
import { InboxComponent } from '../../cms-lib/account/inbox/inbox.component';
import { OccInboxService } from '../../occ/inbox/inbox.service';
import { InboxDataService } from './services/inbox-data.service';
import { InboxService } from './services/inbox.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    CmsModule
  ],
  declarations: [InboxComponent, InboxTabComponent],
  exports: [InboxComponent, InboxTabComponent],
  entryComponents: [InboxComponent, InboxTabComponent],
  providers: [InboxService, InboxDataService, OccInboxService]
})
export class InboxModule {}

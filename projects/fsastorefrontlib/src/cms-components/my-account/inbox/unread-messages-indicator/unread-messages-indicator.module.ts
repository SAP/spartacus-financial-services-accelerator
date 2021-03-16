import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { UnreadMessagesIndicatorComponent } from './unread-messages-indicator.component';

@NgModule({
  imports: [CommonModule, UrlModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnreadMessagesIndicatorComponent: {
          component: UnreadMessagesIndicatorComponent,
        },
      },
    }),
  ],
  declarations: [UnreadMessagesIndicatorComponent],
  exports: [UnreadMessagesIndicatorComponent],
  entryComponents: [UnreadMessagesIndicatorComponent],
})
export class UnreadMessagesIndicatorModule {}

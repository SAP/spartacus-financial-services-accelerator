import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { MessageNotificationComponent } from './message-notification.component';

@NgModule({
  imports: [CommonModule, UrlModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MessageNotificationComponent: {
          component: MessageNotificationComponent,
        },
      },
    }),
  ],
  declarations: [MessageNotificationComponent],
  exports: [MessageNotificationComponent],
})
export class MessageNotificationModule {}

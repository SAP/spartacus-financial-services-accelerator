import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { UserRequestProgressBarComponent } from './user-request-progress-bar/user-request-progress-bar.component';
import { UserRequestSummaryComponent } from './user-request-summary/user-request-summary.component';
import { UserRequestNavigationComponent } from './user-request-navigation/user-request-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserRequestProgressBarFlex: {
          component: UserRequestProgressBarComponent,
        },
        UserRequestSummaryFlex: {
          component: UserRequestSummaryComponent,
        },
        UserRequestNavigationFlex: {
          component: UserRequestNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
  exports: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
  entryComponents: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
})
export class UserRequestModule {}

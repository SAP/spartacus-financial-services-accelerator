import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  CmsModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { AssetsTableModule } from '../assets-table/assets-table.module';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard, AuthGuard],
    data: {
      cxRoute: 'userProfile',
      pageLabel: 'user-profile',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    AssetsTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UserProfileFlex: {
          component: UserProfileComponent,
        },
      },
    }),
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}

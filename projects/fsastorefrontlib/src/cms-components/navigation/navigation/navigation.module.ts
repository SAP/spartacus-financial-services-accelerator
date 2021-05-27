import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { GenericLinkModule, IconModule } from '@spartacus/storefront';
import { FSNavigationUIComponent } from './navigation-ui.component';
import { FSNavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    IconModule,
    GenericLinkModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NavigationComponent: {
          component: FSNavigationComponent,
        },
      },
    }),
  ],
  declarations: [FSNavigationComponent, FSNavigationUIComponent],
  entryComponents: [FSNavigationComponent],
  exports: [FSNavigationComponent, FSNavigationUIComponent],
})
export class NavigationModule {}

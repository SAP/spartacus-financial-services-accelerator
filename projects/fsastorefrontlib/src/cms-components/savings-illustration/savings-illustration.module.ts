import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  ListNavigationModule,
  PageLayoutComponent,
  PaginationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { NgxEchartsModule } from 'ngx-echarts';
import { AccordionModule } from '../../shared';
import { SavingsIllustrationComponent } from './components/savings-illustration/savings-illustration.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'savingsIllustration',
      pageLabel: 'savings-illustration',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  declarations: [SavingsIllustrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    UrlModule,
    I18nModule,
    NgbNavModule,
    AccordionModule,
    PaginationModule,
    ListNavigationModule,
    SpinnerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SavingsIllustrationFlex: {
          component: SavingsIllustrationComponent,
        },
      },
    }),
  ],
  exports: [SavingsIllustrationComponent],
})
export class SavingsIllustrationModule {}

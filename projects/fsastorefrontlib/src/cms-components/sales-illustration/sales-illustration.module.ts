import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  ProductService,
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
import { SalesIllustrationMainComponent } from './components/sales-illustration-main/sales-illustration-main.component';
import { ChartService } from './services/chart.service';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'salesIllustration',
      pageLabel: 'sales-illustration',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  declarations: [SalesIllustrationMainComponent],
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
        SalesIllustrationFlex: {
          component: () =>
            import(
              './components/sales-illustration-main/sales-illustration-main.component'
            ).then(m => m.SalesIllustrationMainComponent),
        },
      },
    }),
  ],
  exports: [SalesIllustrationMainComponent],
  providers: [ProductService, ChartService],
})
export class SalesIllustrationModule {}

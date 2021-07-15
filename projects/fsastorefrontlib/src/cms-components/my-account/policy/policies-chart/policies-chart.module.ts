import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import {
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';

import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { PoliciesChartComponent } from '../policies-chart/policies-chart.component';
import { defaultChartOptionsConfig } from '../../../../core/chart-config/default-chart-options-config';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    NgSelectModule,
    AccordionModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    ConfigModule.withConfig(defaultChartOptionsConfig),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyPoliciesChartFlex: {
          component: PoliciesChartComponent,
        },
      },
    }),
  ],
  declarations: [PoliciesChartComponent],
})
export class PoliciesChartModule {}

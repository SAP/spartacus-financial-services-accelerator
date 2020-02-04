import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { ChangeSimulationComponent } from './change-simulation/change-simulation.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ChangeCoverageFlex: {
          component: ChangeCoverageComponent,
        },
        ChangeSimulationFlex: {
          component: ChangeSimulationComponent,
        },
      },
    }),
  ],
  declarations: [ChangeCoverageComponent, ChangeSimulationComponent],
  exports: [ChangeCoverageComponent, ChangeSimulationComponent],
  entryComponents: [ChangeCoverageComponent, ChangeSimulationComponent],
})
export class ChangeProcessModule {}

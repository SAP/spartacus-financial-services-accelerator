import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { YformComponent } from './yform.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        YFormCMSComponent: {
          component: YformComponent,
        },
      },
    }),
    I18nModule,
  ],
  declarations: [YformComponent],
  entryComponents: [YformComponent],
  exports: [YformComponent],
})
export class YFormModule { }
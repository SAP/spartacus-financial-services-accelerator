import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { errorHandlers } from './http-interceptors/index';
import { defaultFSGlobalMessageConfigFactory } from './config/default-global-message-config';
import { provideDefaultConfigFactory } from '@spartacus/core';
// TODO: Fix imports once the files are officially exported
import {
  ɵdz as GlobalMessageStoreModule,
  ɵee as GlobalMessageEffect,
} from '@spartacus/core';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffect]),
  ],
  providers: [provideDefaultConfigFactory(defaultFSGlobalMessageConfigFactory)],
})
export class FSGlobalMessageModule {
  static forRoot(): ModuleWithProviders<FSGlobalMessageModule> {
    return {
      ngModule: FSGlobalMessageModule,
      providers: [...errorHandlers],
    };
  }
}

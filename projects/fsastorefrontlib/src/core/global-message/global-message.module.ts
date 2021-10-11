import { ModuleWithProviders, NgModule } from '@angular/core';
import { errorHandlers } from './http-interceptors/index';
import { defaultFSGlobalMessageConfigFactory } from './config/default-global-message-config';
import { GlobalMessageModule, provideDefaultConfigFactory } from '@spartacus/core';

@NgModule({
  imports: [
    GlobalMessageModule,
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

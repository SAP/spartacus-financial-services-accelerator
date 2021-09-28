import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { errorHandlers } from './http-interceptors/index';
import { defaultFSGlobalMessageConfigFactory } from './config/default-global-message-config';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { GlobalMessageStoreModule } from '@spartacus/core/src/global-message/store/global-message-store.module';
import { GlobalMessageEffect } from '@spartacus/core/src/global-message/store/effects/global-message.effect';

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

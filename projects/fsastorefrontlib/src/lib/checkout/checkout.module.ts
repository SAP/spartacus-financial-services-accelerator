import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './assets/store/effects';
import {AddOptionsModule} from './assets/add-options.module';

@NgModule({
  imports: [
    AddOptionsModule,
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  exports: [AddOptionsModule],
  providers: []
})
export class CheckoutModule {
}

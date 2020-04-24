import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { PolicyAdapter } from '../../../core/my-account/connectors';
import { OccPolicyAdapter } from './occ-policy.adapter';
import { defaultOccPolicyConfig } from './default-occ-policy-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: PolicyAdapter,
      useClass: OccPolicyAdapter,
    },
    provideConfig(defaultOccPolicyConfig),
  ],
})
export class PolicyOccModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, OccConfig } from '@spartacus/core';
import { OccClaimService } from './claim/claim.service';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccClaimService,
    { provide: OccConfig, useExisting: Config }
  ]
})
export class OccModule {}

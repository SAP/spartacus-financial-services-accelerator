import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { PricingService } from '../../services/pricing/pricing.service';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormComponent } from './form.component';
import { OccYFormService } from 'projects/fsastorefrontlib/src/lib/occ/yform/yform.service';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    DynamicFormModule,
    NgbTooltipModule,
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
  providers: [PricingService, OccYFormService],
})
export class FSFormsModule {}

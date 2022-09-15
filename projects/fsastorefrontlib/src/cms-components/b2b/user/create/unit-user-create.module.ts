import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UnitUserCreateModule } from '@spartacus/organization/administration/components';
import { FSUserFormModule } from '../form/user-form.module';
import { FSUnitUserCreateComponent } from './unit-user-create.component';

@NgModule({
  imports: [CommonModule, UnitUserCreateModule, FSUserFormModule],
  declarations: [FSUnitUserCreateComponent],
  exports: [FSUnitUserCreateComponent],
})
export class FSUnitUserCreateModule {}

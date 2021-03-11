import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitDetailsComponent } from '@spartacus/organization/administration/components';

@Component({
  selector: 'cx-fs-org-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSUnitDetailsComponent extends UnitDetailsComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSNavigationComponent extends NavigationComponent {}

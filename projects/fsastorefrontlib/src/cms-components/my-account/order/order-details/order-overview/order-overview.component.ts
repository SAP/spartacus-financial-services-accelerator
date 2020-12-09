import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { OrderOverviewComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-overview',
  templateUrl: './order-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSOrderOverviewComponent extends OrderOverviewComponent {
  constructor(protected translation: TranslationService) {
    super(translation);
  }
}

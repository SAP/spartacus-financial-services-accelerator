import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  cart$: Observable<Cart>;
  isCartStable$: Observable<boolean>;

  constructor(
    protected cartService: FSCartService,
    protected translationService: FSTranslationService
  ) {
    this.cart$ = this.cartService.getActive();
    this.isCartStable$ = this.cartService.isStable();
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['miniCart', translationGroup],
      translationKey
    );
  }

  sortValues(valueList) {
    return valueList.sort(
      (value1, value2) =>
        0 - (value1.key.toUpperCase() > value2.key.toUpperCase() ? -1 : 1)
    );
  }
}

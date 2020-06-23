import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FSTranslationService } from '../../../../../core/i18n/facade/translation.service';

@Component({
  selector: 'cx-fs-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent {
  constructor(protected translationService: FSTranslationService) {}

  @Input()
  referencedComponent: string;
  @Input()
  valueItems: Map<string, string>;
  @Input()
  translationChunk: string;

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      [this.referencedComponent, translationGroup],
      translationKey
    );
  }
}

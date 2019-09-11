import { Component } from '@angular/core';
import { CartDataService } from '@spartacus/core';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fs-cart.service';

@Component({
  selector: 'fsa-select-identification',
  templateUrl: './select-identification.component.html'
})
export class SelectIdentificationComponent {
  constructor(
    protected occCartService: OccFSCartService,
    protected fsCartData: CartDataService,
  ) { }

  selected = '';
  choices: Array<any> = [
    {
      name: 'nearest_branch',
      icon: 'icon-FSA-person'
    },
    {
      name: 'legal_identification',
      icon: 'icon-FSA-payment-cards'
    },
    {
      name: 'video_identification',
      icon: 'icon-FSA-shield'
    }
  ];
  setSelected(choise) {
    this.selected = choise;
  }

  setIdentificationType() {
    this.occCartService.setIdentificationType(this.selected, this.fsCartData.cartId, this.fsCartData.userId);
  }
}

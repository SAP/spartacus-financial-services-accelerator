import { Component } from '@angular/core';
import { CartDataService } from '@spartacus/core';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fs-cart.service';

@Component({
  selector: 'fsa-select-identification',
  templateUrl: './select-identification.component.html'
})
export class SelectIdentificationTypeComponent {
  constructor(
    protected occCartService: OccFSCartService,
    protected fsCartData: CartDataService,
  ) { }

  selected: string;
  identificationTypes: Array<any> = [
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
  setSelectedType(identificationType) {
    this.selected = identificationType.name;
  }
  setIdentificationType() {
    this.occCartService.setIdentificationType(this.selected, this.fsCartData.cartId, this.fsCartData.userId).subscribe(
      // ROUTING SHOULD BE DEFINED HERE
    );
  }
}

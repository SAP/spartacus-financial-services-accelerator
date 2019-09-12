import { Component, OnInit } from '@angular/core';
import { CartDataService, RoutingService } from '@spartacus/core';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fs-cart.service';
import { ActivatedRoute } from '@angular/router';
import { FSCheckoutConfigService } from '../../../services';

@Component({
  selector: 'fsa-select-identification',
  templateUrl: './select-identification.component.html'
})
export class SelectIdentificationComponent implements OnInit {

  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    private activatedRoute: ActivatedRoute,
    private checkoutConfigService: FSCheckoutConfigService,
    protected occCartService: OccFSCartService,
    protected fsCartData: CartDataService,
  ) { }

  selected: string;
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

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
  }

  setSelected(choise) {
    this.selected = choise.name;
  }

  setIdentificationType() {
    this.occCartService.setIdentificationType(this.selected, this.fsCartData.cartId, this.fsCartData.userId).subscribe();
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }
}

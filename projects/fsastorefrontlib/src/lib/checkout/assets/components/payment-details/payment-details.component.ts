import { Component, Output, EventEmitter } from '@angular/core';
import { UserService, CartDataService } from '@spartacus/core';
import { ɵv  as PaymentMethodComponent } from '@spartacus/storefront';

@Component({
  selector: 'fsa-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent extends PaymentMethodComponent {

  @Output()
  nextStep = new EventEmitter<any>();

constructor(
    protected cartData: CartDataService,
    protected userService: UserService
  ) {
    super(cartData, userService);
  }
  next() {
    this.nextStep.emit();
  }
}

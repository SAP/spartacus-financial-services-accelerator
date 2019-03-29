import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService, GlobalMessageService, UserService } from '@spartacus/core';
import { PaymentFormComponent } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-payment-form',
  templateUrl: './fs-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSPaymentFormComponent extends PaymentFormComponent {

constructor(
  protected checkoutService: CheckoutService,
  protected userService: UserService,
  protected globalMessageService: GlobalMessageService,
  private formBuilder: FormBuilder,
  private ngbModalService: NgbModal
  ) {
    super(checkoutService, userService, globalMessageService, formBuilder, ngbModalService);
  }

  showSameAsShippingAddressCheckbox(): Observable<boolean> {
    return combineLatest(this.countries$, this.shippingAddress$).pipe(
      map(([countries, address]) => {
        return false;
      })
    );
  }
}

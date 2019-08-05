import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CheckoutProgressComponent } from "@spartacus/storefront";
import { FSCheckoutStep } from "./fs-checkout-step.component";

@Component({
  selector: 'fs-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent {
  steps: Array<FSCheckoutStep>;
}
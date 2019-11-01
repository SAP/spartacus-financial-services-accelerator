import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderEntry, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FSCartService } from '../../../../core/checkout/services';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';

@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOptionsComponent implements OnInit {
  constructor(
    protected cartService: FSCartService,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  entries$: Observable<OrderEntry[]>;
  checkoutStepUrlNext: string;

  @Output()
  nextStep = new EventEmitter<any>();

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
  }

  addProductToCart(orderEntryCode: string, entryNumber: string) {
    if (!orderEntryCode) {
      return;
    }
    this.cartService.addOptionalProduct(orderEntryCode, 1, entryNumber);
  }

  removeProductFromCart(item): void {
    if (!item) {
      return;
    }
    this.cartService.removeEntry(item);
  }

  next() {
    this.routingService.go(this.checkoutStepUrlNext);
  }
}

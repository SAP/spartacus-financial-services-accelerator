import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  BindingStateType,
  FSCart,
} from './../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent {
  cartCode: string;
  nextStepUrl: string;
  subscription = new Subscription();

  @Output()
  quoteBinding$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected quoteService: QuoteService,
    protected routingService: RoutingService,
    protected cartService: FSCartService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    this.quoteBinding$.emit(true);
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          filter(
            cart =>
              (<FSCart>cart).insuranceQuote.state.code === BindingStateType.BIND
          ),
          tap(() => {
            this.routingService.go(this.nextStepUrl);
            this.subscription.unsubscribe();
          })
        )
        .subscribe()
    );
  }
}

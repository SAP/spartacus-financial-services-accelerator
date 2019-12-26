import {
  FSCart,
  BindingStateType,
} from './../../../../occ/occ-models/occ.models';
import { QuoteService } from './../../../../core/my-account/services/quote.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { RoutingService, CartService } from '@spartacus/core';

@Component({
  selector: 'fsa-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent {
  cartCode: string;
  nextStepUrl: string;

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected quoteService: QuoteService,
    protected routingService: RoutingService,
    protected cartService: CartService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    this.cartService.getActive().subscribe(cart => {
      const bindingState = (<FSCart>cart).insuranceQuote.state.code;
      if (bindingState === BindingStateType.BIND) {
        this.routingService.go(this.nextStepUrl);
      }
    });
  }
}

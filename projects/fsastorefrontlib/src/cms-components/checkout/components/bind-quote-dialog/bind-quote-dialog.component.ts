import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';

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
  ) { }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    this.quoteBinding$.emit(false);
  }
}

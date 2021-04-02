import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormDataStorageService } from '@spartacus/dynamicforms';
import { ModalService } from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent {
  cartCode: string;
  subscription = new Subscription();

  @Output()
  quoteBinding$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected quoteService: QuoteService,
    protected cartService: FSCartService,
    protected formDataStoragetService: FormDataStorageService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    localStorage.setItem('bindingState', JSON.stringify(true));
    combineLatest([this.cartService.getActive(), this.cartService.isStable()])
      .pipe(
        filter(([_, stable]) => stable),
        take(1),
        map(([cart, _]) => {
          const personalDetailsFormId = (<FSCart>cart)?.entries?.[0]
            .formData?.[0]?.id;
          this.formDataStoragetService.clearFormDataIdFromLocalStorage(
            personalDetailsFormId
          );

          const chooseCoverFormId = <any>(
            (<FSCart>cart).insuranceQuote?.quoteDetails?.formId
          );
          this.formDataStoragetService.clearFormDataIdFromLocalStorage(
            chooseCoverFormId
          );
        })
      )
      .subscribe();
    this.quoteBinding$.emit(false);
  }
}

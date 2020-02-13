import { FSCartService } from './../../../../../core/cart/facade/fs-cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CmsConfig } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-legal-documents',
  templateUrl: './legal-documents.component.html',
})
export class LegalDocumentsComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    protected cartService: FSCartService,
    protected config: CmsConfig
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}

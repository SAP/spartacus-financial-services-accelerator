import { Component, OnInit } from '@angular/core';
import { Cart, OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-legal-documents',
  templateUrl: './legal-documents.component.html',
})
export class LegalDocumentsComponent implements OnInit {
  cart$: Observable<Cart>;
  baseUrl: string;

  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }
}

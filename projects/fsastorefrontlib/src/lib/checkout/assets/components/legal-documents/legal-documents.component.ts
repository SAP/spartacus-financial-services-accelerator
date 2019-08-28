import { Component, OnInit } from '@angular/core';
import { Cart, CartService, CmsConfig, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-legal-documents',
  templateUrl: './legal-documents.component.html'
})
export class FsaLegalDocumentsComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    protected config: CmsConfig,
    protected occEndPointService: OccEndpointsService
  ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}

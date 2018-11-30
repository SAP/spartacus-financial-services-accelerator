import { Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of, Observable } from 'rxjs';

import { CartService } from '../../../cart/facade';

import { CartPageLayoutComponent } from './cart-page-layout.component';

class MockCartService {
  activeCart$: Observable<any>;
  cartMergeComplete$: Observable<boolean>;
  removeCartEntry() {}
  loadCartDetails() {}
}

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Component({
  selector: 'cx-cart-details',
  template: ''
})
export class MockCartDetailsComponent {}

describe('CartPageLayoutComponent', () => {
  let component: CartPageLayoutComponent;
  let fixture: ComponentFixture<CartPageLayoutComponent>;
  let service: MockCartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CartPageLayoutComponent,
        MockCartDetailsComponent,
        MockDynamicSlotComponent
      ],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    service.cartMergeComplete$ = of(true);
    spyOn(service, 'loadCartDetails').and.stub();
    service.activeCart$ = of('mockCart');

    component.ngOnInit();

    expect(service.loadCartDetails).toHaveBeenCalled();
    let result;
    component.cart$
      .subscribe(cart => {
        result = cart;
      })
      .unsubscribe();
    expect(result).toBe('mockCart');
  });
});

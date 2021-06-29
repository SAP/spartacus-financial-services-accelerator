import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  I18nTestingModule,
  OccConfig,
  RoutingService,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { QuotesComponent } from './quotes.component';
import { Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  loadQuotes = createSpy();
  getQuotes = createSpy();
  getLoaded = createSpy();
  retrieveQuoteCheckout = createSpy();
  getQuotesLoaded = createSpy();
}

const MockOccConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of({ code: 'cartCode' });
  }
}

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let quoteService: QuoteService;
  let routingService: RoutingService;
  let cartService: ActiveCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [QuotesComponent],
        providers: [
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: OccConfig,
            useValue: MockOccConfig,
          },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
        ],
      }).compileComponents();
      cartService = TestBed.inject(ActiveCartService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.inject(QuoteService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get base url', () => {
    expect(component.baseUrl).toEqual('');
  });
  it('should not retrieve quote', () => {
    component.retrieveQuote({});
    expect(routingService.go).not.toHaveBeenCalled();
  });
  it('should retrieve quote', () => {
    const quote = { state: { code: 'BIND' }, cartCode: 'cartCode' };
    component.retrieveQuote(quote);
    expect(quoteService.retrieveQuoteCheckout).toHaveBeenCalled();
  });
});

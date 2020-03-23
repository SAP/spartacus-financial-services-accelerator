import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';
import { QuotesComponent } from './quotes.component';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { InsuranceQuote } from './../../../../occ/occ-models/occ.models';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

class MockQuoteService {
  loadQuotes = createSpy();
  getQuotes = createSpy();
  getLoaded = createSpy();
  retrieveQuote = createSpy();
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

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let quoteService: MockQuoteService;
  let routingService: MockRoutingService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    quoteService = TestBed.get(QuoteService as Type<QuoteService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get base url', () => {
    expect(component.getBaseUrl()).toEqual('');
  });
  it('should not retrieve quote', () => {
    component.retrieveQuote({});
    expect(routingService.go).not.toHaveBeenCalled();
  });
  it('should retrieve quote and route to the quote review', () => {
    const quote: InsuranceQuote = { state: { code: 'BIND' } };
    component.retrieveQuote(quote);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quoteReview' });
  });
  it('should retrieve quote and route to add options', () => {
    const quote: InsuranceQuote = { state: { code: 'OTHER' } };
    component.retrieveQuote(quote);
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'addOptions' });
  });
});

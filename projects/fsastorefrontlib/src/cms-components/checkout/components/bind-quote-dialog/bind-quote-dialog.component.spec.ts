import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './bind-quote-dialog.component';
import createSpy = jasmine.createSpy;

const mockCart: FSCart = {
  code: 'test001',
  insuranceQuote: {
    quoteId: 'testQuote001',
    state: {
      code: 'UNBIND',
    },
  },
};

class MockQuoteService {
  bindQuote(cartCode: string): void {}
}

class MockModalService {
  dismissActiveModal(): void {}
}

describe('BindQuoteDialogComponent', () => {
  let component: BindQuoteDialogComponent;
  let fixture: ComponentFixture<BindQuoteDialogComponent>;
  let el: DebugElement;
  let modalService: MockModalService;
  let quoteService: MockQuoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [BindQuoteDialogComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: QuoteService,
          useClass: MockQuoteService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindQuoteDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    quoteService = TestBed.inject(QuoteService);
    modalService = TestBed.inject(ModalService);

    spyOn(quoteService, 'bindQuote').and.callThrough();
    spyOn(modalService, 'dismissActiveModal').and.callThrough();
  });

  it('should create popup', () => {
    expect(component).toBeTruthy();
  });

  it('should show quote binding components', () => {
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.popup-content-wrapper'))
      .nativeElement;
    expect(dialogTitleEl.textContent).toContain('quote.bindingConfirmation');
    expect(dialogTitleEl.textContent).toContain('quote.confirmInformation');
  });
});

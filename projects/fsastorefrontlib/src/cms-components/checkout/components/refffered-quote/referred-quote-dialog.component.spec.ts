import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { ReferredQuoteDialogComponent } from './referred-quote-dialog.component';
import createSpy = jasmine.createSpy;

const mockCart: FSCart = {
  code: 'test001',
  insuranceQuote: {
    quoteId: 'testQuote001',
    state: {
      code: 'BIND',
    },
    quoteWorkflowStatus: {
      code: 'REFERRED',
    },
  },
};

class MockModalService {
  dismissActiveModal(): void {}
}

describe('ReferredQuoteDialogComponent', () => {
  let component: ReferredQuoteDialogComponent;
  let fixture: ComponentFixture<ReferredQuoteDialogComponent>;
  let el: DebugElement;
  let modalService: MockModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ReferredQuoteDialogComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredQuoteDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    modalService = TestBed.inject(ModalService);

    spyOn(modalService, 'dismissActiveModal').and.callThrough();
  });

  it('should create popup', () => {
    expect(component).toBeTruthy();
  });

  it('should show referred quote popup content', () => {
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.popup-content-wrapper'))
      .nativeElement;
    expect(dialogTitleEl.textContent).toContain(
      'quote.referredQuoteDescription'
    );
  });
});

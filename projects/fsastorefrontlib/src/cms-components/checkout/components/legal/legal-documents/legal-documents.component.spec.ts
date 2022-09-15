import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { I18nTestingModule, OccConfig } from '@spartacus/core';
import { FSCart, FSProduct } from '../../../../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../../../../core/cart/facade/cart.service';
import { LegalDocumentsComponent } from './legal-documents.component';

const mockProduct: FSProduct = {
  defaultCategory: {
    code: 'insurances_auto',
  },
  configurable: false,
};

const mockCart: FSCart = {
  deliveryOrderGroups: [
    {
      quantity: 1,
    },
  ],
  entries: [
    {
      product: mockProduct,
    },
  ],
};

class MockCartService {
  isStable() {
    return of(true);
  }
  getActive(): Observable<FSCart> {
    return of(mockCart);
  }
}

const testBaseUrl = '';

const mockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: testBaseUrl,
      prefix: '',
    },
  },
};

describe('LegalDocumentsComponent', () => {
  let component: LegalDocumentsComponent;
  let fixture: ComponentFixture<LegalDocumentsComponent>;
  let cartService: FSCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FormsModule],
        declarations: [LegalDocumentsComponent],
        providers: [
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          { provide: OccConfig, useValue: mockOccModuleConfig },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartService = TestBed.inject(FSCartService);
    spyOn(cartService, 'isStable').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return base Url from config', () => {
    component.ngOnInit();
    expect(component.baseUrl).toEqual(testBaseUrl);
  });
});

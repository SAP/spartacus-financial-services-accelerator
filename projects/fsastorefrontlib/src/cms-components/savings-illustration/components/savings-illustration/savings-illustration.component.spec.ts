import { QueryList } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslationService } from '@spartacus/core';
import { of } from 'rxjs';
import { FormDataService } from '../../../../../../dynamicforms/src/core/services/data/form-data.service';
import { FormDataStorageService } from '../../../../../../dynamicforms/src/core/services/storage/form-data-storage.service';
import {
  FSCartService,
  FSProductService,
  PricingService,
} from '../../../../core';
import { SavingsIllustrationComponent } from './savings-illustration.component';

describe('SavingsIllustrationComponent', () => {
  let component: SavingsIllustrationComponent;
  let fixture: ComponentFixture<SavingsIllustrationComponent>;

  let FSProductServiceSpy: jasmine.SpyObj<FSProductService>;
  let formDataStorageServiceSpy: jasmine.SpyObj<FormDataStorageService>;
  let formDataServiceSpy: jasmine.SpyObj<FormDataService>;
  let pricingServiceSpy: jasmine.SpyObj<PricingService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let FSCartServiceSpy: jasmine.SpyObj<FSCartService>;

  beforeEach(
    waitForAsync(() => {
      const FSProductSpy = jasmine.createSpyObj([
        'get',
        'getCalculatedProductData',
      ]);
      const formDataStorageSpy = jasmine.createSpyObj([
        'getFormDataIdByCategory',
      ]);
      const formDataSpy = jasmine.createSpyObj(['getFormData', 'loadFormData']);
      const pricingSpy = jasmine.createSpyObj(['buildPricingData']);
      const translationSpy = jasmine.createSpyObj(['translate']);
      const FSCartSpy = jasmine.createSpyObj(['createCartForProduct']);

      TestBed.configureTestingModule({
        declarations: [SavingsIllustrationComponent],
        providers: [
          { provide: FSProductService, useValue: FSProductSpy },
          {
            provide: FormDataStorageService,
            useValue: formDataStorageSpy,
          },
          { provide: FormDataService, useValue: formDataSpy },
          { provide: PricingService, useValue: pricingSpy },
          { provide: TranslationService, useValue: translationSpy },
          { provide: FSCartService, useValue: FSCartSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              params: {
                savingsProductCode: 'test',
              },
            },
          },
          provideMockStore({}),
        ],
        imports: [RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsIllustrationComponent);
    component = fixture.componentInstance;

    FSProductServiceSpy = TestBed.inject(FSProductService) as jasmine.SpyObj<
      FSProductService
    >;
    formDataStorageServiceSpy = TestBed.inject(
      FormDataStorageService
    ) as jasmine.SpyObj<FormDataStorageService>;
    formDataServiceSpy = TestBed.inject(FormDataService) as jasmine.SpyObj<
      FormDataService
    >;
    pricingServiceSpy = TestBed.inject(PricingService) as jasmine.SpyObj<
      PricingService
    >;
    translationServiceSpy = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
    FSCartServiceSpy = TestBed.inject(FSCartService) as jasmine.SpyObj<
      FSCartService
    >;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit called', () => {
    spyOn(component, 'ngAfterViewInit').and.callThrough();
    component.tabNavigation = new QueryList<NgbNav>();
    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
  });

  it('onPageChange called', () => {
    spyOn(component, 'onPageChange').and.callThrough();
    component.onPageChange(1);
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('createCartAndStartBundleForProduct', () => {
    spyOn(component, 'createCartAndStartBundleForProduct').and.callThrough();
    component.pricingData$ = of({ priceAttributeGroups: [] });
    component.createCartAndStartBundleForProduct('test', 'test');
    expect(component.createCartAndStartBundleForProduct).toHaveBeenCalled();
  });
});

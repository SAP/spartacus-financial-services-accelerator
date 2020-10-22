import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsComponent, Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSProductService } from '../../../core/product-pricing/facade/product.service';
import { CmsProductFeatureComponent } from '../../../occ/occ-models';
import { ProductFeatureComponent } from './product-feature.component';

const mockedProduct: Product = {
  summary: 'Product Summary',
};

class MockProductService {
  get(): Observable<Product> {
    return of(mockedProduct);
  }
}

describe('ProductFeatureComponent', () => {
  let productFeatureComponent: ProductFeatureComponent;
  let mockProductService: MockProductService;
  let fixture: ComponentFixture<ProductFeatureComponent>;
  let el: DebugElement;

  const componentData: CmsProductFeatureComponent = {
    uid: 'ProductFeatureComponent',
    typeCode: 'CMSProductFeatureComponent',
    title: 'Product Feature Component',
    description: 'Component used to describe product features',
    product: 'testProduct',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(
    waitForAsync(() => {
      mockProductService = new MockProductService();
      TestBed.configureTestingModule({
        imports: [],
        declarations: [ProductFeatureComponent],
        providers: [
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: FSProductService,
            useValue: mockProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureComponent);
    productFeatureComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create product feature component', () => {
    expect(productFeatureComponent).toBeTruthy();
  });

  it('should display product summary', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.item-details'))).toBeTruthy();
  });
});

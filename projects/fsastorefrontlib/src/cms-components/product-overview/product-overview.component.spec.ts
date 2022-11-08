import { TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ProductOverviewComponent } from './product-overview.component';

describe('ProductOverviewComponent', () => {
  let component: ProductOverviewComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [ProductOverviewComponent],
      });
    })
  );

  beforeEach(() => {
    component = TestBed.inject(ProductOverviewComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call emitSelectedProducts', () => {
    spyOn(
      ProductOverviewComponent.prototype,
      'emitSelectedProducts'
    ).and.callThrough();

    component.emitSelectedProducts({ text: 'insurances' });
    expect(component.emitSelectedProducts).toHaveBeenCalled();
  });
});

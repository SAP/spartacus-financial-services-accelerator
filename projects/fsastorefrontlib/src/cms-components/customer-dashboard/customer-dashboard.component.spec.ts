import { TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { AssetTableType } from '../../occ';
import { CustomerDashboardComponent } from './customer-dashboard.component';

describe('CustomerDashboardComponent', () => {
  let component: CustomerDashboardComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [CustomerDashboardComponent],
      });
    })
  );

  beforeEach(() => {
    component = TestBed.inject(CustomerDashboardComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call showAssetList', () => {
    spyOn(
      CustomerDashboardComponent.prototype,
      'showAssetList'
    ).and.callThrough();

    component.showAssetList([{ id: 1 }], AssetTableType.CLAIMS);
    expect(component.showAssetList).toHaveBeenCalled();
  });
});

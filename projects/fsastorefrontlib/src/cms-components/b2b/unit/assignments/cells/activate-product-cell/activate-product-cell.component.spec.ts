import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of, Subscription } from 'rxjs';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';
import { ActivateProductCellComponent } from './activate-product-cell.component';

const mockModel = {
  active: false,
  added: true,
  assignmentCode: '00004084',
};
const mockUnit = 'TestCompany';
class MockCurrentUnitService {
  b2bUnit$ = of(mockUnit);
}

class MockProductAssignmentService {
  changeActiveStatus() {}
}

class MockSubscription {
  unsubscribe() {}

  add() {}
}

describe('ActivateProductCellComponent', () => {
  let component: ActivateProductCellComponent;
  let fixture: ComponentFixture<ActivateProductCellComponent>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ActivateProductCellComponent],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: mockModel,
          },
        },
        {
          provide: CurrentUnitService,
          useClass: MockCurrentUnitService,
        },
        {
          provide: ProductAssignmentService,
          useClass: MockProductAssignmentService,
        },
        { provide: Subscription, useValue: MockSubscription },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    currentUnitService = TestBed.inject(CurrentUnitService);
    spyOn(productAssignmentService, 'changeActiveStatus').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate product cell', () => {
    component.changeActiveStatus(mockUnit);
    expect(productAssignmentService.changeActiveStatus).toHaveBeenCalledWith(
      mockUnit,
      mockModel.assignmentCode,
      !mockModel.active
    );
  });
  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});

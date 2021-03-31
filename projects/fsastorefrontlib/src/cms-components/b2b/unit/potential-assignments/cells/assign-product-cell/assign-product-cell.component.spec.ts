import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

import { AssignProductCellComponent } from './assign-product-cell.component';

const mockModel = {
  active: false,
  added: true,
  code: '00004084',
};
const mockUnit = 'TestCompany';
class MockCurrentUnitService {
  b2bUnit$ = of(mockUnit);
}

class MockProductAssignmentService {
  createProductAssignment() {}
}

describe('AssignProductCellComponent', () => {
  let component: AssignProductCellComponent;
  let fixture: ComponentFixture<AssignProductCellComponent>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AssignProductCellComponent],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    currentUnitService = TestBed.inject(CurrentUnitService);
    spyOn(
      productAssignmentService,
      'createProductAssignment'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign product cell', () => {
    component.addProduct();
    expect(
      productAssignmentService.createProductAssignment
    ).toHaveBeenCalledWith(mockUnit, mockModel.code);
  });
});

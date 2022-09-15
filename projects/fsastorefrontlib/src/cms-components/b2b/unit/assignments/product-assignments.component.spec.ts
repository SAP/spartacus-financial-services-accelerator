import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { ProductAssignmentsListService } from './product-assignments-list.service';

import { ProductAssignmentsComponent } from './product-assignments.component';

class MockProductAssignmentsListService {}

const mockItem: B2BUnit = {
  name: 'Test Company',
  uid: 'TestCompany',
};

class MockCurrentUnitService {
  item$ = of(mockItem);
}

class MockProductAssignmentService {
  loadProductAssignmentsForUnit() {}
  isUserAdminOfUnit() {
    return of(false);
  }
}

describe('ProductAssignmentsComponent', () => {
  let component: ProductAssignmentsComponent;
  let fixture: ComponentFixture<ProductAssignmentsComponent>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAssignmentsComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ProductAssignmentsListService,
          useClass: MockProductAssignmentsListService,
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
    fixture = TestBed.createComponent(ProductAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    currentUnitService = TestBed.inject(CurrentUnitService);
    spyOn(
      productAssignmentService,
      'loadProductAssignmentsForUnit'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Product Assignments For Unit', () => {
    component.ngOnInit();
    expect(
      productAssignmentService.loadProductAssignmentsForUnit
    ).toHaveBeenCalledWith(mockItem.uid);
  });

  it('should check if provided unit is default organization of user', () => {
    component
      .isUnitDefaultOrganizationOfUser('childUnitId')
      .subscribe(result => {
        expect(result).toEqual(true);
      })
      .unsubscribe();
  });
});

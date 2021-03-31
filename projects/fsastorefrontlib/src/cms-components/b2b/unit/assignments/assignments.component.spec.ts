import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { AssignmentsListService } from './assignments-list.service';

import { AssignmentsComponent } from './assignments.component';

class MockAssignmentsListService {}

const mockItem: B2BUnit = {
  name: 'Test Company',
  uid: 'TestCompany',
};

class MockCurrentUnitService {
  item$ = of(mockItem);
}

class MockProductAssignmentService {
  loadProductAssignmentsForUnit() {}
}

describe('AssignmentsComponent', () => {
  let component: AssignmentsComponent;
  let fixture: ComponentFixture<AssignmentsComponent>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentsComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: AssignmentsListService,
          useClass: MockAssignmentsListService,
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
    fixture = TestBed.createComponent(AssignmentsComponent);
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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { PotentialAssingmensListService } from './potential-assignments-list.service';

import { PotentialAssignmentsComponent } from './potential-assignments.component';

class MockAssignmentsListService {}

const mockItem: B2BUnit = {
  uid: 'Test Company',
};

class MockCurrentUnitService {
  item$ = of(mockItem);
}

class MockProductAssignmentService {
  loadPotentialProductAssignments() {}
}

describe('PotentialAssignmentsComponent', () => {
  let component: PotentialAssignmentsComponent;
  let fixture: ComponentFixture<PotentialAssignmentsComponent>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialAssignmentsComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: PotentialAssingmensListService,
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
    fixture = TestBed.createComponent(PotentialAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    currentUnitService = TestBed.inject(CurrentUnitService);
    spyOn(
      productAssignmentService,
      'loadPotentialProductAssignments'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load Product Assignments For Parent Unit', () => {
    mockItem.parentOrgUnit = {
      active: true,
      name: 'Test Parent Unit',
      uid: 'TestParentUnit',
    };
    component.ngOnInit();
    expect(
      productAssignmentService.loadPotentialProductAssignments
    ).toHaveBeenCalledWith(mockItem.parentOrgUnit.uid);
  });
  it('should load Product Assignments For child Unit', () => {
    mockItem.parentOrgUnit = null;
    component.ngOnInit();
    expect(
      productAssignmentService.loadPotentialProductAssignments
    ).toHaveBeenCalledWith(mockItem.uid);
  });
});

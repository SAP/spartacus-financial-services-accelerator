import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of, Subject } from 'rxjs';
import {
  CurrentUnitService,
  ItemService,
  ListService,
  MessageService,
} from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';
import { RemoveProductCellComponent } from './remove-product-cell.component';
import { FSProductAssignment } from '../../../../../../occ/occ-models/occ.models';

const mockModel = {
  active: false,
  added: true,
  assignmentCode: '00004084',
  name: 'Annual - Budget Plan',
};

const mockItem: B2BUnit = {
  name: 'Test Company',
  uid: 'TestCompany',
};

class MockCurrentUnitService {
  item$ = of(mockItem);
}

class MockProductAssignmentService {
  removeProductAssignment() {}
  isUserAdminOfUnit() {
    return of(true);
  }
}

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockListService {
  viewType = 'i18nRoot';
}

describe('RemoveProductCellComponent', () => {
  let component: RemoveProductCellComponent<FSProductAssignment>;
  let fixture: ComponentFixture<RemoveProductCellComponent<
    FSProductAssignment
  >>;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;
  let messageService: MessageService;
  let organizationListService: ListService<FSProductAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [RemoveProductCellComponent],
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
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: ListService,
          useClass: MockListService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productAssignmentService = TestBed.inject(ProductAssignmentService);
    currentUnitService = TestBed.inject(CurrentUnitService);
    organizationListService = TestBed.inject(ListService);
    messageService = TestBed.inject(MessageService);
    spyOn(
      productAssignmentService,
      'removeProductAssignment'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove product cell', () => {
    mockItem.parentOrgUnit = {
      active: true,
      name: 'Test',
      uid: 'Test',
    };
    component.removeProduct(mockItem.uid, mockItem.parentOrgUnit.uid);
    expect(
      productAssignmentService.removeProductAssignment
    ).toHaveBeenCalledWith(
      mockItem.uid,
      mockModel.assignmentCode,
      mockItem.parentOrgUnit.uid
    );
  });

  it('should remove product cell when there is no parent unit', () => {
    mockItem.parentOrgUnit = undefined;
    component.removeProduct(mockItem.uid, mockItem.uid);
    expect(
      productAssignmentService.removeProductAssignment
    ).toHaveBeenCalledWith(
      mockItem.uid,
      mockModel.assignmentCode,
      mockItem.uid
    );
  });

  it('should check if provided unit is default organization of user', () => {
    component
      .isUnitDefaultOrganizationOfUser(mockItem.uid)
      .subscribe(result => {
        expect(result).toEqual(false);
      })
      .unsubscribe();
  });
});

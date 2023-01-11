import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import {
  CurrentUnitService,
  ItemService,
  ListService,
  MessageService,
} from '@spartacus/organization/administration/components';
import { ProductAssignmentService } from '../../../../../../core/product-assignment/facade/product-assignment.service';

import { AssignProductCellComponent } from './assign-product-cell.component';
import { FSProductAssignment } from '../../../../../../occ/occ-models/occ.models';

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

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockItemService {}

class MockListService {
  viewType = 'i18nRoot';
}
describe('AssignProductCellComponent', () => {
  let component: AssignProductCellComponent<FSProductAssignment>;
  let fixture: ComponentFixture<
    AssignProductCellComponent<FSProductAssignment>
  >;
  let productAssignmentService: ProductAssignmentService;
  let currentUnitService: CurrentUnitService;
  let organizationItemService: ItemService<FSProductAssignment>;
  let messageService: MessageService;
  let organizationListService: ListService<FSProductAssignment>;

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
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: ListService,
          useClass: MockListService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
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
    organizationListService = TestBed.inject(ListService);
    messageService = TestBed.inject(MessageService);
    organizationListService = TestBed.inject(ListService);
    organizationItemService = TestBed.inject(ItemService);
    spyOn(
      productAssignmentService,
      'createProductAssignment'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign product cell', () => {
    component.addProduct(mockUnit);
    expect(
      productAssignmentService.createProductAssignment
    ).toHaveBeenCalledWith(mockUnit, mockModel.code);
  });
});

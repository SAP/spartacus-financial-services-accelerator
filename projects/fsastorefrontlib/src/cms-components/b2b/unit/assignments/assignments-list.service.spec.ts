import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';
import { AssignmentsListService } from './assignments-list.service';

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockAssignments = [
  {
    name: 'Test1',
    active: false,
    assignmentCode: '00005039',
    added: true,
  },
  {
    name: 'Test2',
    active: false,
    assignmentCode: '00005054',
    added: true,
  },
  { name: 'Test3', active: false, assignmentCode: '00006000', added: true },
  {
    name: 'Test4',
    active: true,
    assignmentCode: '00005010',
    added: true,
  },
];

class MockProductAssignmentService {
  getProductAssignments() {
    return of(mockAssignments);
  }
}

describe('AssignmentsListService', () => {
  let service: AssignmentsListService;
  let productAssignmentService: ProductAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AssignmentsListService,
        {
          provide: TableService,
          useClass: MockTableService,
        },
        {
          provide: ProductAssignmentService,
          useClass: MockProductAssignmentService,
        },
      ],
    });
    service = TestBed.inject(AssignmentsListService);
    productAssignmentService = TestBed.inject(ProductAssignmentService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load product assignments', () => {
    spyOn(productAssignmentService, 'getProductAssignments').and.callThrough();
    let result: EntitiesModel<any>;
    service
      .getData()
      .subscribe(table => {
        result = table;
      })
      .unsubscribe();
    expect(result.values.length).toEqual(4);
  });
});

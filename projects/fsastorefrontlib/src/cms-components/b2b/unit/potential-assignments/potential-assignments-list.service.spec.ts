import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';

import { PotentialAssignmentsListService } from './potential-assignments-list.service';

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockAssignments = [
  {
    active: false,
    code: 'TestCode1',
    product: {
      name: 'Test product code1',
      code: 'Test1',
    },
  },
  {
    active: true,
    code: 'TestCode2',
    product: {
      name: 'Test product code2',
      code: 'Test2',
    },
  },
  {
    active: false,
    code: 'TestCode3',
    product: {
      name: 'Test product code3',
      code: 'Test3',
    },
  },
];

const mockAssignments2 = [
  {
    active: true,
    code: 'Test code2',
    product: null,
  },
];

class MockProductAssignmentService {
  getPotentialProductAssignments() {
    return of(mockAssignments);
  }
}

describe('PotentialAssignmentsListService', () => {
  let service: PotentialAssignmentsListService;
  let productAssignmentService: ProductAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PotentialAssignmentsListService,
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
    service = TestBed.inject(PotentialAssignmentsListService);
    productAssignmentService = TestBed.inject(ProductAssignmentService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load potential product assignments', () => {
    spyOn(
      productAssignmentService,
      'getPotentialProductAssignments'
    ).and.callThrough();
    let result: EntitiesModel<any>;
    service
      .getData()
      .subscribe(table => {
        result = table;
      })
      .unsubscribe();
    expect(result.values.length).toEqual(3);
  });

  it('should NOT have name and code defined', () => {
    spyOn(
      productAssignmentService,
      'getPotentialProductAssignments'
    ).and.returnValue(of(mockAssignments2));
    let result: EntitiesModel<any>;
    service
      .getData()
      .subscribe(table => {
        result = table;
      })
      .unsubscribe();
    expect(result.values.length).toEqual(1);
  });

  it('should NOT load potential product assignments', () => {
    spyOn(
      productAssignmentService,
      'getPotentialProductAssignments'
    ).and.returnValue(of(undefined));
    let result: EntitiesModel<any>;
    service
      .getData()
      .subscribe(table => {
        result = table;
      })
      .unsubscribe();
    expect(result?.values).toEqual(undefined);
  });
});

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ProductAssignmentService } from '../../../../core/product-assignment/facade/product-assignment.service';

import { PotentialAssingmensListService } from './potential-assignments-list.service';

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockAssignments = [
  {
    active: false,
    code: 'Test code1',
    product: {
      name: 'Test1',
      code: 'Test product code1',
    },
  },
  {
    active: true,
    code: 'Test code2',
    product: {
      name: 'Test2',
      code: 'Test product code2',
    },
  },
  {
    active: false,
    code: 'Test code3',
    product: {
      name: 'Test3',
      code: 'Test product code3',
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

describe('PotentialAssingmensListService', () => {
  let service: PotentialAssingmensListService;
  let productAssignmentService: ProductAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PotentialAssingmensListService,
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
    service = TestBed.inject(PotentialAssingmensListService);
    productAssignmentService = TestBed.inject(ProductAssignmentService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load product assignments', () => {
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

  it('should NOT load product assignments', () => {
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
    expect(result.values).toEqual(undefined);
  });
});

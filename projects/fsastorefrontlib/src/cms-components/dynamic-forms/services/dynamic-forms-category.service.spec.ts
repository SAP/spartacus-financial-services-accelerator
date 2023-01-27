import { TestBed } from '@angular/core/testing';
import { ApiConfig, FieldConfig } from '@spartacus/dynamicforms';
import { CategoryService } from '../../../core';
import { Observable, of } from 'rxjs';
import { DynamicFormsCategoryService } from './dynamic-forms-category.service';

class MockCategoryService {
  getActiveCategory(): Observable<string> {
    return of('insurances_savings');
  }
}

let testUrl = 'testUrl';
const createdUrl = 'testUrl?categoryCode=insurances_savings';

let apiValue: ApiConfig = {
  url: testUrl,
};

let mockField: FieldConfig = {
  fieldType: 'input',
  name: 'testInput',
  apiValue: apiValue,
};

export const CATEGORY_CODE = 'categoryCode';

describe('DynamicFormsCategoryService', () => {
  let dynamicFormsCategoryService: DynamicFormsCategoryService;
  let categoryService: CategoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormsCategoryService,
        { provide: CategoryService, useClass: MockCategoryService },
      ],
    });
    dynamicFormsCategoryService = TestBed.inject(DynamicFormsCategoryService);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should check active category', () => {
    spyOn(categoryService, 'getActiveCategory').and.callThrough();
    dynamicFormsCategoryService.configureApiValueForCategory(mockField);
    expect(mockField.apiValue.url).toEqual(createdUrl);
  });
});

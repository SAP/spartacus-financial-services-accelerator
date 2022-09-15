import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';

const mockCategoryCode = 'testCategory';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set active category', () => {
    service.setActiveCategory(mockCategoryCode);
    service
      .getActiveCategory()
      .subscribe(data => {
        expect(data).toEqual(mockCategoryCode);
      })
      .unsubscribe();
  });
});

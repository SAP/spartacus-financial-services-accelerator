import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';

const category = 'testCategory';

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
    let categoryCode;
    service.setActiveCategory(category);
    service.getActiveCategory().subscribe(data => (categoryCode = data));
    expect(categoryCode).toEqual(category);
  });
});

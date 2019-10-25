import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFeatureCarouselComponent } from './category-feature-carousel.component';


describe('CategoryCarouselComponent', () => {
  let component: CategoryFeatureCarouselComponent;
  let fixture: ComponentFixture<CategoryFeatureCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFeatureCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeatureCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
